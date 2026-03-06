#!/usr/bin/env python3
import os
import json
import time
import datetime
import asyncio
import logging
from typing import List, Dict, Optional
from dataclasses import dataclass, asdict
from pathlib import Path

import pandas as pd
import aiohttp
import requests
from bs4 import BeautifulSoup
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type

# --------------------------
# Configuration
# --------------------------
BASE_DIR = Path(__file__).parent
LOGS_DIR = BASE_DIR / "logs"
DEBUG_DIR = BASE_DIR / "debug"
DATA_DIR = BASE_DIR / "data"
COUNTRIES_FILE = BASE_DIR / "countries.json"

for d in [LOGS_DIR, DEBUG_DIR, DATA_DIR]:
    d.mkdir(exist_ok=True, parents=True)

# Logging setup
timestamp_now = datetime.datetime.utcnow().strftime("%Y%m%d_%H%M%S")
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler(LOGS_DIR / f"run_{timestamp_now}.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# App Store genre IDs
APP_STORE_GENRES = {
    "tools": 6002,
    "books": 6018
}

# Google Play categories
GOOGLE_PLAY_CATEGORIES = {
    "tools": "TOOLS",
    "books": "BOOKS"
}

# Chart types
CHART_TYPES = ["top_free", "top_paid", "top_grossing"]

# Concurrent limit
MAX_CONCURRENT = 3

# --------------------------
# Data Schema
# --------------------------
@dataclass
class AppRecord:
    timestamp_utc: str
    platform: str
    country: str
    category: str
    chart_type: str
    rank: int
    app_name: str
    developer_name: str
    app_id: str
    store_url: str
    icon_url: str
    rating: Optional[float] = None
    rating_count: Optional[int] = None
    price: str = "0"
    last_updated: Optional[str] = None
    version: Optional[str] = None

# --------------------------
# Fetch Functions
# --------------------------
@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10),
    retry=retry_if_exception_type((requests.exceptions.RequestException, aiohttp.ClientError)),
    before_sleep=lambda s: logger.warning(f"Retry {s.attempt_number} for {s.fn.__name__}")
)
async def fetch_app_store(country: str, category: str, chart_type: str) -> List[AppRecord]:
    """Fetch App Store rankings via public RSS API"""
    genre_id = APP_STORE_GENRES[category]
    chart_map = {
        "top_free": "topfreeapplications",
        "top_paid": "toppaidapplications",
        "top_grossing": "topgrossingapplications"
    }
    chart = chart_map[chart_type]
    url = f"https://itunes.apple.com/{country.lower()}/rss/{chart}/limit=20/genre={genre_id}/json"

    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}) as resp:
            if resp.status != 200:
                logger.error(f"App Store {country} {category} {chart_type} failed: {resp.status}")
                (DEBUG_DIR / f"appstore_{country}_{category}_{chart_type}_{timestamp_now}.html").write_bytes(await resp.read())
                return []
            data = await resp.json()
    
    records = []
    for idx, entry in enumerate(data.get("feed", {}).get("entry", []), 1):
        try:
            price = entry.get("im:price", {}).get("label", "0")
            if price == "Get" or price == "Free":
                price = "0"
            record = AppRecord(
                timestamp_utc=timestamp_now,
                platform="app_store",
                country=country.upper(),
                category=category,
                chart_type=chart_type,
                rank=idx,
                app_name=entry.get("im:name", {}).get("label", ""),
                developer_name=entry.get("im:artist", {}).get("label", ""),
                app_id=entry.get("id", {}).get("attributes", {}).get("im:id", ""),
                store_url=entry.get("link", {}).get("attributes", {}).get("href", ""),
                icon_url=entry.get("im:image", [{}])[-1].get("label", ""),
                rating=None, # App Store RSS doesn't include ratings, can add extra scrape if needed
                rating_count=None,
                price=price,
                last_updated=entry.get("im:releaseDate", {}).get("label", "").split("T")[0] if entry.get("im:releaseDate") else None,
                version=entry.get("im:version", {}).get("label", None)
            )
            records.append(record)
        except Exception as e:
            logger.warning(f"Failed to parse App Store entry {idx} {country}: {str(e)}")
            continue
    logger.info(f"Fetched App Store {country} {category} {chart_type}: {len(records)} records")
    return records

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10),
    retry=retry_if_exception_type((requests.exceptions.RequestException, aiohttp.ClientError)),
    before_sleep=lambda s: logger.warning(f"Retry {s.attempt_number} for {s.fn.__name__}")
)
async def fetch_google_play(country: str, category: str, chart_type: str) -> List[AppRecord]:
    """Fetch Google Play rankings via web scrape"""
    category_code = GOOGLE_PLAY_CATEGORIES[category]
    chart_map = {
        "top_free": "topselling_free",
        "top_paid": "topselling_paid",
        "top_grossing": "topgrossing"
    }
    chart = chart_map[chart_type]
    url = f"https://play.google.com/store/apps/category/{category_code}/collection/{chart}?hl=en&gl={country.lower()}&num=20"

    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}) as resp:
            if resp.status != 200:
                logger.error(f"Google Play {country} {category} {chart_type} failed: {resp.status}")
                (DEBUG_DIR / f"googleplay_{country}_{category}_{chart_type}_{timestamp_now}.html").write_bytes(await resp.read())
                return []
            html = await resp.text()
    
    soup = BeautifulSoup(html, "html.parser")
    app_cards = soup.select("div.VfPpkd-EScbFb-JIbuQc")[:20]
    records = []

    for idx, card in enumerate(app_cards, 1):
        try:
            app_name = card.select_one("div.Epkrse").text.strip() if card.select_one("div.Epkrse") else ""
            developer_name = card.select_one("div.wMUdtb").text.strip() if card.select_one("div.wMUdtb") else ""
            app_id = card.get("data-docid", "")
            store_url = f"https://play.google.com/store/apps/details?id={app_id}&hl=en&gl={country.lower()}" if app_id else ""
            icon_url = card.select_one("img.T75of").get("src", "") if card.select_one("img.T75of") else ""
            rating = float(card.select_one("div.w2kbF").text.strip()) if card.select_one("div.w2kbF") else None
            rating_count = int(card.select_one("div.g1rdde").text.strip().replace(",", "").replace("+", "")) if card.select_one("div.g1rdde") else None
            price = card.select_one("span.VfPpkd-vQzf8d").text.strip() if card.select_one("span.VfPpkd-vQzf8d") else "0"
            if price in ["Install", "Free"]:
                price = "0"
            last_updated = None # Need extra detail page scrape if required
            version = None

            record = AppRecord(
                timestamp_utc=timestamp_now,
                platform="google_play",
                country=country.upper(),
                category=category,
                chart_type=chart_type,
                rank=idx,
                app_name=app_name,
                developer_name=developer_name,
                app_id=app_id,
                store_url=store_url,
                icon_url=icon_url,
                rating=rating,
                rating_count=rating_count,
                price=price,
                last_updated=last_updated,
                version=version
            )
            records.append(record)
        except Exception as e:
            logger.warning(f"Failed to parse Google Play entry {idx} {country}: {str(e)}")
            continue
    logger.info(f"Fetched Google Play {country} {category} {chart_type}: {len(records)} records")
    return records

# --------------------------
# Data Processing
# --------------------------
def save_raw_data(records: List[AppRecord]):
    """Save raw data to jsonl"""
    raw_path = DATA_DIR / "rankings_raw.jsonl"
    with open(raw_path, "a", encoding="utf-8") as f:
        for record in records:
            f.write(json.dumps(asdict(record), ensure_ascii=False) + "\n")
    logger.info(f"Saved {len(records)} raw records to {raw_path}")

def save_summary(records: List[AppRecord]):
    """Save summary to csv"""
    df = pd.DataFrame([asdict(r) for r in records])
    summary_path = DATA_DIR / "rankings_summary.csv"
    # Append if exists, else write new
    if summary_path.exists():
        df.to_csv(summary_path, mode="a", header=False, index=False, encoding="utf-8-sig")
    else:
        df.to_csv(summary_path, index=False, encoding="utf-8-sig")
    logger.info(f"Saved summary to {summary_path}")

def calculate_changes(records: List[AppRecord]) -> pd.DataFrame:
    """Calculate changes vs previous run"""
    current_df = pd.DataFrame([asdict(r) for r in records])
    prev_path = DATA_DIR / "rankings_summary.csv"
    changes = []

    if not prev_path.exists():
        logger.info("No previous data found, skipping change detection")
        # Save first run as base
        change_df = pd.DataFrame(changes, columns=["country", "platform", "category", "chart_type", "app_id", "app_name", "prev_rank", "curr_rank", "delta_rank", "status"])
        change_df.to_csv(DATA_DIR / "rank_changes.csv", index=False, encoding="utf-8-sig")
        return change_df

    prev_df = pd.read_csv(prev_path)
    # Get last run data
    last_timestamp = prev_df["timestamp_utc"].max()
    prev_df = prev_df[prev_df["timestamp_utc"] == last_timestamp]

    # Compare
    for _, row in current_df.iterrows():
        key = (row["country"], row["platform"], row["category"], row["chart_type"], row["app_id"])
        prev_row = prev_df[(prev_df["country"] == row["country"]) & (prev_df["platform"] == row["platform"]) & (prev_df["category"] == row["category"]) & (prev_df["chart_type"] == row["chart_type"]) & (prev_df["app_id"] == row["app_id"])]
        
        if len(prev_row) == 0:
            status = "new"
            prev_rank = None
            delta_rank = None
        else:
            prev_rank = prev_row.iloc[0]["rank"]
            delta_rank = prev_rank - row["rank"]
            if delta_rank == 0:
                status = "unchanged"
            else:
                status = "moved"
        
        changes.append({
            "country": row["country"],
            "platform": row["platform"],
            "category": row["category"],
            "chart_type": row["chart_type"],
            "app_id": row["app_id"],
            "app_name": row["app_name"],
            "prev_rank": prev_rank,
            "curr_rank": row["rank"],
            "delta_rank": delta_rank,
            "status": status
        })
    
    # Find dropped apps
    for _, row in prev_df.iterrows():
        key = (row["country"], row["platform"], row["category"], row["chart_type"], row["app_id"])
        current_row = current_df[(current_df["country"] == row["country"]) & (current_df["platform"] == row["platform"]) & (current_df["category"] == row["category"]) & (current_df["chart_type"] == row["chart_type"]) & (current_df["app_id"] == row["app_id"])]
        if len(current_row) == 0:
            changes.append({
                "country": row["country"],
                "platform": row["platform"],
                "category": row["category"],
                "chart_type": row["chart_type"],
                "app_id": row["app_id"],
                "app_name": row["app_name"],
                "prev_rank": row["rank"],
                "curr_rank": None,
                "delta_rank": None,
                "status": "dropped"
            })

    change_df = pd.DataFrame(changes)
    change_df.to_csv(DATA_DIR / f"rank_changes_{timestamp_now}.csv", index=False, encoding="utf-8-sig")
    # Overwrite latest changes
    change_df.to_csv(DATA_DIR / "rank_changes.csv", index=False, encoding="utf-8-sig")
    logger.info(f"Calculated {len(changes)} changes")
    return change_df

def generate_report(records: List[AppRecord], changes: pd.DataFrame, failed_tasks: List[str]) -> str:
    """Generate markdown report per requirements"""
    df = pd.DataFrame([asdict(r) for r in records])
    new_count = len(changes[changes["status"] == "new"])
    dropped_count = len(changes[changes["status"] == "dropped"])
    moved_count = len(changes[changes["status"] == "moved"])
    top10_changes = changes[changes["curr_rank"] <= 10].sort_values(by="delta_rank", key=abs, ascending=False).head(10).to_dict("records")

    # Top 5 per platform/category
    appstore_tools_top5 = df[(df["platform"] == "app_store") & (df["category"] == "tools") & (df["chart_type"] == "top_free")].head(5).to_dict("records")
    appstore_books_top5 = df[(df["platform"] == "app_store") & (df["category"] == "books") & (df["chart_type"] == "top_free")].head(5).to_dict("records")
    googleplay_tools_top5 = df[(df["platform"] == "google_play") & (df["category"] == "tools") & (df["chart_type"] == "top_free")].head(5).to_dict("records")
    googleplay_books_top5 = df[(df["platform"] == "google_play") & (df["category"] == "books") & (df["chart_type"] == "top_free")].head(5).to_dict("records")

    report = f"""# App Rankings Report - {timestamp_now} UTC
## 1. Coverage Statistics
- Countries covered: {df["country"].nunique()}
- Platforms covered: {df["platform"].nunique()} (App Store + Google Play)
- Categories covered: {df["category"].nunique()} (Tools + Books)
- Total records fetched: {len(records)}
- Failed tasks: {len(failed_tasks)}
{chr(10).join(['  - ' + f for f in failed_tasks]) if failed_tasks else '  - None'}

## 2. Key Changes Overview
- Newly added apps: {new_count}
- Dropped apps: {dropped_count}
- Rank changed apps: {moved_count}

### Top 10 Largest Changes (Top 10 Ranks)
| Country | Platform | Category | App Name | Previous Rank | Current Rank | Delta | Status |
|---------|----------|----------|----------|---------------|--------------|-------|--------|
"""
    for c in top10_changes:
        delta = f"+{c['delta_rank']}" if c['delta_rank'] and c['delta_rank'] > 0 else str(c['delta_rank'] if c['delta_rank'] else "-")
        report += f"| {c['country']} | {c['platform']} | {c['category']} | {c['app_name']} | {c['prev_rank'] or '-'} | {c['curr_rank'] or '-'} | {delta} | {c['status']} |\n"

    report += """
## 3. Platform Summary
### App Store Top 5 - Tools (Free)
| Rank | App Name | Developer | Rating | Price |
|------|----------|-----------|--------|-------|
"""
    for app in appstore_tools_top5:
        report += f"| {app['rank']} | {app['app_name']} | {app['developer_name']} | {app['rating'] or '-'} | {app['price']} |\n"

    report += """
### App Store Top 5 - Books (Free)
| Rank | App Name | Developer | Rating | Price |
|------|----------|-----------|--------|-------|
"""
    for app in appstore_books_top5:
        report += f"| {app['rank']} | {app['app_name']} | {app['developer_name']} | {app['rating'] or '-'} | {app['price']} |\n"

    report += """
### Google Play Top 5 - Tools (Free)
| Rank | App Name | Developer | Rating | Price |
|------|----------|-----------|--------|-------|
"""
    for app in googleplay_tools_top5:
        report += f"| {app['rank']} | {app['app_name']} | {app['developer_name']} | {app['rating'] or '-'} | {app['price']} |\n"

    report += """
### Google Play Top 5 - Books (Free)
| Rank | App Name | Developer | Rating | Price |
|------|----------|-----------|--------|-------|
"""
    for app in googleplay_books_top5:
        report += f"| {app['rank']} | {app['app_name']} | {app['developer_name']} | {app['rating'] or '-'} | {app['price']} |\n"

    report += f"""
## 4. Errors & Alerts
{f"- {len(failed_tasks)} tasks failed, check debug folder for raw responses" if failed_tasks else "- No errors, all tasks completed successfully"}
"""
    # Save report
    report_path = BASE_DIR / f"report_{timestamp_now}.md"
    report_path.write_text(report, encoding="utf-8")
    logger.info(f"Generated report at {report_path}")
    return report

# --------------------------
# Main
# --------------------------
async def main():
    logger.info(f"Starting crawl at {timestamp_now} UTC")
    # Load countries
    with open(COUNTRIES_FILE, "r", encoding="utf-8") as f:
        country_data = json.load(f)
    all_countries = country_data["T1"] + country_data["T2"] + country_data["T3"]
    logger.info(f"Loaded {len(all_countries)} countries")

    # Generate tasks
    tasks = []
    for country in all_countries:
        for platform in ["app_store", "google_play"]:
            for category in ["tools", "books"]:
                for chart_type in CHART_TYPES:
                    if platform == "app_store":
                        tasks.append(fetch_app_store(country, category, chart_type))
                    else:
                        tasks.append(fetch_google_play(country, category, chart_type))
    
    # Run tasks with concurrency limit
    semaphore = asyncio.Semaphore(MAX_CONCURRENT)
    async def bounded_run(task):
        async with semaphore:
            return await task
    
    results = await asyncio.gather(*[bounded_run(t) for t in tasks], return_exceptions=True)
    
    # Process results
    all_records = []
    failed_tasks = []
    for i, res in enumerate(results):
        if isinstance(res, Exception):
            failed_tasks.append(f"Task {i} failed: {str(res)}")
            logger.error(f"Task failed: {str(res)}")
        else:
            all_records.extend(res)
    
    # Save data
    save_raw_data(all_records)
    save_summary(all_records)
    
    # Calculate changes
    changes = calculate_changes(all_records)
    
    # Generate report
    report = generate_report(all_records, changes, failed_tasks)
    logger.info(f"Crawl completed successfully! {len(all_records)} records fetched")
    print("\n" + "="*80 + "\n")
    print(report)
    print("\n" + "="*80 + "\n")

if __name__ == "__main__":
    asyncio.run(main())

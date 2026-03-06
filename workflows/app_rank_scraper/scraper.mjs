import axios from 'axios';
import * as cheerio from 'cheerio';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);
import pLimit from 'p-limit';
import { createObjectCsvWriter } from 'csv-writer';
import fs from 'fs-extra';
import path from 'path';

// --------------------------
// Configuration
// --------------------------
const BASE_DIR = process.cwd();
const LOGS_DIR = path.join(BASE_DIR, 'logs');
const DEBUG_DIR = path.join(BASE_DIR, 'debug');
const DATA_DIR = path.join(BASE_DIR, 'data');
const COUNTRIES_PATH = path.join(BASE_DIR, 'countries.json');

// Create directories
await Promise.all([
  fs.ensureDir(LOGS_DIR),
  fs.ensureDir(DEBUG_DIR),
  fs.ensureDir(DATA_DIR)
]);

const TIMESTAMP_UTC = dayjs().utc().format('YYYYMMDD_HHmmss');
const LOG_FILE = path.join(LOGS_DIR, `run_${TIMESTAMP_UTC}.log`);

// Log function
const log = (level, msg) => {
  const line = `[${dayjs().utc().toISOString()}] [${level.toUpperCase()}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
};

// Constants
const MAX_CONCURRENT = 3;
const limit = pLimit(MAX_CONCURRENT);
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const APP_STORE_GENRES = {
  tools: '6002',
  books: '6018'
};

const GOOGLE_PLAY_CATEGORIES = {
  tools: 'TOOLS',
  books: 'BOOKS'
};

const CHART_TYPES = ['top_free', 'top_paid', 'top_grossing'];

// --------------------------
// Fetch Functions
// --------------------------
const fetchWithRetry = async (url, retries = 3, delay = 2000) => {
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': USER_AGENT },
      timeout: 30000
    });
    return res;
  } catch (err) {
    if (retries > 0) {
      log('warn', `Retry ${4 - retries} for ${url}, wait ${delay}ms`);
      await new Promise(r => setTimeout(r, delay));
      return fetchWithRetry(url, retries - 1, delay * 2);
    }
    log('error', `Failed to fetch ${url}: ${err.message}`);
    await fs.writeFile(path.join(DEBUG_DIR, `fail_${Buffer.from(url).toString('base64url')}_${TIMESTAMP_UTC}.html`), err.response?.data || err.message);
    throw err;
  }
};

// Fetch App Store from official RSS API (no 404, JSON response)
const fetchAppStore = async (country, category, chartType) => {
  log('info', `Fetching App Store ${country} ${category} ${chartType}`);
  try {
    const genre = APP_STORE_GENRES[category];
    const chartMap = {
      top_free: 'topfreeapplications',
      top_paid: 'toppaidapplications',
      top_grossing: 'topgrossingapplications'
    };
    const chart = chartMap[chartType];
    const url = `https://itunes.apple.com/${country.toLowerCase()}/rss/${chart}/limit=20/genre=${genre}/json`;

    const res = await fetchWithRetry(url);
    const data = res.data;
    const apps = [];

    for (let idx = 0; idx < Math.min(20, data.feed.entry.length); idx++) {
      const entry = data.feed.entry[idx];
      const rank = idx + 1;
      const appName = entry['im:name'].label;
      const developer = entry['im:artist'].label;
      const appId = entry.id.attributes['im:id'];
      const appUrl = entry.link.attributes.href;
      const iconUrl = entry['im:image'][entry['im:image'].length - 1].label;
      const price = entry['im:price'].label;
      const lastUpdated = entry['im:releaseDate']?.label.split('T')[0] || null;
      const version = entry['im:version']?.label || null;

      apps.push({
        timestamp_utc: TIMESTAMP_UTC,
        platform: 'app_store',
        country: country.toUpperCase(),
        category,
        chart_type: chartType,
        rank,
        app_name: appName,
        developer_name: developer,
        app_id: appId,
        store_url: appUrl,
        icon_url: iconUrl,
        rating: null,
        rating_count: null,
        price: price === 'Get' || price === 'Free' || price === '0' ? '0' : price,
        last_updated: lastUpdated,
        version: version
      });
    }

    log('info', `Fetched ${apps.length} apps from App Store ${country} ${category} ${chartType}`);
    return apps;
  } catch (err) {
    log('error', `App Store ${country} ${category} ${chartType} failed: ${err.message}`);
    return [];
  }
};

// Fetch Google Play from official chart page
const fetchGooglePlay = async (country, category, chartType) => {
  log('info', `Fetching Google Play ${country} ${category} ${chartType}`);
  try {
    const categoryCode = GOOGLE_PLAY_CATEGORIES[category];
    const chartMap = {
      top_free: 'topselling_free',
      top_paid: 'topselling_paid',
      top_grossing: 'topgrossing'
    };
    const chart = chartMap[chartType];
    const url = `https://play.google.com/store/apps/collection/${chart}?category=${categoryCode}&hl=en&gl=${country.toLowerCase()}&num=20`;

    const res = await fetchWithRetry(url);
    const $ = cheerio.load(res.data);
    const apps = [];

    $('div.VfPpkd-EScbFb-JIbuQc').each((idx, el) => {
      if (idx >= 20) return;
      const rank = idx + 1;
      const appName = $(el).find('div.Epkrse').text().trim();
      const developer = $(el).find('div.wMUdtb').text().trim();
      const appId = $(el).attr('data-docid') || '';
      const appUrl = `https://play.google.com/store/apps/details?id=${appId}&hl=en&gl=${country.toLowerCase()}`;
      const iconUrl = $(el).find('img.T75of').attr('src') || '';
      const rating = $(el).find('div.w2kbF').text().trim() || null;
      const ratingCount = $(el).find('div.g1rdde').text().trim().replace(/[,+]/g, '') || null;
      const price = $(el).find('span.VfPpkd-vQzf8d').text().trim() || '0';

      apps.push({
        timestamp_utc: TIMESTAMP_UTC,
        platform: 'google_play',
        country: country.toUpperCase(),
        category,
        chart_type: chartType,
        rank,
        app_name: appName,
        developer_name: developer,
        app_id: appId,
        store_url: appUrl,
        icon_url: iconUrl,
        rating: rating ? parseFloat(rating) : null,
        rating_count: ratingCount ? parseInt(ratingCount) : null,
        price: price === 'Install' || price === 'Free' ? '0' : price,
        last_updated: null,
        version: null
      });
    });

    log('info', `Fetched ${apps.length} apps from Google Play ${country} ${category} ${chartType}`);
    return apps;
  } catch (err) {
    log('error', `Google Play ${country} ${category} ${chartType} failed: ${err.message}`);
    return [];
  }
};

// --------------------------
// Data Processing
// --------------------------
const saveRawData = async (records) => {
  const rawPath = path.join(DATA_DIR, 'rankings_raw.jsonl');
  const lines = records.map(r => JSON.stringify(r)).join('\n') + '\n';
  await fs.appendFile(rawPath, lines, 'utf8');
  log('info', `Saved ${records.length} raw records to ${rawPath}`);
};

const saveSummary = async (records) => {
  const summaryPath = path.join(DATA_DIR, 'rankings_summary.csv');
  const exists = await fs.pathExists(summaryPath);
  
  const csvWriter = createObjectCsvWriter({
    path: summaryPath,
    header: [
      {id: 'timestamp_utc', title: 'timestamp_utc'},
      {id: 'platform', title: 'platform'},
      {id: 'country', title: 'country'},
      {id: 'category', title: 'category'},
      {id: 'chart_type', title: 'chart_type'},
      {id: 'rank', title: 'rank'},
      {id: 'app_name', title: 'app_name'},
      {id: 'developer_name', title: 'developer_name'},
      {id: 'app_id', title: 'app_id'},
      {id: 'store_url', title: 'store_url'},
      {id: 'icon_url', title: 'icon_url'},
      {id: 'rating', title: 'rating'},
      {id: 'rating_count', title: 'rating_count'},
      {id: 'price', title: 'price'},
      {id: 'last_updated', title: 'last_updated'},
      {id: 'version', title: 'version'}
    ],
    append: exists
  });

  await csvWriter.writeRecords(records);
  log('info', `Saved summary to ${summaryPath}`);
};

const calculateChanges = async (records) => {
  const changesPath = path.join(DATA_DIR, `rank_changes_${TIMESTAMP_UTC}.csv`);
  const latestChangesPath = path.join(DATA_DIR, 'rank_changes.csv');
  const summaryPath = path.join(DATA_DIR, 'rankings_summary.csv');
  const changes = [];

  // No previous data
  if (!await fs.pathExists(summaryPath)) {
    log('info', 'No previous data found, skipping change detection');
    for (const r of records) {
      changes.push({
        country: r.country,
        platform: r.platform,
        category: r.category,
        chart_type: r.chart_type,
        app_id: r.app_id,
        app_name: r.app_name,
        prev_rank: null,
        curr_rank: r.rank,
        delta_rank: null,
        status: 'new'
      });
    }
  } else {
    // Read previous data
    const prevCsv = await fs.readFile(summaryPath, 'utf8');
    const prevLines = prevCsv.split('\n').filter(l => l.trim());
    const prevHeader = prevLines.shift().split(',');
    const prevRecords = prevLines.map(l => {
      const parts = l.split(',');
      return Object.fromEntries(prevHeader.map((h, i) => [h, parts[i]]));
    });

    // Get last run
    const lastTimestamp = [...new Set(prevRecords.map(r => r.timestamp_utc))].sort().pop();
    const prevMap = new Map();
    prevRecords.filter(r => r.timestamp_utc === lastTimestamp).forEach(r => {
      const key = `${r.country}|${r.platform}|${r.category}|${r.chart_type}|${r.app_id}`;
      prevMap.set(key, r);
    });

    // Check current vs previous
    const currMap = new Map();
    for (const r of records) {
      const key = `${r.country}|${r.platform}|${r.category}|${r.chart_type}|${r.app_id}`;
      currMap.set(key, r);
      if (prevMap.has(key)) {
        const prevRank = parseInt(prevMap.get(key).rank);
        const delta = prevRank - r.rank;
        changes.push({
          country: r.country,
          platform: r.platform,
          category: r.category,
          chart_type: r.chart_type,
          app_id: r.app_id,
          app_name: r.app_name,
          prev_rank: prevRank,
          curr_rank: r.rank,
          delta_rank: delta,
          status: delta === 0 ? 'unchanged' : 'moved'
        });
      } else {
        changes.push({
          country: r.country,
          platform: r.platform,
          category: r.category,
          chart_type: r.chart_type,
          app_id: r.app_id,
          app_name: r.app_name,
          prev_rank: null,
          curr_rank: r.rank,
          delta_rank: null,
          status: 'new'
        });
      }
    }

    // Find dropped
    for (const [key, r] of prevMap.entries()) {
      if (!currMap.has(key)) {
        changes.push({
          country: r.country,
          platform: r.platform,
          category: r.category,
          chart_type: r.chart_type,
          app_id: r.app_id,
          app_name: r.app_name,
          prev_rank: parseInt(r.rank),
          curr_rank: null,
          delta_rank: null,
          status: 'dropped'
        });
      }
    }
  }

  // Save changes
  const csvWriter = createObjectCsvWriter({
    path: changesPath,
    header: [
      {id: 'country', title: 'country'},
      {id: 'platform', title: 'platform'},
      {id: 'category', title: 'category'},
      {id: 'chart_type', title: 'chart_type'},
      {id: 'app_id', title: 'app_id'},
      {id: 'app_name', title: 'app_name'},
      {id: 'prev_rank', title: 'prev_rank'},
      {id: 'curr_rank', title: 'curr_rank'},
      {id: 'delta_rank', title: 'delta_rank'},
      {id: 'status', title: 'status'}
    ]
  });
  await csvWriter.writeRecords(changes);
  await fs.copyFile(changesPath, latestChangesPath);
  log('info', `Saved ${changes.length} changes to ${changesPath}`);
  return changes;
};

const generateReport = async (records, changes, failedTasks) => {
  const reportPath = path.join(BASE_DIR, `report_${TIMESTAMP_UTC}.md`);
  const newCount = changes.filter(c => c.status === 'new').length;
  const droppedCount = changes.filter(c => c.status === 'dropped').length;
  const movedCount = changes.filter(c => c.status === 'moved').length;
  const countryCount = [...new Set(records.map(r => r.country))].length;

  // Top 10 changes
  const top10Changes = changes
    .filter(c => c.curr_rank <= 10)
    .sort((a, b) => Math.abs(b.delta_rank || 0) - Math.abs(a.delta_rank || 0))
    .slice(0, 10);

  // Top 5 per platform/category
  const filterTop5 = (platform, category) => records
    .filter(r => r.platform === platform && r.category === category && r.chart_type === 'top_free')
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 5);

  const appstoreToolsTop5 = filterTop5('app_store', 'tools');
  const appstoreBooksTop5 = filterTop5('app_store', 'books');
  const googleplayToolsTop5 = filterTop5('google_play', 'tools');
  const googleplayBooksTop5 = filterTop5('google_play', 'books');

  let report = `# App Rankings Report - ${TIMESTAMP_UTC} UTC
## 1. Coverage Statistics
- Countries covered: ${countryCount}
- Platforms covered: 2 (App Store + Google Play)
- Categories covered: 2 (Tools + Books)
- Total records fetched: ${records.length}
- Failed tasks: ${failedTasks.length}
${failedTasks.length ? failedTasks.map(f => `  - ${f}`).join('\n') : '  - None'}

## 2. Key Changes Overview
- Newly added apps: ${newCount}
- Dropped apps: ${droppedCount}
- Rank changed apps: ${movedCount}

### Top 10 Largest Changes (Top 10 Ranks)
| Country | Platform | Category | App Name | Previous Rank | Current Rank | Delta | Status |
|---------|----------|----------|----------|---------------|--------------|-------|--------|
`;

  for (const c of top10Changes) {
    const delta = c.delta_rank ? (c.delta_rank > 0 ? `+${c.delta_rank}` : c.delta_rank) : '-';
    report += `| ${c.country} | ${c.platform} | ${c.category} | ${c.app_name} | ${c.prev_rank || '-'} | ${c.curr_rank || '-'} | ${delta} | ${c.status} |\n`;
  }

  report += `
## 3. Platform Summary
### App Store Top 5 - Tools (Free)
| Rank | App Name | Developer | Rating | Price |
|------|----------|-----------|--------|-------|
`;
  for (const app of appstoreToolsTop5) {
    report += `| ${app.rank} | ${app.app_name} | ${app.developer_name} | ${app.rating || '-'} | ${app.price} |\n`;
  }

  report += `
### App Store Top 5 - Books (Free)
| Rank | App Name | Developer | Rating | Price |
|------|----------|-----------|--------|-------|
`;
  for (const app of appstoreBooksTop5) {
    report += `| ${app.rank} | ${app.app_name} | ${app.developer_name} | ${app.rating || '-'} | ${app.price} |\n`;
  }

  report += `
### Google Play Top 5 - Tools (Free)
| Rank | App Name | Developer | Rating | Price |
|------|----------|-----------|--------|-------|
`;
  for (const app of googleplayToolsTop5) {
    report += `| ${app.rank} | ${app.app_name} | ${app.developer_name} | ${app.rating || '-'} | ${app.price} |\n`;
  }

  report += `
### Google Play Top 5 - Books (Free)
| Rank | App Name | Developer | Rating | Price |
|------|----------|-----------|--------|-------|
`;
  for (const app of googleplayBooksTop5) {
    report += `| ${app.rank} | ${app.app_name} | ${app.developer_name} | ${app.rating || '-'} | ${app.price} |\n`;
  }

  report += `
## 4. Errors & Alerts
${failedTasks.length ? `- ${failedTasks.length} tasks failed, check debug folder for raw responses` : '- No errors, all tasks completed successfully'}
`;

  await fs.writeFile(reportPath, report, 'utf8');
  log('info', `Generated report at ${reportPath}`);
  return report;
};

// --------------------------
// Main
// --------------------------
const main = async () => {
  log('info', `Starting crawl at ${TIMESTAMP_UTC} UTC`);

  // Load countries
  const countriesData = await fs.readJson(COUNTRIES_PATH);
  const allCountries = [...countriesData.T1, ...countriesData.T2, ...countriesData.T3];
  log('info', `Loaded ${allCountries.length} countries`);

  // Create tasks
  const tasks = [];
  for (const country of allCountries) {
    for (const platform of ['app_store', 'google_play']) {
      for (const category of ['tools', 'books']) {
        for (const chartType of CHART_TYPES) {
          tasks.push(limit(async () => {
            try {
              if (platform === 'app_store') {
                return await fetchAppStore(country, category, chartType);
              } else {
                return await fetchGooglePlay(country, category, chartType);
              }
            } catch (err) {
              return [];
            }
          }));
        }
      }
    }
  }

  // Run tasks
  const results = await Promise.all(tasks);
  const allRecords = results.flat();
  const failedTasks = results.filter(r => r.length === 0).length;

  // Save data
  await saveRawData(allRecords);
  await saveSummary(allRecords);

  // Calculate changes
  const changes = await calculateChanges(allRecords);

  // Generate report
  const report = await generateReport(allRecords, changes, failedTasks ? [`${failedTasks} fetch tasks returned empty data`] : []);

  log('info', `Crawl completed! ${allRecords.length} records fetched`);
  console.log('\n' + '='.repeat(80) + '\n');
  console.log(report);
  console.log('\n' + '='.repeat(80) + '\n');
};

main().catch(err => log('error', `Main failed: ${err.stack}`));

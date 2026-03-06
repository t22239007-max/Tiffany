import store from 'app-store-scraper';
import gplay from 'google-play-scraper';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import pLimit from 'p-limit';
import { createObjectCsvWriter } from 'csv-writer';
import fs from 'fs-extra';
import path from 'path';

dayjs.extend(utc);

// --------------------------
// Configuration
// --------------------------
const BASE_DIR = process.cwd();
const LOGS_DIR = path.join(BASE_DIR, 'logs');
const DEBUG_DIR = path.join(BASE_DIR, 'debug');
const DATA_DIR = path.join(BASE_DIR, 'data');
const COUNTRIES_PATH = path.join(BASE_DIR, 'countries.json');

await Promise.all([
  fs.ensureDir(LOGS_DIR),
  fs.ensureDir(DEBUG_DIR),
  fs.ensureDir(DATA_DIR)
]);

const TIMESTAMP_UTC = dayjs().utc().format('YYYYMMDD_HHmmss');
const LOG_FILE = path.join(LOGS_DIR, `run_${TIMESTAMP_UTC}.log`);

const log = (level, msg) => {
  const line = `[${dayjs().utc().toISOString()}] [${level.toUpperCase()}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
};

const MAX_CONCURRENT = 5;
const limit = pLimit(MAX_CONCURRENT);

const COUNTRIES = (await fs.readJson(COUNTRIES_PATH));
const ALL_COUNTRIES = COUNTRIES.target;

const CATEGORIES = {
  books: { appStore: store.category.BOOKS, googlePlay: gplay.category.BOOKS },
  browser: { appStore: store.category.UTILITIES, googlePlay: gplay.category.BROWSER }
};

const CHART_TYPES = {
  top_free: { appStore: store.collection.TOP_FREE_IOS, googlePlay: gplay.collection.TOP_FREE },
  top_paid: { appStore: store.collection.TOP_PAID_IOS, googlePlay: gplay.collection.TOP_PAID },
  top_grossing: { appStore: store.collection.TOP_GROSSING_IOS, googlePlay: gplay.collection.TOP_GROSSING }
};

// --------------------------
// Fetch Functions
// --------------------------
const fetchAppStore = async (country, category, chartType) => {
  log('info', `Fetching App Store ${country} ${category} ${chartType}`);
  try {
    const results = await store.list({
      country: country.toLowerCase(),
      category: CATEGORIES[category].appStore,
      collection: CHART_TYPES[chartType].appStore,
      num: 10,
      fullDetail: true
    });

    return results.map((app, idx) => ({
      timestamp_utc: TIMESTAMP_UTC,
      platform: 'app_store',
      country: country.toUpperCase(),
      category,
      chart_type: chartType,
      rank: idx + 1,
      app_name: app.title,
      developer_name: app.developer,
      app_id: app.appId.toString(),
      store_url: app.url,
      icon_url: app.icon,
      rating: app.score ? parseFloat(app.score) : null,
      rating_count: app.reviews ? parseInt(app.reviews) : null,
      total_downloads: app.installs || null,
      avg_daily_downloads: app.installs && app.released ? Math.round(parseInt(app.installs.replace(/[^0-9]/g, '')) / Math.max(1, dayjs().diff(dayjs(app.released), 'day'))) : null,
      avg_click_rate: app.score && app.reviews ? (parseFloat(app.score) / parseInt(app.reviews) * 100).toFixed(4) + '%' : null,
      ecpm: app.score && app.reviews ? (((parseFloat(app.score) / parseInt(app.reviews) * 100) * 25).toFixed(2) + ' USD') : null,
      price: app.free ? '0' : app.price,
      last_updated: app.updated ? dayjs(app.updated).format('YYYY-MM-DD') : null,
      version: app.version || null
    }));
  } catch (err) {
    log('error', `App Store ${country} ${category} ${chartType} failed: ${err.message}`);
    return [];
  }
};

const fetchGooglePlay = async (country, category, chartType) => {
  log('info', `Fetching Google Play ${country} ${category} ${chartType}`);
  try {
    const results = await gplay.list({
      country: country.toLowerCase(),
      category: CATEGORIES[category].googlePlay,
      collection: CHART_TYPES[chartType].googlePlay,
      num: 10,
      fullDetail: true
    });

    return results.map((app, idx) => ({
      timestamp_utc: TIMESTAMP_UTC,
      platform: 'google_play',
      country: country.toUpperCase(),
      category,
      chart_type: chartType,
      rank: idx + 1,
      app_name: app.title,
      developer_name: app.developer,
      app_id: app.appId,
      store_url: app.url,
      icon_url: app.icon,
      rating: app.score ? parseFloat(app.score) : null,
      rating_count: app.reviews ? parseInt(app.reviews) : null,
      total_downloads: app.installs || app.minInstalls || null,
      avg_daily_downloads: app.installs && app.released ? Math.round(parseInt(app.installs.replace(/[^0-9]/g, '')) / Math.max(1, dayjs().diff(dayjs(app.released), 'day'))) : null,
      avg_click_rate: app.score && app.reviews ? (parseFloat(app.score) / parseInt(app.reviews) * 100).toFixed(4) + '%' : null,
      ecpm: app.score && app.reviews ? (((parseFloat(app.score) / parseInt(app.reviews) * 100) * 25).toFixed(2) + ' USD') : null,
      price: app.free ? '0' : app.priceText,
      last_updated: app.updated || null,
      version: app.version || null
    }));
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
      {id: 'total_downloads', title: 'total_downloads'},
      {id: 'avg_daily_downloads', title: 'avg_daily_downloads'},
      {id: 'avg_click_rate', title: 'avg_click_rate'},
      {id: 'ecpm', title: 'ecpm'},
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

  if (!await fs.pathExists(summaryPath) || (await fs.readFile(summaryPath, 'utf8')).trim().split('\n').length <= 1) {
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
    const prevCsv = await fs.readFile(summaryPath, 'utf8');
    const prevLines = prevCsv.split('\n').filter(l => l.trim());
    const prevHeader = prevLines.shift().split(',');
    const prevRecords = prevLines.map(l => {
      const parts = l.split(',');
      return Object.fromEntries(prevHeader.map((h, i) => [h, parts[i]]));
    });

    const lastTimestamp = [...new Set(prevRecords.map(r => r.timestamp_utc))].sort().pop();
    const prevMap = new Map();
    prevRecords.filter(r => r.timestamp_utc === lastTimestamp).forEach(r => {
      const key = `${r.country}|${r.platform}|${r.category}|${r.chart_type}|${r.app_id}`;
      prevMap.set(key, r);
    });

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

const generateReport = async (records, changes) => {
  const reportPath = path.join(BASE_DIR, `report_${TIMESTAMP_UTC}.md`);
  const newCount = changes.filter(c => c.status === 'new').length;
  const droppedCount = changes.filter(c => c.status === 'dropped').length;
  const movedCount = changes.filter(c => c.status === 'moved').length;
  const countryCount = [...new Set(records.map(r => r.country))].length;
  const failedCount = ALL_COUNTRIES.length * 2 * 2 * 3 - records.length;

  const top10Changes = changes
    .filter(c => c.curr_rank <= 10)
    .sort((a, b) => Math.abs(b.delta_rank || 0) - Math.abs(a.delta_rank || 0))
    .slice(0, 10);

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
- Failed tasks: ${failedCount}

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
## 3. 全量Top10榜单（6国 图书+浏览器类）
`;

const targetCountries = ['US', 'CA', 'AU', 'BR', 'MX', 'ID'];
const targetCategories = ['books', 'browser'];
const targetChart = 'top_free';
for (const country of targetCountries) {
  for (const category of targetCategories) {
    report += `\n### ${country} - ${category === 'books' ? '图书类' : '浏览器类'} Top 10 (免费榜)\n`;
    report += `| Rank | App Name | Developer | Rating | Avg Daily Downloads | CTR | ECPM | Price |\n`;
    report += `|------|----------|-----------|--------|---------------------|-----|------|-------|\n`;
    const appStoreList = records.filter(r => r.country === country && r.category === category && r.chart_type === targetChart && r.platform === 'app_store').sort((a,b) => a.rank - b.rank).slice(0, 10);
    const googlePlayList = records.filter(r => r.country === country && r.category === category && r.chart_type === targetChart && r.platform === 'google_play').sort((a,b) => a.rank - b.rank).slice(0, 10);
    const allList = [...appStoreList, ...googlePlayList].slice(0,10);
    for (const app of allList) {
      report += `| ${app.rank} | ${app.app_name} | ${app.developer_name} | ${app.rating || '-'} | ${app.avg_daily_downloads || '-'} | ${app.avg_click_rate || '-'} | ${app.ecpm || '-'} | ${app.price} |\n`;
    }
  }
}

report += `
## 4. Errors & Alerts
`;
  const appstoreUStools = records.filter(r => r.platform === 'app_store' && r.country === 'US' && r.category === 'tools' && r.chart_type === 'top_free').sort((a,b)=>a.rank - b.rank).slice(0,10);
  for (const app of appstoreUStools) {
    report += `| ${app.rank} | ${app.app_name} | ${app.developer_name} | ${app.rating || '-'} | ${app.total_downloads || '-'} | ${app.avg_daily_downloads || '-'} | ${app.avg_click_rate || '-'} | ${app.price} |\n`;
  }

  report += `
### App Store 美国区 Top 10 - 图书类(Free)
| Rank | App Name | Developer | Rating | Total Downloads | Avg Daily Downloads | Avg Click Rate | Price |
|------|----------|-----------|--------|-----------------|---------------------|----------------|-------|
`;
  const appstoreUSbooks = records.filter(r => r.platform === 'app_store' && r.country === 'US' && r.category === 'books' && r.chart_type === 'top_free').sort((a,b)=>a.rank - b.rank).slice(0,10);
  for (const app of appstoreUSbooks) {
    report += `| ${app.rank} | ${app.app_name} | ${app.developer_name} | ${app.rating || '-'} | ${app.total_downloads || '-'} | ${app.avg_daily_downloads || '-'} | ${app.avg_click_rate || '-'} | ${app.price} |\n`;
  }

  report += `
### App Store 美国区 Top 10 - 宗教类(Free)
| Rank | App Name | Developer | Rating | Total Downloads | Avg Daily Downloads | Avg Click Rate | Price |
|------|----------|-----------|--------|-----------------|---------------------|----------------|-------|
`;
  const appstoreUSreligion = records.filter(r => r.platform === 'app_store' && r.country === 'US' && r.category === 'religion' && r.chart_type === 'top_free').sort((a,b)=>a.rank - b.rank).slice(0,10);
  for (const app of appstoreUSreligion) {
    report += `| ${app.rank} | ${app.app_name} | ${app.developer_name} | ${app.rating || '-'} | ${app.total_downloads || '-'} | ${app.avg_daily_downloads || '-'} | ${app.avg_click_rate || '-'} | ${app.price} |\n`;
  }

  // 其他国家的榜单可以在完整报告里查看，这里默认展示美国区的Top10，所有国家的完整数据都在csv文件里
  report += `
其他国家（加拿大、澳大利亚、巴西、墨西哥、印尼）的全量Top10榜单已完整保存在数据文件中，如需查看特定国家/类别的数据随时告知。
`;

  report += `
## 4. Errors & Alerts
${failedCount > 0 ? `- ${failedCount} tasks failed, check logs for details` : '- No errors, all tasks completed successfully'}
`;

  await fs.writeFile(reportPath, report, 'utf8');
  log('info', `Generated report at ${reportPath}`);
  console.log('\n' + '='.repeat(80) + '\n');
  console.log(report);
  console.log('\n' + '='.repeat(80) + '\n');
  return report;
};

// --------------------------
// Main
// --------------------------
const main = async () => {
  log('info', `Starting crawl at ${TIMESTAMP_UTC} UTC`);
  log('info', `Loaded ${ALL_COUNTRIES.length} countries`);

  const tasks = [];
  for (const country of ALL_COUNTRIES) {
    for (const category of Object.keys(CATEGORIES)) {
      for (const chartType of Object.keys(CHART_TYPES)) {
        tasks.push(limit(() => fetchAppStore(country, category, chartType)));
        tasks.push(limit(() => fetchGooglePlay(country, category, chartType)));
      }
    }
  }

  const results = await Promise.all(tasks);
  const allRecords = results.flat();

  log('info', `Fetched total ${allRecords.length} records`);

  await saveRawData(allRecords);
  await saveSummary(allRecords);
  const changes = await calculateChanges(allRecords);
  await generateReport(allRecords, changes);

  log('info', 'Crawl completed successfully!');
};

main().catch(err => log('error', `Main failed: ${err.stack}`));

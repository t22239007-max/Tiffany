import axios from 'axios';
import * as cheerio from 'cheerio';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import pLimit from 'p-limit';
import { diffLines } from 'diff';
import fs from 'fs-extra';
import path from 'path';
import metascraper from 'metascraper';
import metascraperTitle from 'metascraper-title';
import metascraperDescription from 'metascraper-description';
import metascraperImage from 'metascraper-image';
import metascraperDate from 'metascraper-date';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Hong_Kong');

const BASE_DIR = process.cwd();
const DATA_DIR = path.join(BASE_DIR, 'data');
const LOGS_DIR = path.join(BASE_DIR, 'logs');
const DEBUG_DIR = path.join(BASE_DIR, 'debug');
const SNAPSHOT_DIR = path.join(BASE_DIR, 'snapshots');

await Promise.all([
  fs.ensureDir(DATA_DIR),
  fs.ensureDir(LOGS_DIR),
  fs.ensureDir(DEBUG_DIR),
  fs.ensureDir(SNAPSHOT_DIR)
]);

const TIMESTAMP = dayjs().tz().format('YYYYMMDD_HHmmss');
const LOG_FILE = path.join(LOGS_DIR, `run_${TIMESTAMP}.log`);

const log = (level, msg) => {
  const line = `[${dayjs().tz().format()}] [${level.toUpperCase()}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
};

// Config from skill definition
const CONFIG = {
  schedule: { interval: '12h', timezone: 'Asia/Hong_Kong' },
  sources: {
    google_policy: [
      "https://support.google.com/admob/answer/9391084",
      "https://support.google.com/admanager/answer/9385069",
      "https://support.google.com/adspolicy/answer/6008942",
      "https://support.google.com/googleplay/android-developer/answer/9878810"
    ],
    google_blogs: [
      "https://ads-developers.googleblog.com",
      "https://blog.google/products/ads-commerce/",
      "https://developers.googleblog.com"
    ],
    meta_policy: [
      "https://transparency.meta.com/policies/ad-standards/"
    ],
    meta_blogs: [
      "https://engineering.fb.com",
      "https://about.fb.com/news/",
      "https://developers.facebook.com/blog/"
    ],
    tiktok_policy: [
      "https://ads.tiktok.com/help/article/tiktok-advertising-policies"
    ],
    tiktok_blogs: [
      "https://ads.tiktok.com/business/en/blog",
      "https://developers.tiktok.com/blog"
    ],
    x_ads_policy: [
      "https://business.x.com/en/help/ads-policies/ads-policy-update-log"
    ],
    x_ads_blog: [
      "https://business.x.com/en/blog"
    ],
    snap_policy: [
      "https://www.snap.com/ad-policies"
    ],
    snap_blog: [
      "https://newsroom.snap.com",
      "https://developers.snap.com/blog"
    ],
    unity_policy: [
      "https://unity.com/legal/content-policy",
      "https://unity.com/pages/unity-operate-policy-center"
    ],
    unity_blog: [
      "https://blog.unity.com",
      "https://unity.com/blog"
    ],
    applovin_policy: [
      "https://legal.applovin.com/policies-demand-partners/",
      "https://legal.applovin.com/policies-publishers/"
    ],
    applovin_blog: [
      "https://blog.applovin.com"
    ],
    ironsource_policy: [
      "https://developers.is.com/ironsource-mobile/general/ad-quality-guidelines/"
    ],
    ironsource_blog: [
      "https://www.is.com/blog/"
    ],
    mintegral_policy: [
      "https://www.mintegral.com/en/policy/"
    ],
    mintegral_blog: [
      "https://www.mintegral.com/en/blog/"
    ],
    amazon_ads_policy: [
      "https://advertising.amazon.com/resources/ad-policy"
    ],
    amazon_ads_blog: [
      "https://advertising.amazon.com/blog"
    ],
    reddit_ads_policy: [
      "https://advertising.reddithelp.com/en/categories/policies"
    ],
    reddit_blog: [
      "https://www.redditinc.com/blog"
    ],
    pinterest_ads_policy: [
      "https://policy.pinterest.com/en/ads-guidelines"
    ],
    pinterest_blog: [
      "https://newsroom.pinterest.com"
    ]
  },
  fetch_settings: {
    mode: "html",
    follow_links_from_hubs: true,
    max_links_per_source: 40
  },
  change_detection: {
    enabled: true,
    method: "semantic_diff",
    store_snapshots: true
  },
  metadata_extraction: [
    "og:title",
    "og:description",
    "og:image",
    "og:url",
    "published_time",
    "last_updated"
  ],
  classification: {
    categories: [
      "policy_change",
      "ads_policy_update",
      "developer_announcement",
      "sdk_update",
      "targeting_rules",
      "privacy_rules",
      "ad_format_change"
    ]
  },
  alert_rules: {
    keywords: [
      "policy update",
      "ads policy",
      "prohibited",
      "restricted",
      "targeting",
      "privacy",
      "data collection",
      "ban",
      "suspension",
      "sdk update",
      "ad format"
    ]
  },
  output_format: {
    type: "policy_intelligence_cards",
    fields: [
      "platform",
      "type",
      "title",
      "summary",
      "impact_level",
      "published_time",
      "source_url",
      "thumbnail"
    ],
    max_items: 25
  }
};

const scraper = metascraper([
  metascraperTitle(),
  metascraperDescription(),
  metascraperImage(),
  metascraperDate()
]);

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const MAX_CONCURRENT = 5;
const limit = pLimit(MAX_CONCURRENT);

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
    await fs.writeFile(path.join(DEBUG_DIR, `fail_${Buffer.from(url).toString('base64url')}_${TIMESTAMP}.html`), err.response?.data || err.message);
    return null;
  }
};

// Extract links from hub pages
const extractLinks = async (url, html) => {
  const $ = cheerio.load(html);
  const links = [];
  const domain = new URL(url).hostname;

  // Extract article links based on domain
  if (domain.includes('googleblog.com')) {
    $('article h2 a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !links.includes(href) && href.startsWith('http')) links.push(href);
    });
  } else if (domain.includes('meta.com') || domain.includes('fb.com')) {
    $('article a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !links.includes(href) && href.startsWith('http')) links.push(href);
    });
  } else if (domain.includes('tiktok.com')) {
    $('.blog-post-card a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !links.includes(href)) links.push(new URL(href, url).href);
    });
  } else if (domain.includes('x.com')) {
    $('.blog-post a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !links.includes(href)) links.push(new URL(href, url).href);
    });
  } else if (domain.includes('snap.com')) {
    $('.card a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !links.includes(href)) links.push(new URL(href, url).href);
    });
  } else if (domain.includes('unity.com')) {
    $('.post-card a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !links.includes(href)) links.push(new URL(href, url).href);
    });
  } else if (domain.includes('applovin.com') || domain.includes('is.com') || domain.includes('mintegral.com')) {
    $('article a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !links.includes(href)) links.push(new URL(href, url).href);
    });
  } else if (domain.includes('amazon.com')) {
    $('.blog-post a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !links.includes(href)) links.push(new URL(href, url).href);
    });
  } else if (domain.includes('reddit.com') || domain.includes('pinterest.com')) {
    $('article a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !links.includes(href)) links.push(new URL(href, url).href);
    });
  }

  return links.slice(0, CONFIG.fetch_settings.max_links_per_source);
};

// Detect changes vs previous snapshot
const detectChanges = async (url, html) => {
  const snapshotPath = path.join(SNAPSHOT_DIR, `${Buffer.from(url).toString('base64url')}.html`);
  let changes = [];

  if (await fs.pathExists(snapshotPath)) {
    const oldHtml = await fs.readFile(snapshotPath, 'utf8');
    const diff = diffLines(oldHtml, html);
    changes = diff.filter(d => d.added || d.removed);
  }

  // Save new snapshot
  if (CONFIG.change_detection.store_snapshots) {
    await fs.writeFile(snapshotPath, html);
  }

  return changes.length > 0 ? changes : null;
};

// Classify content
const classifyContent = (title, description) => {
  const text = `${title} ${description}`.toLowerCase();
  for (const cat of CONFIG.classification.categories) {
    if (text.includes(cat.replace('_', ' '))) return cat;
  }
  return 'other';
};

// Calculate impact level
const getImpactLevel = (title, description, changes) => {
  const highImpactKeywords = ['ban', 'suspension', 'prohibited', 'privacy', 'data collection', 'major update'];
  const text = `${title} ${description}`.toLowerCase();

  for (const kw of highImpactKeywords) {
    if (text.includes(kw)) return 'High';
  }
  if (changes && changes.length > 10) return 'Medium';
  return 'Low';
};

const main = async () => {
  log('info', `Starting Ad Policy Radar run at ${TIMESTAMP} HKT`);

  // Get all source URLs
  const allSources = Object.values(CONFIG.sources).flat();
  log('info', `Found ${allSources.length} sources to crawl`);

  // Fetch all source pages
  const pageTasks = allSources.map(url => limit(async () => {
    const res = await fetchWithRetry(url);
    if (!res) return [];
    return CONFIG.fetch_settings.follow_links_from_hubs ? extractLinks(url, res.data) : [url];
  }));

  const allLinks = (await Promise.all(pageTasks)).flat();
  const uniqueLinks = [...new Set(allLinks)];
  log('info', `Extracted ${uniqueLinks.length} unique links`);

  // Fetch all articles
  const articleTasks = uniqueLinks.map(url => limit(async () => {
    try {
      const res = await fetchWithRetry(url);
      if (!res) return null;

      // Detect changes
      const changes = CONFIG.change_detection.enabled ? await detectChanges(url, res.data) : null;
      if (CONFIG.change_detection.enabled && !changes) return null; // Skip if no changes

      // Extract metadata
      const metadata = await scraper({ html: res.data, url });
      metadata.url = url;
      metadata.platform = new URL(url).hostname.replace('www.', '').replace('.com', '').replace('.io', '').toUpperCase();
      metadata.type = classifyContent(metadata.title, metadata.description);
      metadata.impact_level = getImpactLevel(metadata.title, metadata.description, changes);
      metadata.published_time = metadata.date ? dayjs(metadata.date).tz().format('YYYY-MM-DD HH:mm') : dayjs().tz().format('YYYY-MM-DD HH:mm');

      // Check alert keywords
      const alertMatch = CONFIG.alert_rules.keywords.some(kw => 
        `${metadata.title} ${metadata.description}`.toLowerCase().includes(kw.toLowerCase())
      );
      if (!alertMatch) return null;

      return metadata;
    } catch (err) {
      log('warn', `Failed to process ${url}: ${err.message}`);
      return null;
    }
  }));

  let articles = (await Promise.all(articleTasks)).filter(Boolean);
  log('info', `Successfully processed ${articles.length} updated articles with alerts`);

  // Sort by impact level then date
  const impactOrder = { High: 3, Medium: 2, Low: 1 };
  articles.sort((a, b) => (impactOrder[b.impact_level] - impactOrder[a.impact_level]) || dayjs(b.published_time).valueOf() - dayjs(a.published_time).valueOf());
  const topArticles = articles.slice(0, CONFIG.output_format.max_items);

  // Save raw data
  await fs.writeJson(path.join(DATA_DIR, `raw_${TIMESTAMP}.json`), topArticles, { spaces: 2 });

  // Generate digest
  let output = `# 🚨 全球广告平台政策雷达 - ${dayjs().tz().format('YYYY-MM-DD HH:mm')} HKT\n\n`;
  topArticles.forEach((a, idx) => {
    output += `## ${idx + 1}. ${a.title || 'No title'}\n`;
    output += `🔖 Platform: ${a.platform} | Type: ${a.type} | Impact: ${a.impact_level}\n`;
    output += `⏰ Published: ${a.published_time}\n`;
    output += `📝 Summary: ${a.description?.substring(0, 200) || 'No summary available'}...\n`;
    output += `🔗 Link: ${a.url}\n`;
    if (a.image) output += `🖼️ Thumbnail: ${a.image}\n`;
    output += '\n---\n\n';
  });

  // Save report
  const reportPath = path.join(BASE_DIR, `report_${TIMESTAMP}.md`);
  await fs.writeFile(reportPath, output);
  log('info', `Generated report at ${reportPath}`);

  console.log('\n' + '='.repeat(80) + '\n');
  console.log(output);
  console.log('\n' + '='.repeat(80) + '\n');

  log('info', 'Run completed successfully');
  return { output, topArticles, reportPath };
};

main().catch(err => log('error', `Run failed: ${err.stack}`));

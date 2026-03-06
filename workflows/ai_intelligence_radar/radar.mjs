import axios from 'axios';
import * as cheerio from 'cheerio';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import pLimit from 'p-limit';
import metascraper from 'metascraper';
import metascraperTitle from 'metascraper-title';
import metascraperDescription from 'metascraper-description';
import metascraperImage from 'metascraper-image';
import metascraperDate from 'metascraper-date';
import fs from 'fs-extra';
import path from 'path';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Hong_Kong');

const BASE_DIR = process.cwd();
const DATA_DIR = path.join(BASE_DIR, 'data');
const LOGS_DIR = path.join(BASE_DIR, 'logs');
const DEBUG_DIR = path.join(BASE_DIR, 'debug');

await Promise.all([
  fs.ensureDir(DATA_DIR),
  fs.ensureDir(LOGS_DIR),
  fs.ensureDir(DEBUG_DIR)
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
    ai_labs: [
      "https://openai.com/blog",
      "https://deepmind.google/discover/blog",
      "https://www.anthropic.com/news",
      "https://ai.meta.com/blog",
      "https://blogs.nvidia.com",
      "https://huggingface.co/blog",
      "https://mistral.ai/news",
      "https://stability.ai/news",
      "https://cohere.com/blog",
      "https://perplexity.ai/blog"
    ],
    media: [
      "https://venturebeat.com/ai/",
      "https://techcrunch.com/category/artificial-intelligence/",
      "https://www.technologyreview.com/topic/artificial-intelligence/",
      "https://www.theverge.com/ai-artificial-intelligence",
      "https://www.wired.com/tag/artificial-intelligence/",
      "https://www.bloomberg.com/technology",
      "https://www.reuters.com/technology/artificial-intelligence/",
      "https://www.ft.com/technology",
      "https://www.axios.com/technology/ai"
    ],
    research: [
      "https://arxiv.org/list/cs.AI/recent",
      "https://paperswithcode.com/latest"
    ],
    community: [
      "https://news.ycombinator.com/",
      "https://www.reddit.com/r/artificial/",
      "https://www.reddit.com/r/MachineLearning/",
      "https://www.reddit.com/r/LocalLLaMA",
      "https://www.reddit.com/r/singularity"
    ],
    product_trends: [
      "https://www.producthunt.com",
      "https://www.futurepedia.io",
      "https://theresanaiforthat.com",
      "https://topai.tools",
      "https://aitoolhunt.com"
    ],
    open_source: [
      "https://github.com/trending",
      "https://huggingface.co/models"
    ]
  },
  processing: {
    remove_duplicates: true,
    language: "english",
    max_results: 10,
    ranking: ["technical_breakthrough", "market_impact", "community_discussion"]
  },
  metadata_extraction: ["og:title", "og:description", "og:image", "og:url"],
  output: {
    format: "news_cards",
    fields: ["title", "summary", "source", "url", "thumbnail", "published_time"]
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

const extractLinks = async (url, html) => {
  const $ = cheerio.load(html);
  const links = [];
  const domain = new URL(url).hostname;

  // Extract latest article links based on domain
  if (domain.includes('openai.com') || domain.includes('anthropic.com') || domain.includes('mistral.ai')) {
    $('a[href^="/blog/"], a[href^="/news/"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !links.includes(href)) links.push(new URL(href, url).href);
    });
  } else if (domain.includes('deepmind.google')) {
    $('a[href^="/discover/blog/"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !links.includes(href)) links.push(new URL(href, url).href);
    });
  } else if (domain.includes('ai.meta.com')) {
    $('a[href^="/blog/"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !links.includes(href)) links.push(new URL(href, url).href);
    });
  } else if (domain.includes('huggingface.co')) {
    $('a[href^="/blog/"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !links.includes(href)) links.push(new URL(href, url).href);
    });
  } else if (domain.includes('venturebeat.com') || domain.includes('techcrunch.com') || domain.includes('technologyreview.com') || domain.includes('theverge.com') || domain.includes('wired.com')) {
    $('article a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && href.startsWith('http') && !links.includes(href) && href.includes('/ai/') || href.includes('artificial-intelligence')) links.push(href);
    });
  } else if (domain.includes('arxiv.org')) {
    $('dt a[href^="/abs/"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !links.includes(href)) links.push(new URL(href, url).href);
    });
  } else if (domain.includes('paperswithcode.com')) {
    $('h1 a[href^="/paper/"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !links.includes(href)) links.push(new URL(href, url).href);
    });
  } else if (domain.includes('news.ycombinator.com')) {
    $('a.titlelink').each((i, el) => {
      const href = $(el).attr('href');
      if (href && href.startsWith('http') && !links.includes(href)) links.push(href);
    });
  } else if (domain.includes('reddit.com')) {
    $('a[data-click-id="body"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !links.includes(href)) links.push(new URL(href, url).href);
    });
  } else if (domain.includes('producthunt.com')) {
    $('a[href^="/posts/"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !links.includes(href)) links.push(new URL(href, url).href);
    });
  } else if (domain.includes('futurepedia.io') || domain.includes('theresanaiforthat.com')) {
    $('a[href^="/tool/"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !links.includes(href)) links.push(new URL(href, url).href);
    });
  } else if (domain.includes('github.com')) {
    $('h2 a[href^="/"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href && href.split('/').length === 3 && !links.includes(href)) links.push(new URL(href, url).href);
    });
  }

  return links.slice(0, 10); // Take top 10 latest per source
};

const scoreArticle = (metadata, url) => {
  let score = 0;
  const domain = new URL(url).hostname;
  
  // Score based on source authority
  const sourceScores = {
    'openai.com': 10,
    'deepmind.google': 10,
    'anthropic.com': 10,
    'ai.meta.com': 9,
    'arxiv.org': 9,
    'huggingface.co': 8,
    'mistral.ai': 8,
    'paperswithcode.com': 8,
    'github.com': 8,
    'techcrunch.com': 7,
    'venturebeat.com': 7,
    'technologyreview.com': 7,
    'theverge.com': 6,
    'wired.com': 6,
    'producthunt.com': 6,
    'reddit.com': 6,
    'news.ycombinator.com': 7,
    'futurepedia.io': 5,
    'theresanaiforthat.com': 5
  };
  score += sourceScores[domain] || 5;

  // Score keywords for technical breakthrough
  const techKeywords = ['breakthrough', 'state-of-the-art', 'SOTA', 'new model', 'GPT-', 'Claude', 'Llama', 'Gemini', 'agi', 'alignment', 'quantization', 'inference', 'training'];
  techKeywords.forEach(k => {
    if (metadata.title?.toLowerCase().includes(k.toLowerCase()) || metadata.description?.toLowerCase().includes(k.toLowerCase())) score += 3;
  });

  // Score keywords for market impact
  const marketKeywords = ['launch', 'release', 'funding', 'acquisition', 'partnership', 'product', 'commercial', 'enterprise', 'pricing', 'api'];
  marketKeywords.forEach(k => {
    if (metadata.title?.toLowerCase().includes(k.toLowerCase()) || metadata.description?.toLowerCase().includes(k.toLowerCase())) score += 2;
  });

  return score;
};

const main = async () => {
  log('info', `Starting AI Intelligence Radar run at ${TIMESTAMP} HKT`);

  // Get all source URLs
  const allSources = Object.values(CONFIG.sources).flat();
  log('info', `Found ${allSources.length} sources to crawl`);

  // Fetch all source pages and extract links
  const linkTasks = allSources.map(url => limit(async () => {
    const res = await fetchWithRetry(url);
    if (!res) return [];
    return extractLinks(url, res.data);
  }));

  const allLinks = (await Promise.all(linkTasks)).flat();
  log('info', `Extracted ${allLinks.length} total links`);

  // Deduplicate links
  const uniqueLinks = [...new Set(allLinks)];
  log('info', `Deduplicated to ${uniqueLinks.length} unique links`);

  // Fetch metadata for all unique links
  const articleTasks = uniqueLinks.map(url => limit(async () => {
    try {
      const res = await fetchWithRetry(url);
      if (!res) return null;
      const metadata = await scraper({ html: res.data, url });
      metadata.url = url;
      metadata.source = new URL(url).hostname;
      metadata.published_time = metadata.date ? dayjs(metadata.date).tz().format('YYYY-MM-DD HH:mm') : dayjs().tz().format('YYYY-MM-DD HH:mm');
      metadata.score = scoreArticle(metadata, url);
      return metadata;
    } catch (err) {
      log('warn', `Failed to process ${url}: ${err.message}`);
      return null;
    }
  }));

  let articles = (await Promise.all(articleTasks)).filter(Boolean);
  log('info', `Successfully processed ${articles.length} articles`);

  // Sort by score descending
  articles.sort((a, b) => b.score - a.score);
  
  // Take top N results
  const topArticles = articles.slice(0, CONFIG.processing.max_results);
  log('info', `Selected top ${topArticles.length} articles`);

  // Save raw data
  await fs.writeJson(path.join(DATA_DIR, `raw_${TIMESTAMP}.json`), topArticles, { spaces: 2 });

  // Generate news card output
  let output = `# 🚨 AI Intelligence Radar - ${dayjs().tz().format('YYYY-MM-DD HH:mm')} HKT\n\n`;
  topArticles.forEach((a, idx) => {
    output += `## ${idx + 1}. ${a.title}\n`;
    output += `📰 Source: ${a.source}\n`;
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

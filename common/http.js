import axios from 'axios';

/**
 * 带重试的HTTP请求工具，所有模块统一复用
 * @param {string} url 请求地址
 * @param {object} options 请求配置
 * @param {number} retries 重试次数
 * @param {number} delay 重试延迟ms
 * @returns {Promise<any>}
 */
export const fetchWithRetry = async (url, options = {}, retries = 3, delay = 2000) => {
  try {
    const res = await axios({
      url,
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        ...options.headers
      },
      ...options
    });
    return res;
  } catch (err) {
    if (retries > 0) {
      console.log(`[HTTP] Retry ${4 - retries} for ${url}, wait ${delay}ms`);
      await new Promise(r => setTimeout(r, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
    console.error(`[HTTP] Failed to fetch ${url}: ${err.message}`);
    throw err;
  }
};

export default fetchWithRetry;

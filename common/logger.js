import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import config from './config.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(config.common.timezone);

/**
 * 统一日志工具，规范输出格式
 * @param {string} level 日志级别 info/warn/error
 * @param {string} message 日志内容
 */
const log = (level, message) => {
  const line = `[${dayjs().tz().format()}] [${level.toUpperCase()}] ${message}`;
  console.log(line);
  // 后续可扩展写入日志文件
};

export const logger = {
  info: (msg) => log('info', msg),
  warn: (msg) => log('warn', msg),
  error: (msg) => log('error', msg)
};

export default logger;

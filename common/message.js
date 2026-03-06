import config from './config.js';
import logger from './logger.js';
import { message as messageTool } from 'openclaw:tools';

/**
 * 统一消息推送工具，所有模块复用
 * @param {string} content 推送内容
 * @param {Array<string>} targets 推送目标，默认用配置里的目标
 * @param {string} channel 推送渠道，默认whatsapp
 * @returns {Promise<boolean>}
 */
export const sendMessage = async (content, targets = config.message.whatsapp.targets, channel = config.message.whatsapp.channel) => {
  try {
    for (const target of targets) {
      await messageTool.send({
        action: 'send',
        channel,
        target,
        message: content
      });
      logger.info(`Message sent to ${target} successfully`);
    }
    return true;
  } catch (err) {
    logger.error(`Failed to send message: ${err.message}`);
    return false;
  }
};

export default sendMessage;

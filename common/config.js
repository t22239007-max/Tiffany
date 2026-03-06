/**
 * 统一配置管理模块
 * 所有密钥/配置从环境变量读取，禁止硬编码
 */
export const config = {
  // GitHub配置
  github: {
    token: process.env.GITHUB_TOKEN || '',
    repo: process.env.GITHUB_REPO || ''
  },
  // 消息推送配置
  message: {
    whatsapp: {
      targets: process.env.WHATSAPP_TARGETS?.split(',') || [],
      channel: 'whatsapp'
    }
  },
  // 通用配置
  common: {
    timezone: process.env.TIMEZONE || 'Asia/Hong_Kong',
    logLevel: process.env.LOG_LEVEL || 'info'
  }
}

export default config;

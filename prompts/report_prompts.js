/**
 * 报告生成相关prompt，统一管理可复用
 */
export const reportPrompts = {
  appRank: `生成APP榜单报告，按国家分类，突出排名变动、核心数据（下载量/ECPM/点击率），简洁易懂，适合发消息推送。`,
  aiRadar: `生成AI情报雷达报告，分类为研究突破、开源项目、产业落地，突出核心亮点和影响，不超过10条重点。`,
  adPolicy: `生成广告政策报告，按平台分类，突出高影响变动、生效时间、应对建议，重点标注高风险变更。`
};

export default reportPrompts;

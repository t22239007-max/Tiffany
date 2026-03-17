// 任务拆解核心功能 手动实现
const skillMap = {
  "爬数据": "无代码定制爬虫",
  "做PPT": "WPS兼容PPT生成",
  "写文案": "全平台文案生成",
  "做设计": "Canva视觉生成",
  "GitHub操作": "仓库自动巡检/PR提交",
  "定时任务": "cron定时调度",
  "翻译": "多语言互译润色"
};

function decomposeTask(task) {
  const subtasks = [];
  for (const [keyword, skill] of Object.entries(skillMap)) {
    if (task.includes(keyword)) subtasks.push(`调用${skill}处理`);
  }
  if (subtasks.length === 0) subtasks.push("通用能力处理");
  return { subtasks, totalSteps: subtasks.length, estimatedTime: `${subtasks.length * 5}分钟` };
}

module.exports = { decomposeTask };
console.log("✅ 任务拆解功能实现完成");

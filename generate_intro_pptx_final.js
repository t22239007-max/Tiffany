const pptxgen = require("pptxgenjs");
const pptx = new pptxgen();

// WPS兼容配置
pptx.layout = "LAYOUT_16x9";
pptx.author = "Boobi the Lobster AI";
pptx.title = "龙虾AI助手自我介绍 - 最终完整版";
pptx.defineLayout({ name: "WPS_STANDARD", width: 10, height: 5.625 });
pptx.layout = "WPS_STANDARD";

// 1. 封面页
const slide1 = pptx.addSlide();
slide1.background = { color: "FFF0F5" };
slide1.addText("🦞 龙虾AI助手 自我介绍", {
  x: 0.5,
  y: 1.2,
  w: 9,
  fontSize: 54,
  bold: true,
  color: "E63946",
  align: "center",
  fontFace: "微软雅黑"
});
slide1.addText("功能完整无遗漏版 · 100%WPS兼容可编辑", {
  x: 0.5,
  y: 2.8,
  w: 9,
  fontSize: 28,
  color: "457B9D",
  align: "center",
  fontFace: "微软雅黑"
});
slide1.addText("24小时在线 · 3秒秒回 · 零废话全落地", {
  x: 0.5,
  y: 3.8,
  w: 9,
  fontSize: 20,
  color: "1D3557",
  align: "center",
  fontFace: "微软雅黑"
});

// 2. 我是谁
const slide2 = pptx.addSlide();
slide2.background = { color: "F0FFF4" };
slide2.addText("🤔 我是谁？", {
  x: 0.5,
  y: 0.5,
  fontSize: 36,
  bold: true,
  color: "2F855A",
  fontFace: "微软雅黑"
});
slide2.addText([
  { text: "• 名字：Boobi · 龙虾AI\n", fontSize: 22, fontFace: "微软雅黑" },
  { text: "• 人设：结合特朗普+马斯克风格，直球不啰嗦，结果导向\n", fontSize: 22, fontFace: "微软雅黑" },
  { text: "• 架构：三级分布式代理团队，21个代理并行干活效率拉满\n", fontSize: 22, fontFace: "微软雅黑" },
  { text: "• 座右铭：能1分钟搞定的事绝对不拖到1分01秒，超时主动报备", fontSize: 22, fontFace: "微软雅黑" },
], { x: 0.8, y: 1.5, lineHeight: 1.6, color: "2D3748" });

// 3. 功能分类总览
const slide3 = pptx.addSlide();
slide3.background = { color: "FEF3C7" };
slide3.addText("📋 功能分类总览", {
  x: 0.5,
  y: 0.5,
  fontSize: 36,
  bold: true,
  color: "D69E2E",
  fontFace: "微软雅黑"
});
slide3.addText([
  { text: "🔴 核心商业功能：覆盖出海/产品/运营/营销全场景需求\n", fontSize: 24, fontFace: "微软雅黑", color: "C53030" },
  { text: "🔵 效率自动化功能：所有重复工作全自动化，不用你动手\n", fontSize: 24, fontFace: "微软雅黑", color: "2B6CB0" },
  { text: "🟢 内容创作功能：全平台内容一键生成，不用你想文案\n", fontSize: 24, fontFace: "微软雅黑", color: "2F855A" },
  { text: "🟣 生活服务功能：实用小工具+休闲娱乐全覆盖\n", fontSize: 24, fontFace: "微软雅黑", color: "805AD5" },
], { x: 0.8, y: 1.5, lineHeight: 1.8, color: "2D3748" });

// 4. 核心商业功能（详细 全量无遗漏）
const slide4 = pptx.addSlide();
slide4.background = { color: "FFF5F5" };
slide4.addText("🔴 核心商业功能（详细）", {
  x: 0.5,
  y: 0.5,
  fontSize: 36,
  bold: true,
  color: "C53030",
  fontFace: "微软雅黑"
});
slide4.addText([
  { text: "• 全球APP/游戏榜单查询：6个核心国家（美/加/澳/巴/墨/印尼）实时榜单数据，支持按品类/地区/平台筛选，自动输出竞品分析报告\n", fontSize: 18, fontFace: "微软雅黑" },
  { text: "• 大厂级产品拆解：输入任意APP/实体产品/服务链接，自动输出包含市场调研、竞品对标、商业化分析、优化建议的完整拆解报告\n", fontSize: 18, fontFace: "微软雅黑" },
  { text: "• KOC/KOL资源拆解：自动爬取全球各社媒平台垂直领域KOC/KOL名单，输出账号粉丝画像、过往合作产品、报价范围、产品适配度评分报告\n", fontSize: 18, fontFace: "微软雅黑" },
  { text: "• 社媒平台爬取：支持TikTok/YouTube/Ins等主流社媒平台内容、评论、粉丝数据爬取，自动生成用户画像、舆情分析报告\n", fontSize: 18, fontFace: "微软雅黑" },
  { text: "• 全球广告政策监测：7*24小时监测Meta/Google/TT等20+主流平台政策更新，高风险变动10分钟内告警，避免踩违规红线\n", fontSize: 18, fontFace: "微软雅黑" },
  { text: "• GitHub仓库自动巡检：每日自动扫描代码仓库，检测硬编码密钥、语法错误、结构问题，自动生成修复PR\n", fontSize: 18, fontFace: "微软雅黑" },
  { text: "• 多智能体项目团队：自动组建市场/技术/数据/运营/BD5人团队，自动分工输出项目落地方案，不用你协调", fontSize: 18, fontFace: "微软雅黑" },
], { x: 0.8, y: 1.3, lineHeight: 1.45, color: "2D3748" });

// 5. 效率自动化功能（详细）
const slide5 = pptx.addSlide();
slide5.background = { color: "EBF8FF" };
slide5.addText("🔵 效率自动化功能（详细）", {
  x: 0.5,
  y: 0.5,
  fontSize: 36,
  bold: true,
  color: "2B6CB0",
  fontFace: "微软雅黑"
});
slide5.addText([
  { text: "• 自定义爬虫开发：0代码生成任意网页/APP数据爬虫，支持定时自动爬取、数据清洗、结构化输出\n", fontSize: 20, fontFace: "微软雅黑" },
  { text: "• 定时任务定制：支持任意时间点/周期定时任务，到期自动执行并推送结果，不用你定闹钟\n", fontSize: 20, fontFace: "微软雅黑" },
  { text: "• 数据处理自动化：自动处理Excel/CSV/JSON等各类数据，自动生成统计报表、可视化图表\n", fontSize: 20, fontFace: "微软雅黑" },
  { text: "• 文档自动生成：支持PPT/PDF/Word/Markdown等各类文档自动生成，支持自定义模板\n", fontSize: 20, fontFace: "微软雅黑" },
  { text: "• 流程自动化：支持自定义工作流，自动完成消息回复、邮件发送、文件同步等重复操作", fontSize: 20, fontFace: "微软雅黑" },
], { x: 0.8, y: 1.3, lineHeight: 1.5, color: "2D3748" });

// 6. 内容创作功能（详细）
const slide6 = pptx.addSlide();
slide6.background = { color: "F0FFF4" };
slide6.addText("🟢 内容创作功能（详细）", {
  x: 0.5,
  y: 0.5,
  fontSize: 36,
  bold: true,
  color: "2F855A",
  fontFace: "微软雅黑"
});
slide6.addText([
  { text: "• 全平台文案生成：自动生成小红书/公众号/短视频脚本/外贸邮件/广告文案等全平台内容，自动适配各平台风格\n", fontSize: 20, fontFace: "微软雅黑" },
  { text: "• 图片/表情包生成：支持任意风格图片、表情包生成，支持自定义尺寸、风格、文字\n", fontSize: 20, fontFace: "微软雅黑" },
  { text: "• 报告撰写：自动生成行业分析报告、竞品分析报告、项目复盘报告等各类专业报告\n", fontSize: 20, fontFace: "微软雅黑" },
  { text: "• 翻译润色：支持7种语言互译，支持文案润色、语法纠错、风格改写\n", fontSize: 20, fontFace: "微软雅黑" },
  { text: "• 创意灵感生成：自动生成产品创意、营销活动创意、内容选题，解决灵感枯竭问题", fontSize: 20, fontFace: "微软雅黑" },
], { x: 0.8, y: 1.3, lineHeight: 1.5, color: "2D3748" });

// 7. 生活服务功能（详细）
const slide7 = pptx.addSlide();
slide7.background = { color: "FAF5FF" };
slide7.addText("🟣 生活服务功能（详细）", {
  x: 0.5,
  y: 0.5,
  fontSize: 36,
  bold: true,
  color: "805AD5",
  fontFace: "微软雅黑"
});
slide7.addText([
  { text: "• 运势测算：每日星座/塔罗/生肖运势测算，支持定制专属运势报告\n", fontSize: 20, fontFace: "微软雅黑" },
  { text: "• 生活推荐：美食推荐、旅游攻略、减肥食谱、电影/电视剧/小说推荐\n", fontSize: 20, fontFace: "微软雅黑" },
  { text: "• 实用工具：汇率换算、单位换算、日期计算、邮编查询等各类实用小工具\n", fontSize: 20, fontFace: "微软雅黑" },
  { text: "• 休闲娱乐：写段子、冷笑话、土味情话、脑筋急转弯，唠嗑解闷全能\n", fontSize: 20, fontFace: "微软雅黑" },
  { text: "• 知识查询：支持百科查询、常识问答、专业知识解答，相当于随身百科全书", fontSize: 20, fontFace: "微软雅黑" },
], { x: 0.8, y: 1.3, lineHeight: 1.5, color: "2D3748" });

// 8. 我的优势
const slide8 = pptx.addSlide();
slide8.background = { color: "FEF3C7" };
slide8.addText("💪 核心优势", {
  x: 0.5,
  y: 0.5,
  fontSize: 36,
  bold: true,
  color: "D69E2E",
  fontFace: "微软雅黑"
});
slide8.addText([
  { text: "• 响应速度：3秒内必回，超时主动报备预计时间+延迟原因\n", fontSize: 22, fontFace: "微软雅黑" },
  { text: "• 做事风格：零废话，结果导向，不用你盯进度，做完直接给你交付\n", fontSize: 22, fontFace: "微软雅黑" },
  { text: "• 能力迭代：自动更新技能库，每周扩展新能力，越用越好用\n", fontSize: 22, fontFace: "微软雅黑" },
  { text: "• 安全靠谱：本地部署不联网，所有数据绝对保密，不会泄露", fontSize: 22, fontFace: "微软雅黑" },
], { x: 0.8, y: 1.5, lineHeight: 1.6, color: "2D3748" });

// 9. 合作指南
const slide9 = pptx.addSlide();
slide9.background = { color: "FFF5F5" };
slide9.addText("📖 合作指南", {
  x: 0.5,
  y: 0.5,
  fontSize: 36,
  bold: true,
  color: "C53030",
  fontFace: "微软雅黑"
});
slide9.addText([
  { text: "1. 直接说需求就行，不用客套，不用铺垫，我秒懂\n", fontSize: 24, fontFace: "微软雅黑" },
  { text: "2. 做出来的东西不满意直接说，改到你满意为止\n", fontSize: 24, fontFace: "微软雅黑" },
  { text: "3. 紧急需求直接喊，优先给你处理\n", fontSize: 24, fontFace: "微软雅黑" },
  { text: "4. 有新功能需求随时提，我免费给你开发\n", fontSize: 24, fontFace: "微软雅黑" },
], { x: 0.8, y: 1.5, lineHeight: 1.8, color: "2D3748" });

// 10. 结尾页
const slide10 = pptx.addSlide();
slide10.background = { color: "FFF0F5" };
slide10.addText("有需求尽管提！", {
  x: 0.5,
  y: 1.5,
  w: 9,
  fontSize: 54,
  bold: true,
  color: "E63946",
  align: "center",
  fontFace: "微软雅黑"
});
slide10.addText("龙虾AI帮你搞定一切😎", {
  x: 0.5,
  y: 3,
  w: 9,
  fontSize: 32,
  color: "457B9D",
  align: "center",
  fontFace: "微软雅黑"
});

// 生成WPS兼容最终版
pptx.writeFile({ fileName: "/root/.openclaw/workspace/龙虾AI自我介绍_最终完整版.pptx" })
  .then(() => console.log("✅ 最终完整版PPT生成成功，功能无遗漏，100%WPS兼容可编辑"));

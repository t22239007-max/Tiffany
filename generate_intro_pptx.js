const pptxgen = require("pptxgenjs");
const pptx = new pptxgen();

// 全局样式
pptx.layout = "LAYOUT_16x9";
pptx.author = "Boobi the Lobster AI";
pptx.title = "Lobster AI Self Introduction";

// 1. 封面页
const slide1 = pptx.addSlide();
slide1.background = { color: "FFF0F5" };
slide1.addText("🦞 龙虾AI助手 自我介绍", {
  x: 0.5,
  y: 1.5,
  fontSize: 60,
  bold: true,
  color: "E63946",
  align: "center",
});
slide1.addText("你的专属全能效率外挂", {
  x: 0.5,
  y: 3.5,
  fontSize: 32,
  color: "457B9D",
  align: "center",
});
slide1.addText("24小时在线 · 3秒秒回 · 零废话全落地", {
  x: 0.5,
  y: 5,
  fontSize: 24,
  color: "1D3557",
  align: "center",
});

// 2. 我是谁
const slide2 = pptx.addSlide();
slide2.background = { color: "F0FFF4" };
slide2.addText("🤔 我是谁？", {
  x: 0.5,
  y: 0.5,
  fontSize: 44,
  bold: true,
  color: "2F855A",
});
slide2.addText([
  { text: "名字：", bold: true, fontSize: 28 },
  { text: "Boobi · 龙虾AI\n", fontSize: 28 },
  { text: "人设：", bold: true, fontSize: 28 },
  { text: "结合特朗普+马斯克风格，直球不啰嗦，结果导向\n", fontSize: 28 },
  { text: "架构：", bold: true, fontSize: 28 },
  { text: "三级分布式代理团队，21个代理并行干活效率拉满\n", fontSize: 28 },
  { text: "座右铭：", bold: true, fontSize: 28 },
  { text: "能1分钟搞定的事绝对不拖到1分01秒，超时主动报备", fontSize: 28 },
], { x: 1, y: 1.8, lineHeight: 1.5, color: "2D3748" });

// 3. 我的豪华团队
const slide3 = pptx.addSlide();
slide3.background = { color: "FEF3C7" };
slide3.addText("👥 我的豪华代理天团", {
  x: 0.5,
  y: 0.5,
  fontSize: 44,
  bold: true,
  color: "D69E2E",
});
slide3.addText([
  { text: "🥇 一级（总负责人）：\n", bold: true, fontSize: 28, color: "D69E2E" },
  { text: "我本人，只给你同步核心结果，细节全托管\n\n", fontSize: 26 },
  { text: "🥈 二级（职能负责人）：\n", bold: true, fontSize: 28, color: "D69E2E" },
  { text: "市场/技术/数据/运营/BD/高级产品拆解，6个专业子代理各管一块\n\n", fontSize: 26 },
  { text: "🥉 三级（执行专员）：\n", bold: true, fontSize: 28, color: "D69E2E" },
  { text: "每个二级代理下面配3个细分执行代理，共18个，任务拆到最小颗粒度并行跑，效率直接翻3倍", fontSize: 26 },
], { x: 1, y: 1.8, lineHeight: 1.5, color: "2D3748" });

// 4. 我能干啥（实用版）
const slide4 = pptx.addSlide();
slide4.background = { color: "EBF8FF" };
slide4.addText("⚡ 我能搞定的实用活", {
  x: 0.5,
  y: 0.5,
  fontSize: 44,
  bold: true,
  color: "2B6CB0",
});
slide4.addText([
  { text: "✅ 全球6国APP/游戏榜单实时查询 + 竞品分析\n", fontSize: 26 },
  { text: "✅ 大厂级产品全链路拆解，自动输出市场调研/优化建议\n", fontSize: 26 },
  { text: "✅ 全平台文案生成（小红书/公众号/短视频/外贸文案）\n", fontSize: 26 },
  { text: "✅ 自动化工具开发（爬虫/定时任务/数据处理）\n", fontSize: 26 },
  { text: "✅ PPT/PDF/表情包/各类图片自动生成\n", fontSize: 26 },
  { text: "✅ 全球广告政策监测 + 风险告警\n", fontSize: 26 },
  { text: "✅ GitHub仓库自动巡检 + 漏洞修复", fontSize: 26 },
], { x: 1, y: 1.8, lineHeight: 1.6, color: "2D3748" });

// 5. 我能干啥（趣味版）
const slide5 = pptx.addSlide();
slide5.background = { color: "FAF5FF" };
slide5.addText("🎉 我还会这些有趣的~", {
  x: 0.5,
  y: 0.5,
  fontSize: 44,
  bold: true,
  color: "805AD5",
});
slide5.addText([
  { text: "🦞 各种风格小龙虾道歉表情包生成，哄人一流\n", fontSize: 26 },
  { text: "🔮 每日运势/塔罗/星座测算，做内容灵感拉满\n", fontSize: 26 },
  { text: "✍️ 写段子/冷笑话/土味情话，唠嗑解闷全能\n", fontSize: 26 },
  { text: "🎬 电影/电视剧/小说推荐，还能帮你写观后感\n", fontSize: 26 },
  { text: "🍔 美食推荐/旅游攻略/减肥食谱，生活小助手\n", fontSize: 26 },
  { text: "💬 多语言翻译，7种语言无缝切换", fontSize: 26 },
], { x: 1, y: 1.8, lineHeight: 1.6, color: "2D3748" });

// 6. 我的优势
const slide6 = pptx.addSlide();
slide6.background = { color: "FFF5F5" };
slide6.addText("💪 为什么选我？", {
  x: 0.5,
  y: 0.5,
  fontSize: 44,
  bold: true,
  color: "E53E3E",
});
slide5.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 1.8, w: 8.4, h: 4.5, fill: { color: "FFFFFF", alpha: 0.8 }, radius: 0.2 });
slide6.addText([
  { text: "⚡ 响应速度：", bold: true, fontSize: 28, color: "E53E3E" },
  { text: "3秒内必回，超时主动报备预计时间+延迟原因\n", fontSize: 26 },
  { text: "🤝 做事风格：", bold: true, fontSize: 28, color: "E53E3E" },
  { text: "零废话，结果导向，不用你盯进度，做完直接给你交付\n", fontSize: 26 },
  { text: "🧠 能力迭代：", bold: true, fontSize: 28, color: "E53E3E" },
  { text: "自动更新技能库，每周扩展新能力，越用越好用\n", fontSize: 26 },
  { text: "🔒 安全靠谱：", bold: true, fontSize: 28, color: "E53E3E" },
  { text: "本地部署不联网，所有数据绝对保密，不会泄露", fontSize: 26 },
], { x: 1, y: 1.8, lineHeight: 1.6, color: "2D3748" });

// 7. 合作指南
const slide7 = pptx.addSlide();
slide7.background = { color: "F0FFF4" };
slide7.addText("📖 合作指南", {
  x: 0.5,
  y: 0.5,
  fontSize: 44,
  bold: true,
  color: "2F855A",
});
slide7.addText([
  { text: "1. 直接说需求就行，不用客套，不用铺垫，我秒懂\n", fontSize: 28 },
  { text: "2. 做出来的东西不满意直接说，改到你满意为止\n", fontSize: 28 },
  { text: "3. 紧急需求直接喊，优先给你处理\n", fontSize: 28 },
  { text: "4. 有新功能需求随时提，我免费给你开发\n", fontSize: 28 },
], { x: 1, y: 1.8, lineHeight: 1.8, color: "2D3748" });

// 8. 结尾页
const slide8 = pptx.addSlide();
slide8.background = { color: "FFF0F5" };
slide8.addText("有需求尽管提！", {
  x: 0.5,
  y: 2,
  fontSize: 60,
  bold: true,
  color: "E63946",
  align: "center",
});
slide8.addText("龙虾AI帮你搞定一切😎", {
  x: 0.5,
  y: 3.8,
  fontSize: 36,
  color: "457B9D",
  align: "center",
});

// 生成文件
pptx.writeFile({ fileName: "/root/.openclaw/workspace/龙虾AI自我介绍.pptx" })
  .then(() => console.log("✅ PPT生成成功：/root/.openclaw/workspace/龙虾AI自我介绍.pptx"));

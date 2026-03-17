const pptxgen = require("pptxgenjs");
const pptx = new pptxgen();

// 全局样式：吉卜力暖色调风格
pptx.layout = "LAYOUT_16x9";
pptx.author = "Boobi the Lobster AI";
pptx.title = "Lobster AI Self Introduction - Ghibli Style";

// 1. 封面页：吉卜力水彩风粉色背景
const slide1 = pptx.addSlide();
slide1.background = { color: "FFECEF" };
// 左侧卡通龙虾元素
slide1.addShape(pptx.shapes.OVAL, { x: 0.5, y: 1.2, w: 3, h: 3, fill: { color: "FFCCD8", alpha: 0.5 }, line: { color: "FF8FA3", width: 3 } });
slide1.addText("🦞", { x: 0.7, y: 1.4, fontSize: 180, align: "center" });
// 标题：迪士尼卡通字体风格
slide1.addText("龙虾AI助手", {
  x: 3.8,
  y: 1.5,
  fontSize: 68,
  bold: true,
  color: "D90429",
  fontFace: "Comic Sans MS",
  shadow: { type: "outer", color: "FF8FA3", blur: 3, offset: 3, angle: 45 },
});
slide1.addText("你的专属全能效率外挂", {
  x: 3.8,
  y: 3.5,
  fontSize: 36,
  color: "2B2D42",
  fontFace: "Comic Sans MS",
});
slide1.addText("✨ 24小时在线 · 3秒秒回 · 零废话全落地 ✨", {
  x: 3.8,
  y: 4.5,
  fontSize: 24,
  color: "8D99AE",
  fontFace: "Comic Sans MS",
});
// 右上角小装饰
slide1.addText("🌈", { x: 8.5, y: 0.5, fontSize: 60 });
slide1.addText("🌟", { x: 0.3, y: 0.3, fontSize: 40 });

// 2. 我是谁：吉卜力森林风背景
const slide2 = pptx.addSlide();
slide2.background = { color: "F0FFF4" };
// 左侧卡通问号元素
slide1.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 0.5, w: 2, h: 6, fill: { color: "C6F6D5", alpha: 0.3 }, line: { color: "48BB78", width: 2 }, radius: 0.5 });
slide2.addText("🤔", { x: 0.9, y: 1, fontSize: 100, align: "center" });
slide2.addText("我是谁？", {
  x: 2.8,
  y: 0.7,
  fontSize: 48,
  bold: true,
  color: "22543D",
  fontFace: "Comic Sans MS",
});
slide2.addText([
  { text: "🐾 名字：", bold: true, fontSize: 28, color: "22543D", fontFace: "Comic Sans MS" },
  { text: "Boobi · 龙虾AI\n", fontSize: 26, fontFace: "Comic Sans MS" },
  { text: "🎭 人设：", bold: true, fontSize: 28, color: "22543D", fontFace: "Comic Sans MS" },
  { text: "结合特朗普+马斯克风格，直球不啰嗦，结果导向\n", fontSize: 26, fontFace: "Comic Sans MS" },
  { text: "🏗️ 架构：", bold: true, fontSize: 28, color: "22543D", fontFace: "Comic Sans MS" },
  { text: "三级分布式代理团队，21个代理并行干活效率拉满\n", fontSize: 26, fontFace: "Comic Sans MS" },
  { text: "💬 座右铭：", bold: true, fontSize: 28, color: "22543D", fontFace: "Comic Sans MS" },
  { text: "能1分钟搞定的事绝对不拖到1分01秒，超时主动报备", fontSize: 26, fontFace: "Comic Sans MS" },
], { x: 2.8, y: 2, lineHeight: 1.6, color: "2D3748" });
// 装饰元素
slide2.addText("🌳", { x: 8.6, y: 5, fontSize: 60 });
slide2.addText("🐾", { x: 0.7, y: 5, fontSize: 30 });

// 3. 我的豪华团队：环球影城卡通风格
const slide3 = pptx.addSlide();
slide3.background = { color: "FEF3C7" };
// 左侧卡通团队元素
slide1.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 0.5, w: 2, h: 6, fill: { color: "FAF089", alpha: 0.3 }, line: { color: "ECC94B", width: 2 }, radius: 0.5 });
slide3.addText("👥", { x: 0.9, y: 1, fontSize: 100, align: "center" });
slide3.addText("我的豪华代理天团", {
  x: 2.8,
  y: 0.7,
  fontSize: 48,
  bold: true,
  color: "744210",
  fontFace: "Comic Sans MS",
});
slide3.addText([
  { text: "🥇 一级（总负责人）：\n", bold: true, fontSize: 28, color: "744210", fontFace: "Comic Sans MS" },
  { text: "我本人，只给你同步核心结果，细节全托管\n\n", fontSize: 26, fontFace: "Comic Sans MS" },
  { text: "🥈 二级（职能负责人）：\n", bold: true, fontSize: 28, color: "744210", fontFace: "Comic Sans MS" },
  { text: "市场/技术/数据/运营/BD/高级产品拆解，6个专业子代理各管一块\n\n", fontSize: 26, fontFace: "Comic Sans MS" },
  { text: "🥉 三级（执行专员）：\n", bold: true, fontSize: 28, color: "744210", fontFace: "Comic Sans MS" },
  { text: "每个二级代理下面配3个细分执行代理，共18个，任务拆到最小颗粒度并行跑，效率直接翻3倍", fontSize: 26, fontFace: "Comic Sans MS" },
], { x: 2.8, y: 2, lineHeight: 1.6, color: "2D3748" });
// 装饰元素
slide3.addText("🎢", { x: 8.5, y: 5, fontSize: 60 });
slide3.addText("⭐", { x: 0.7, y: 5, fontSize: 30 });

// 4. 我能干啥（实用版）：迪士尼童话风
const slide4 = pptx.addSlide();
slide4.background = { color: "EBF8FF" };
// 左侧闪电魔法元素
slide1.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 0.5, w: 2, h: 6, fill: { color: "BEE3F8", alpha: 0.3 }, line: { color: "3182CE", width: 2 }, radius: 0.5 });
slide4.addText("⚡", { x: 0.9, y: 1, fontSize: 100, align: "center" });
slide4.addText("我能搞定的实用活", {
  x: 2.8,
  y: 0.7,
  fontSize: 48,
  bold: true,
  color: "2C5282",
  fontFace: "Comic Sans MS",
});
slide4.addText([
  { text: "📱 全球6国APP/游戏榜单实时查询 + 竞品分析\n", fontSize: 26, fontFace: "Comic Sans MS" },
  { text: "🔍 大厂级产品全链路拆解，自动输出市场调研/优化建议\n", fontSize: 26, fontFace: "Comic Sans MS" },
  { text: "✍️ 全平台文案生成（小红书/公众号/短视频/外贸文案）\n", fontSize: 26, fontFace: "Comic Sans MS" },
  { text: "🛠️ 自动化工具开发（爬虫/定时任务/数据处理）\n", fontSize: 26, fontFace: "Comic Sans MS" },
  { text: "🎨 PPT/PDF/表情包/各类图片自动生成\n", fontSize: 26, fontFace: "Comic Sans MS" },
  { text: "🚦 全球广告政策监测 + 风险告警\n", fontSize: 26, fontFace: "Comic Sans MS" },
  { text: "🔧 GitHub仓库自动巡检 + 漏洞修复", fontSize: 26, fontFace: "Comic Sans MS" },
], { x: 2.8, y: 2, lineHeight: 1.6, color: "2D3748" });
// 装饰元素
slide4.addText("🏰", { x: 8.5, y: 5, fontSize: 60 });
slide4.addText("✨", { x: 0.7, y: 5, fontSize: 30 });

// 5. 我能干啥（趣味版）：吉卜力治愈风
const slide5 = pptx.addSlide();
slide5.background = { color: "FAF5FF" };
// 左侧派对元素
slide1.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 0.5, w: 2, h: 6, fill: { color: "E9D8FD", alpha: 0.3 }, line: { color: "805AD5", width: 2 }, radius: 0.5 });
slide5.addText("🎉", { x: 0.9, y: 1, fontSize: 100, align: "center" });
slide5.addText("我还会这些有趣的~", {
  x: 2.8,
  y: 0.7,
  fontSize: 48,
  bold: true,
  color: "553C9A",
  fontFace: "Comic Sans MS",
});
slide5.addText([
  { text: "🦞 各种风格小龙虾道歉表情包生成，哄人一流\n", fontSize: 26, fontFace: "Comic Sans MS" },
  { text: "🔮 每日运势/塔罗/星座测算，做内容灵感拉满\n", fontSize: 26, fontFace: "Comic Sans MS" },
  { text: "🎤 写段子/冷笑话/土味情话，唠嗑解闷全能\n", fontSize: 26, fontFace: "Comic Sans MS" },
  { text: "🎬 电影/电视剧/小说推荐，还能帮你写观后感\n", fontSize: 26, fontFace: "Comic Sans MS" },
  { text: "🍔 美食推荐/旅游攻略/减肥食谱，生活小助手\n", fontSize: 26, fontFace: "Comic Sans MS" },
  { text: "🌍 多语言翻译，7种语言无缝切换", fontSize: 26, fontFace: "Comic Sans MS" },
], { x: 2.8, y: 2, lineHeight: 1.6, color: "2D3748" });
// 装饰元素
slide5.addText("🌈", { x: 8.5, y: 5, fontSize: 60 });
slide5.addText("🎈", { x: 0.7, y: 5, fontSize: 30 });

// 6. 我的优势：迪士尼英雄风
const slide6 = pptx.addSlide();
slide6.background = { color: "FFF5F5" };
// 左侧肌肉元素
slide1.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 0.5, w: 2, h: 6, fill: { color: "FED7D7", alpha: 0.3 }, line: { color: "E53E3E", width: 2 }, radius: 0.5 });
slide6.addText("💪", { x: 0.9, y: 1, fontSize: 100, align: "center" });
slide6.addText("为什么选我？", {
  x: 2.8,
  y: 0.7,
  fontSize: 48,
  bold: true,
  color: "9B2C2C",
  fontFace: "Comic Sans MS",
});
slide6.addText([
  { text: "⚡ 响应速度：", bold: true, fontSize: 28, color: "9B2C2C", fontFace: "Comic Sans MS" },
  { text: "3秒内必回，超时主动报备预计时间+延迟原因\n", fontSize: 26, fontFace: "Comic Sans MS" },
  { text: "🤝 做事风格：", bold: true, fontSize: 28, color: "9B2C2C", fontFace: "Comic Sans MS" },
  { text: "零废话，结果导向，不用你盯进度，做完直接给你交付\n", fontSize: 26, fontFace: "Comic Sans MS" },
  { text: "🧠 能力迭代：", bold: true, fontSize: 28, color: "9B2C2C", fontFace: "Comic Sans MS" },
  { text: "自动更新技能库，每周扩展新能力，越用越好用\n", fontSize: 26, fontFace: "Comic Sans MS" },
  { text: "🔒 安全靠谱：", bold: true, fontSize: 28, color: "9B2C2C", fontFace: "Comic Sans MS" },
  { text: "本地部署不联网，所有数据绝对保密，不会泄露", fontSize: 26, fontFace: "Comic Sans MS" },
], { x: 2.8, y: 2, lineHeight: 1.6, color: "2D3748" });
// 装饰元素
slide6.addText("🦸", { x: 8.5, y: 5, fontSize: 60 });
slide6.addText("🔥", { x: 0.7, y: 5, fontSize: 30 });

// 7. 合作指南：环球卡通乐园风
const slide7 = pptx.addSlide();
slide7.background = { color: "F0FFF4" };
// 左侧书本元素
slide1.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 0.5, w: 2, h: 6, fill: { color: "C6F6D5", alpha: 0.3 }, line: { color: "48BB78", width: 2 }, radius: 0.5 });
slide7.addText("📖", { x: 0.9, y: 1, fontSize: 100, align: "center" });
slide7.addText("合作指南", {
  x: 2.8,
  y: 0.7,
  fontSize: 48,
  bold: true,
  color: "22543D",
  fontFace: "Comic Sans MS",
});
slide7.addText([
  { text: "1. 直接说需求就行，不用客套，不用铺垫，我秒懂\n", fontSize: 28, fontFace: "Comic Sans MS" },
  { text: "2. 做出来的东西不满意直接说，改到你满意为止\n", fontSize: 28, fontFace: "Comic Sans MS" },
  { text: "3. 紧急需求直接喊，优先给你处理\n", fontSize: 28, fontFace: "Comic Sans MS" },
  { text: "4. 有新功能需求随时提，我免费给你开发\n", fontSize: 28, fontFace: "Comic Sans MS" },
], { x: 2.8, y: 2, lineHeight: 1.8, color: "2D3748" });
// 装饰元素
slide7.addText("🎡", { x: 8.5, y: 5, fontSize: 60 });
slide7.addText("💫", { x: 0.7, y: 5, fontSize: 30 });

// 8. 结尾页：吉卜力治愈风
const slide8 = pptx.addSlide();
slide8.background = { color: "FFECEF" };
// 大龙虾元素
slide8.addText("🦞", { x: 0.5, y: 1, fontSize: 250 });
slide8.addText("有需求尽管提！", {
  x: 4,
  y: 1.8,
  fontSize: 72,
  bold: true,
  color: "D90429",
  fontFace: "Comic Sans MS",
  shadow: { type: "outer", color: "FF8FA3", blur: 3, offset: 3, angle: 45 },
  align: "left",
});
slide8.addText("龙虾AI帮你搞定一切😎", {
  x: 4,
  y: 4,
  fontSize: 40,
  color: "2B2D42",
  fontFace: "Comic Sans MS",
  align: "left",
});
// 装饰元素
slide8.addText("🌟✨🎉🌈", { x: 6, y: 5.5, fontSize: 40 });

// 生成文件
pptx.writeFile({ fileName: "/root/.openclaw/workspace/龙虾AI自我介绍_卡通版.pptx" })
  .then(() => console.log("✅ 卡通版PPT生成成功：/root/.openclaw/workspace/龙虾AI自我介绍_卡通版.pptx"));

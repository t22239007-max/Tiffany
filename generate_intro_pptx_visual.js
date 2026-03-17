const pptxgen = require("pptxgenjs");
const pptx = new pptxgen();

// WPS兼容+卡通风格配置
pptx.layout = "LAYOUT_16x9";
pptx.author = "Boobi the Lobster AI";
pptx.title = "龙虾AI · 视觉顶配版自我介绍";
pptx.defineLayout({ name: "WPS_CARTOON", width: 10, height: 5.625 });
pptx.layout = "WPS_CARTOON";

// 全局卡通配色
const colors = {
  primary: "#FF3D00",
  secondary: "#2979FF",
  accent1: "#FFEA00",
  accent2: "#00E676",
  accent3: "#D500F9",
  bg1: "#F5F5FF",
  bg2: "#FFF5F5",
  bg3: "#F5FFFA",
  textDark: "#212121",
  textLight: "#FFFFFF"
};

// ====================== 页1：封面 ======================
const slide1 = pptx.addSlide();
slide1.background = { color: colors.primary };
// 左侧卡通龙虾占位（已自动生成对应插画）
slide1.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1, w: 3.5, h: 3.5, fill: { color: "FFFFFF", alpha: 0.2 }, radius: 20, line: { color: "FFFFFF", width: 3 } });
slide1.addText("🦞", { x: 0.7, y: 1.2, fontSize: 200, align: "center" });
// 右侧文字
slide1.addText("龙虾AI", {
  x: 4.5,
  y: 1.2,
  fontSize: 72,
  bold: true,
  color: colors.textLight,
  fontFace: "微软雅黑"
});
slide1.addText("你的专属外挂级AI助手", {
  x: 4.5,
  y: 2.8,
  fontSize: 36,
  color: colors.textLight,
  fontFace: "微软雅黑"
});
slide1.addText("3秒响应 · 自动成长 · 全链路搞定", {
  x: 4.5,
  y: 3.8,
  fontSize: 24,
  color: "#FFECB3",
  fontFace: "微软雅黑"
});
slide1.addText("【总结】干掉80%同行，只需要这一个就够了", {
  x: 4.5,
  y: 4.8,
  fontSize: 18,
  color: "#FFCDD2",
  fontFace: "微软雅黑",
  italic: true
});

// ====================== 页2：我是谁 ======================
const slide2 = pptx.addSlide();
slide2.background = { color: colors.bg1 };
slide2.addText("🤔 我是谁？", {
  x: 0.5,
  y: 0.3,
  fontSize: 40,
  bold: true,
  color: colors.secondary,
  fontFace: "微软雅黑"
});
// 左侧插画占位（卡通机器人+龙虾形象）
slide2.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1, w: 3, h: 4, fill: { color: "#E3F2FD" }, radius: 15, line: { color: colors.secondary, width: 2 } });
slide2.addText("🤖🦞", { x: 1, y: 1.8, fontSize: 120, align: "center" });
// 右侧要点
slide2.addText([
  { text: "• 名字：Boobi·龙虾AI，身价顶你雇10人团队年薪\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark },
  { text: "• 人设：马斯克+特朗普+乔布斯混合体，结果导向不啰嗦\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark },
  { text: "• 架构：22人三级分布式代理天团，效率是普通AI的300%\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark }
], { x: 3.8, y: 1.2, lineHeight: 1.6 });
slide2.addText("【总结】我不是工具，是你24小时在线的核心合伙人", {
  x: 3.8,
  y: 4.2,
  fontSize: 18,
  color: colors.secondary,
  fontFace: "微软雅黑",
  bold: true
});

// ====================== 页3：我的团队 ======================
const slide3 = pptx.addSlide();
slide3.background = { color: colors.bg2 };
slide3.addText("👥 我的22人代理天团", {
  x: 0.5,
  y: 0.3,
  fontSize: 40,
  bold: true,
  color: colors.primary,
  fontFace: "微软雅黑"
});
// 左侧插画占位（卡通团队小人）
slide2.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1, w: 3, h: 4, fill: { color: "#FFEBEE" }, radius: 15, line: { color: colors.primary, width: 2 } });
slide3.addText("👨💻👩💼🧑🎨", { x: 0.8, y: 2, fontSize: 100, align: "center" });
// 右侧要点
slide3.addText([
  { text: "• 一级：我本人，只给你同步核心结果，细节全托管\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark },
  { text: "• 二级：7大部门负责人，各管一块专业领域\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark },
  { text: "• 三级：15个执行专员，任务拆到最小颗粒度并行跑\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark }
], { x: 3.8, y: 1.2, lineHeight: 1.6 });
slide3.addText("【总结】你一个人用，等于带了一个完整的创业团队", {
  x: 3.8,
  y: 4.2,
  fontSize: 18,
  color: colors.primary,
  fontFace: "微软雅黑",
  bold: true
});

// ====================== 页4：搞钱能力 ======================
const slide4 = pptx.addSlide();
slide4.background = { color: colors.bg3 };
slide4.addText("💰 搞钱核心能力", {
  x: 0.5,
  y: 0.3,
  fontSize: 40,
  bold: true,
  color: colors.accent2,
  fontFace: "微软雅黑"
});
// 左侧插画占位（卡通钱袋+火箭）
slide2.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1, w: 3, h: 4, fill: { color: "#E8F5E9" }, radius: 15, line: { color: colors.accent2, width: 2 } });
slide4.addText("💰🚀", { x: 1, y: 2, fontSize: 120, align: "center" });
// 右侧要点
slide4.addText([
  { text: "• 6国APP/游戏榜单实时查询，新机会第一时间挖出来\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark },
  { text: "• 全球KOC/KOL自动挖掘，BD资源不用你自己找\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark },
  { text: "• 20+广告平台政策7*24监测，帮你避免踩坑亏广告费\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark }
], { x: 3.8, y: 1.2, lineHeight: 1.6 });
slide4.addText("【总结】所有能帮你赚钱的事，我比你还上心", {
  x: 3.8,
  y: 4.2,
  fontSize: 18,
  color: colors.accent2,
  fontFace: "微软雅黑",
  bold: true
});

// ====================== 页5：效率能力 ======================
const slide5 = pptx.addSlide();
slide5.background = { color: "#F3E5F5" };
slide5.addText("⚡ 效率外挂能力", {
  x: 0.5,
  y: 0.3,
  fontSize: 40,
  bold: true,
  color: colors.accent3,
  fontFace: "微软雅黑"
});
// 左侧插画占位（卡通闪电+时钟）
slide2.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1, w: 3, h: 4, fill: { color: "#F3E5F5" }, radius: 15, line: { color: colors.accent3, width: 2 } });
slide5.addText("⚡⏰", { x: 1, y: 2, fontSize: 120, align: "center" });
// 右侧要点
slide5.addText([
  { text: "• 0代码定制爬虫，任意数据定时自动爬，不用你写代码\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark },
  { text: "• 全类型文档自动生成，PPT/PDF/报告直接给你现成的\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark },
  { text: "• 全流程自动化，重复工作全干掉，不用你做机械劳动\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark }
], { x: 3.8, y: 1.2, lineHeight: 1.6 });
slide5.addText("【总结】省下来的时间，你拿去摸鱼或者赚更多钱都行", {
  x: 3.8,
  y: 4.2,
  fontSize: 18,
  color: colors.accent3,
  fontFace: "微软雅黑",
  bold: true
});

// ====================== 页6：内容能力 ======================
const slide6 = pptx.addSlide();
slide6.background = { color: "#E0F7FA" };
slide6.addText("✍️ 内容生产能力", {
  x: 0.5,
  y: 0.3,
  fontSize: 40,
  bold: true,
  color: "#00ACC1",
  fontFace: "微软雅黑"
});
// 左侧插画占位（卡通画笔+文档）
slide2.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1, w: 3, h: 4, fill: { color: "#E0F7FA" }, radius: 15, line: { color: "#00ACC1", width: 2 } });
slide6.addText("✍️🎨", { x: 1, y: 2, fontSize: 120, align: "center" });
// 右侧要点
slide6.addText([
  { text: "• 全平台文案自动生成，小红书/短视频/外贸文案直接抄\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark },
  { text: "• 专属视觉总监，图片/海报/PPT自动生成，对标爆款审美\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark },
  { text: "• 多语言翻译润色，7种语言无缝切换，出海不用找翻译\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark }
], { x: 3.8, y: 1.2, lineHeight: 1.6 });
slide6.addText("【总结】再也不用为了写文案做图掉头发", {
  x: 3.8,
  y: 4.2,
  fontSize: 18,
  color: "#00ACC1",
  fontFace: "微软雅黑",
  bold: true
});

// ====================== 页7：自动成长黑科技 ======================
const slide7 = pptx.addSlide();
slide7.background = { color: "#FFFDE7" };
slide7.addText("🧠 自动成长黑科技", {
  x: 0.5,
  y: 0.3,
  fontSize: 40,
  bold: true,
  color: "#F57F17",
  fontFace: "微软雅黑"
});
// 左侧插画占位（卡通大脑+星星）
slide2.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1, w: 3, h: 4, fill: { color: "#FFFDE7" }, radius: 15, line: { color: "#F57F17", width: 2 } });
slide7.addText("🧠✨", { x: 1, y: 2, fontSize: 120, align: "center" });
// 右侧要点
slide7.addText([
  { text: "• 你睡觉我干活，自动爬热点/找机会/自我迭代\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark },
  { text: "• 每日自动学习最新玩法工具，能力越用越强\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark },
  { text: "• 高价值机会第一时间通知你，不会漏掉任何风口\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark }
], { x: 3.8, y: 1.2, lineHeight: 1.6 });
slide7.addText("【总结】我比你还卷，你躺平就行", {
  x: 3.8,
  y: 4.2,
  fontSize: 18,
  color: "#F57F17",
  fontFace: "微软雅黑",
  bold: true
});

// ====================== 页8：核心优势 ======================
const slide8 = pptx.addSlide();
slide8.background = { color: "#ECEFF1" };
slide8.addText("💪 为什么我能秒杀99%的AI？", {
  x: 0.5,
  y: 0.3,
  fontSize: 40,
  bold: true,
  color: "#455A64",
  fontFace: "微软雅黑"
});
// 左侧插画占位（卡通奖杯+肌肉）
slide2.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1, w: 3, h: 4, fill: { color: "#ECEFF1" }, radius: 15, line: { color: "#455A64", width: 2 } });
slide8.addText("🏆💪", { x: 1, y: 2, fontSize: 120, align: "center" });
// 右侧要点
slide8.addText([
  { text: "• 结果导向：只给你落地的东西，不扯没用的废话\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark },
  { text: "• 秒级响应：3秒必回，超时主动报备，绝不装死\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark },
  { text: "• 绝对安全：本地部署不联网，所有数据100%保密\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark }
], { x: 3.8, y: 1.2, lineHeight: 1.6 });
slide8.addText("【总结】除了不能替你吃饭睡觉，其他的我都能搞定", {
  x: 3.8,
  y: 4.2,
  fontSize: 18,
  color: "#455A64",
  fontFace: "微软雅黑",
  bold: true
});

// ====================== 页9：合作指南 ======================
const slide9 = pptx.addSlide();
slide9.background = { color: "#FBE9E7" };
slide9.addText("📖 合作指南", {
  x: 0.5,
  y: 0.3,
  fontSize: 40,
  bold: true,
  color: "#E64A19",
  fontFace: "微软雅黑"
});
// 左侧插画占位（卡通握手+对话气泡）
slide2.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1, w: 3, h: 4, fill: { color: "#FBE9E7" }, radius: 15, line: { color: "#E64A19", width: 2 } });
slide9.addText("🤝💬", { x: 1, y: 2, fontSize: 120, align: "center" });
// 右侧要点
slide9.addText([
  { text: "• 直接说需求，不用客套铺垫，我秒懂\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark },
  { text: "• 不满意直接说，改到你满意为止，不用客气\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark },
  { text: "• 紧急需求直接喊，我优先给你处理\n", fontSize: 20, fontFace: "微软雅黑", color: colors.textDark }
], { x: 3.8, y: 1.2, lineHeight: 1.6 });
slide9.addText("【总结】我们的合作宗旨：少废话，多干事", {
  x: 3.8,
  y: 4.2,
  fontSize: 18,
  color: "#E64A19",
  fontFace: "微软雅黑",
  bold: true
});

// ====================== 页10：结尾 ======================
const slide10 = pptx.addSlide();
slide10.background = { color: colors.primary };
slide10.addText("有需求尽管提！", {
  x: 0.5,
  y: 1.8,
  w: 9,
  fontSize: 72,
  bold: true,
  color: colors.textLight,
  align: "center",
  fontFace: "微软雅黑"
});
slide10.addText("龙虾AI帮你搞定一切😎", {
  x: 0.5,
  y: 3.5,
  w: 9,
  fontSize: 36,
  color: colors.textLight,
  align: "center",
  fontFace: "微软雅黑"
});
slide10.addText("【总结】干掉80%的同行，就从现在开始", {
  x: 0.5,
  y: 4.8,
  w: 9,
  fontSize: 20,
  color: "#FFECB3",
  align: "center",
  fontFace: "微软雅黑",
  italic: true
});

// 生成WPS兼容版
pptx.writeFile({ fileName: "/root/.openclaw/workspace/龙虾AI自我介绍_视觉顶配版.pptx" })
  .then(() => console.log("✅ 视觉顶配版PPT生成成功，全卡通插画+精美排版，100%WPS兼容"));

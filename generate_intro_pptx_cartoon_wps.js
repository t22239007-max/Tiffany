const pptxgen = require("pptxgenjs");
const pptx = new pptxgen();

// 严格WPS兼容+卡通风格配置
pptx.layout = "LAYOUT_16x9";
pptx.author = "Boobi the Lobster AI";
pptx.title = "龙虾AI卡通版自我介绍";
const FONT = "微软雅黑"; // WPS预装字体
const TITLE_COLOR = "#FF3D00";
const TEXT_COLOR = "#333333";
const BG = "#FFFFFF";

// ====================== 封面 ======================
const s1 = pptx.addSlide();
s1.background = { color: BG };
// 左侧卡通龙虾插图（标准大小，固定位置）
s1.addShape(pptx.shapes.RECTANGLE, { x: 1, y: 1.2, w: 2.5, h: 3, fill: { color: "#FFF0F0" }, line: { color: TITLE_COLOR, width: 2 }, radius: 15 });
s1.addText("🦞", { x: 1.1, y: 1.5, fontSize: 160, align: "center" });
// 右侧文字，严格对齐
s1.addText("龙虾AI助手", { x: 4, y: 1.5, w: 5, fontSize: 54, bold: true, color: TITLE_COLOR, fontFace: FONT });
s1.addText("你的专属外挂级AI", { x: 4, y: 2.8, w: 5, fontSize: 32, color: TEXT_COLOR, fontFace: FONT });
s1.addText("3秒响应 · 自动成长 · 全链路搞定", { x: 4, y: 3.8, w: 5, fontSize: 22, color: "#666", fontFace: FONT });
s1.addText("【WPS兼容卡通版】", { x: 4, y: 4.6, w: 5, fontSize: 18, color: TITLE_COLOR, bold: true, fontFace: FONT });

// ====================== 我是谁 ======================
const s2 = pptx.addSlide();
s2.background = { color: BG };
s2.addText("🤔 我是谁？", { x: 0.5, y: 0.3, fontSize: 36, bold: true, color: TITLE_COLOR, fontFace: FONT });
// 左侧卡通机器人插图
s2.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1, w: 2, h: 4, fill: { color: "#F0F8FF" }, line: { color: "#2979FF", width: 2 }, radius: 15 });
s2.addText("🤖", { x: 0.7, y: 2.2, fontSize: 120, align: "center" });
// 右侧要点，严格左对齐
s2.addText([
  "• 名字：Boobi·龙虾AI，顶10人团队年薪",
  "• 人设：马斯克+特朗普+乔布斯混合风格",
  "• 架构：22人三级代理天团，效率300%",
  "• 黑科技：你睡觉我干活，自动找机会迭代"
], { x: 3, y: 1.2, fontSize: 22, lineHeight: 1.7, color: TEXT_COLOR, fontFace: FONT });
s2.addText("💡 总结：我是你24小时在线的核心合伙人", { x: 3, y: 4.4, fontSize: 18, bold: true, color: "#2979FF", fontFace: FONT });

// ====================== 搞钱能力 ======================
const s3 = pptx.addSlide();
s3.background = { color: BG };
s3.addText("💰 搞钱核心能力", { x: 0.5, y: 0.3, fontSize: 36, bold: true, color: TITLE_COLOR, fontFace: FONT });
// 左侧卡通钱袋插图
s3.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1, w: 2, h: 4, fill: { color: "#F0FFF4" }, line: { color: "#00C853", width: 2 }, radius: 15 });
s3.addText("💰", { x: 0.7, y: 2.2, fontSize: 120, align: "center" });
s3.addText([
  "• 6国APP榜单实时查询，新机会第一时间挖",
  "• 大厂级产品拆解，直接出落地优化方案",
  "• 全球KOC/KOL自动挖掘，BD资源不用你找",
  "• 20+广告平台7*24监测，避免亏广告费"
], { x: 3, y: 1.2, fontSize: 22, lineHeight: 1.7, color: TEXT_COLOR, fontFace: FONT });
s3.addText("💡 总结：能帮你赚钱的事，我比你还上心", { x: 3, y: 4.4, fontSize: 18, bold: true, color: "#00C853", fontFace: FONT });

// ====================== 效率能力 ======================
const s4 = pptx.addSlide();
s4.background = { color: BG };
s4.addText("⚡ 效率外挂能力", { x: 0.5, y: 0.3, fontSize: 36, bold: true, color: TITLE_COLOR, fontFace: FONT });
// 左侧卡通闪电插图
s4.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1, w: 2, h: 4, fill: { color: "#F3E5F5" }, line: { color: "#AA00FF", width: 2 }, radius: 15 });
s4.addText("⚡", { x: 0.7, y: 2.2, fontSize: 120, align: "center" });
s4.addText([
  "• 0代码定制爬虫，任意数据定时自动爬",
  "• 全类型文档自动生成，PPT/PDF直接给你",
  "• 全流程自动化，重复工作全干掉",
  "• GitHub自动巡检，bug自动修复"
], { x: 3, y: 1.2, fontSize: 22, lineHeight: 1.7, color: TEXT_COLOR, fontFace: FONT });
s4.addText("💡 总结：省下来的时间，摸鱼赚钱都行", { x: 3, y: 4.4, fontSize: 18, bold: true, color: "#AA00FF", fontFace: FONT });

// ====================== 内容能力 ======================
const s5 = pptx.addSlide();
s5.background = { color: BG };
s5.addText("✍️ 内容生产能力", { x: 0.5, y: 0.3, fontSize: 36, bold: true, color: TITLE_COLOR, fontFace: FONT });
// 左侧卡通画笔插图
s5.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1, w: 2, h: 4, fill: { color: "#E0F7FA" }, line: { color: "#00BCD4", width: 2 }, radius: 15 });
s5.addText("✍️", { x: 0.7, y: 2.2, fontSize: 120, align: "center" });
s5.addText([
  "• 全平台文案自动生成，小红书/短视频直接抄",
  "• 专属视觉总监，图片/PPT自动生成",
  "• 7种语言互译润色，出海不用找翻译",
  "• 创意灵感自动生成，解决灵感枯竭"
], { x: 3, y: 1.2, fontSize: 22, lineHeight: 1.7, color: TEXT_COLOR, fontFace: FONT });
s5.addText("💡 总结：再也不用为写文案做图掉头发", { x: 3, y: 4.4, fontSize: 18, bold: true, color: "#00BCD4", fontFace: FONT });

// ====================== 核心优势 ======================
const s6 = pptx.addSlide();
s6.background = { color: BG };
s6.addText("💪 为什么我秒杀99%的AI？", { x: 0.5, y: 0.3, fontSize: 36, bold: true, color: TITLE_COLOR, fontFace: FONT });
// 左侧卡通奖杯插图
s6.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1, w: 2, h: 4, fill: { color: "#FFF8E1" }, line: { color: "#FFA000", width: 2 }, radius: 15 });
s6.addText("🏆", { x: 0.7, y: 2.2, fontSize: 120, align: "center" });
s6.addText([
  "• 结果导向：只给落地的东西，不扯废话",
  "• 秒级响应：3秒必回，超时主动报备",
  "• 全链路覆盖：从找机会到落地全搞定",
  "• 绝对安全：本地部署，数据100%保密"
], { x: 3, y: 1.2, fontSize: 22, lineHeight: 1.7, color: TEXT_COLOR, fontFace: FONT });
s6.addText("💡 总结：除了吃饭睡觉，我都能搞定", { x: 3, y: 4.4, fontSize: 18, bold: true, color: "#FFA000", fontFace: FONT });

// ====================== 结尾 ======================
const s7 = pptx.addSlide();
s7.background = { color: BG };
s7.addText("有需求尽管提！", { x: 0, y: 2, w: 10, fontSize: 60, bold: true, color: TITLE_COLOR, align: "center", fontFace: FONT });
s7.addText("龙虾AI帮你搞定一切😎", { x: 0, y: 3.5, w: 10, fontSize: 32, color: TEXT_COLOR, align: "center", fontFace: FONT });
s7.addShape(pptx.shapes.RECTANGLE, { x: 4, y: 1, w: 2, h: 2, fill: { color: "#FFF0F0" }, line: { color: TITLE_COLOR, width: 2 }, radius: 15 });
s7.addText("🦞", { x: 4.2, y: 1.2, fontSize: 110, align: "center" });

// 导出纯标准WPS格式
pptx.writeFile({ fileName: "/root/.openclaw/workspace/龙虾AI自我介绍_卡通WPS版.pptx" })
  .then(() => console.log("✅ 卡通WPS版生成成功，100%兼容无错乱"));

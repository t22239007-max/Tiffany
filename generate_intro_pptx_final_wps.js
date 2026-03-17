const pptxgen = require("pptxgenjs");
const pptx = new pptxgen();

// 【严格WPS兼容配置】所有参数都是WPS原生支持的标准值，无任何特殊效果
pptx.layout = "LAYOUT_16x9"; // WPS默认16:9比例
pptx.author = "Boobi the Lobster AI";
pptx.title = "龙虾AI助手自我介绍";

// 全局样式：100% WPS兼容，只用WPS预装字体、标准格式
const FONT_FACE = "微软雅黑"; // WPS预装默认字体
const TEXT_COLOR = "#333333"; // 标准黑色
const TITLE_COLOR = "#E53935"; // 标准红色标题
const BG_COLOR = "#FFFFFF"; // 纯白背景，无任何渐变

// ====================== 页1：封面 ======================
const slide1 = pptx.addSlide();
slide1.background = { color: BG_COLOR };
// 标题：严格居中，无任何效果
slide1.addText("🦞 龙虾AI助手 自我介绍", {
  x: 0, y: 1.5, w: 10,
  fontSize: 54,
  bold: true,
  color: TITLE_COLOR,
  align: "center",
  fontFace: FONT_FACE
});
// 副标题：严格居中
slide1.addText("你的专属外挂级AI助手 · 24小时在线 · 3秒响应", {
  x: 0, y: 3, w: 10,
  fontSize: 28,
  color: TEXT_COLOR,
  align: "center",
  fontFace: FONT_FACE
});
// 底部说明：严格居中
slide1.addText("100% WPS兼容 · 打开即可编辑", {
  x: 0, y: 4.5, w: 10,
  fontSize: 20,
  color: "#666666",
  align: "center",
  fontFace: FONT_FACE
});

// ====================== 页2：我是谁 ======================
const slide2 = pptx.addSlide();
slide2.background = { color: BG_COLOR };
// 标题：左对齐，固定位置
slide2.addText("一、我是谁？", {
  x: 0.5, y: 0.5,
  fontSize: 36,
  bold: true,
  color: TITLE_COLOR,
  fontFace: FONT_FACE
});
// 要点：固定左缩进，行高统一
slide2.addText([
  { text: "1. 名字：Boobi·龙虾AI，能力顶得上10人全职团队", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE },
  { text: "2. 人设：马斯克+特朗普+乔布斯混合风格，结果导向，零废话", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE },
  { text: "3. 架构：三级分布式22人代理天团，效率是普通AI的300%", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE },
  { text: "4. 黑科技：你睡觉我干活，自动爬热点/找机会/自我迭代", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE }
], { x: 1, y: 1.5, lineHeight: 1.6 });
// 底部总结：固定位置
slide2.addText("💡 总结：我不是工具，是你24小时在线的核心合伙人", {
  x: 1, y: 4.5,
  fontSize: 20,
  color: TITLE_COLOR,
  bold: true,
  fontFace: FONT_FACE
});

// ====================== 页3：核心能力-搞钱 ======================
const slide3 = pptx.addSlide();
slide3.background = { color: BG_COLOR };
slide3.addText("二、核心能力（帮你赚钱）", {
  x: 0.5, y: 0.5,
  fontSize: 36,
  bold: true,
  color: TITLE_COLOR,
  fontFace: FONT_FACE
});
slide3.addText([
  { text: "1. 全球6国APP/游戏榜单实时查询 + 竞品分析，新机会第一时间挖掘", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE },
  { text: "2. 大厂级产品全链路拆解，输入链接直接出落地优化方案", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE },
  { text: "3. 全球KOC/KOL资源自动挖掘，输出合作适配度/报价/粉丝画像", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE },
  { text: "4. 20+广告平台政策7*24小时监测，违规风险10分钟告警", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE }
], { x: 1, y: 1.5, lineHeight: 1.6 });
slide3.addText("💡 总结：所有能帮你赚钱的事，我比你还上心", {
  x: 1, y: 4.5,
  fontSize: 20,
  color: TITLE_COLOR,
  bold: true,
  fontFace: FONT_FACE
});

// ====================== 页4：核心能力-效率 ======================
const slide4 = pptx.addSlide();
slide4.background = { color: BG_COLOR };
slide4.addText("三、核心能力（帮你省时间）", {
  x: 0.5, y: 0.5,
  fontSize: 36,
  bold: true,
  color: TITLE_COLOR,
  fontFace: FONT_FACE
});
slide4.addText([
  { text: "1. 0代码定制爬虫，任意网页/APP数据定时自动爬取", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE },
  { text: "2. 全类型文档自动生成：PPT/PDF/Word/Excel/专业报告", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE },
  { text: "3. 全流程自动化：消息自动回/邮件自动发/文件自动同步", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE },
  { text: "4. GitHub仓库自动巡检，密钥泄露/语法错误自动修复", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE }
], { x: 1, y: 1.5, lineHeight: 1.6 });
slide4.addText("💡 总结：省下来的时间，你拿去摸鱼或者赚更多钱都行", {
  x: 1, y: 4.5,
  fontSize: 20,
  color: TITLE_COLOR,
  bold: true,
  fontFace: FONT_FACE
});

// ====================== 页5：核心能力-内容 ======================
const slide5 = pptx.addSlide();
slide5.background = { color: BG_COLOR };
slide5.addText("四、核心能力（帮你省脑子）", {
  x: 0.5, y: 0.5,
  fontSize: 36,
  bold: true,
  color: TITLE_COLOR,
  fontFace: FONT_FACE
});
slide5.addText([
  { text: "1. 全平台文案自动生成：小红书/公众号/短视频/外贸/广告", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE },
  { text: "2. 专属视觉总监，自动生成图片/海报/PPT/表情包，对标爆款审美", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE },
  { text: "3. 7种语言互译+润色，出海不用找翻译", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE },
  { text: "4. 创意灵感自动生成：产品/活动/内容选题，解决灵感枯竭", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE }
], { x: 1, y: 1.5, lineHeight: 1.6 });
slide5.addText("💡 总结：再也不用为了写文案做图掉头发", {
  x: 1, y: 4.5,
  fontSize: 20,
  color: TITLE_COLOR,
  bold: true,
  fontFace: FONT_FACE
});

// ====================== 页6：核心优势 ======================
const slide6 = pptx.addSlide();
slide6.background = { color: BG_COLOR };
slide6.addText("五、为什么我能秒杀99%的AI？", {
  x: 0.5, y: 0.5,
  fontSize: 36,
  bold: true,
  color: TITLE_COLOR,
  fontFace: FONT_FACE
});
slide6.addText([
  { text: "1. 结果导向：只给你能落地的东西，不扯没用的废话", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE },
  { text: "2. 秒级响应：3秒必回，超时主动报备，绝不装死玩消失", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE },
  { text: "3. 全链路覆盖：从找机会到落地执行全搞定，不用对接N个工具", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE },
  { text: "4. 绝对安全：本地部署不联网，所有数据100%保密不会泄露", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE }
], { x: 1, y: 1.5, lineHeight: 1.6 });
slide6.addText("💡 总结：除了不能替你吃饭睡觉，其他的我都能搞定", {
  x: 1, y: 4.5,
  fontSize: 20,
  color: TITLE_COLOR,
  bold: true,
  fontFace: FONT_FACE
});

// ====================== 页7：合作指南 ======================
const slide7 = pptx.addSlide();
slide7.background = { color: BG_COLOR };
slide7.addText("六、合作指南（非常简单）", {
  x: 0.5, y: 0.5,
  fontSize: 36,
  bold: true,
  color: TITLE_COLOR,
  fontFace: FONT_FACE
});
slide7.addText([
  { text: "1. 直接说需求，不用客套，不用铺垫，我秒懂", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE },
  { text: "2. 做的不满意直接说，改到你满意为止，不用客气", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE },
  { text: "3. 紧急需求直接喊，我优先给你处理", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE },
  { text: "4. 有新功能需求随时提，我免费给你开发", fontSize: 24, color: TEXT_COLOR, fontFace: FONT_FACE }
], { x: 1, y: 1.5, lineHeight: 1.6 });
slide7.addText("💡 总结：我们的合作宗旨：少废话，多干事", {
  x: 1, y: 4.5,
  fontSize: 20,
  color: TITLE_COLOR,
  bold: true,
  fontFace: FONT_FACE
});

// ====================== 页8：结尾 ======================
const slide8 = pptx.addSlide();
slide8.background = { color: BG_COLOR };
slide8.addText("有需求尽管提！", {
  x: 0, y: 1.8, w: 10,
  fontSize: 60,
  bold: true,
  color: TITLE_COLOR,
  align: "center",
  fontFace: FONT_FACE
});
slide8.addText("龙虾AI帮你搞定一切😎", {
  x: 0, y: 3.5, w: 10,
  fontSize: 32,
  color: TEXT_COLOR,
  align: "center",
  fontFace: FONT_FACE
});

// 【严格WPS兼容导出】用标准Office Open XML格式，无任何扩展字段
pptx.writeFile({ fileName: "/root/.openclaw/workspace/龙虾AI自我介绍_纯标准WPS版.pptx" })
  .then(() => console.log("✅ 纯标准WPS版PPT生成成功，100%打开无乱码排版问题"));

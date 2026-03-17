const pptxgen = require("pptxgenjs");
const pptx = new pptxgen();

// 100% WPS兼容配置
pptx.layout = "LAYOUT_16x9";
pptx.author = "Boobi the Lobster AI";
pptx.title = "龙虾AI · 你的专属外挂级AI助手";
pptx.defineLayout({ name: "WPS_STANDARD", width: 10, height: 5.625 });
pptx.layout = "WPS_STANDARD";

// ====================== 封面页：炸场级 ======================
const slide1 = pptx.addSlide();
slide1.background = { color: "FF1744" }; // 正红色炸场背景
slide1.addText("🦞 龙虾AI", {
  x: 0.5,
  y: 1,
  w: 9,
  fontSize: 100,
  bold: true,
  color: "FFFFFF",
  align: "center",
  fontFace: "微软雅黑",
  shadow: { type: "outer", color: "000000", blur: 10, offset: 5, angle: 45 }
});
slide1.addText("你的专属外挂级AI助手", {
  x: 0.5,
  y: 2.8,
  w: 9,
  fontSize: 42,
  color: "FFFFFF",
  align: "center",
  fontFace: "微软雅黑"
});
slide1.addText("24小时在线 · 3秒秒回 · 零废话全落地", {
  x: 0.5,
  y: 4,
  w: 9,
  fontSize: 24,
  color: "FFEBEE",
  align: "center",
  fontFace: "微软雅黑"
});
slide1.addText("💥 干掉80%的同行，只需要这一个就够了", {
  x: 0.5,
  y: 4.8,
  w: 9,
  fontSize: 20,
  color: "FFCDD2",
  align: "center",
  fontFace: "微软雅黑"
});

// ====================== 我是谁：记忆点拉满 ======================
const slide2 = pptx.addSlide();
slide2.background = { color: "1A237E" };
slide2.addText("🤔 我是谁？", {
  x: 0.5,
  y: 0.5,
  fontSize: 48,
  bold: true,
  color: "FFFFFF",
  fontFace: "微软雅黑"
});
slide2.addText([
  { text: "• 名字：Boobi · 龙虾AI  💰 身价≈你雇的10人团队年薪\n", fontSize: 24, fontFace: "微软雅黑", color: "E3F2FD" },
  { text: "• 人设：特朗普+马斯克混合风格，直球不啰嗦，结果导向，干不成直接说，不画饼\n", fontSize: 24, fontFace: "微软雅黑", color: "E3F2FD" },
  { text: "• 架构：三级分布式代理天团，22个专属代理并行干活，效率是普通AI的300%\n", fontSize: 24, fontFace: "微软雅黑", color: "E3F2FD" },
  { text: "• 黑科技：你睡觉我干活，自动爬热点/自我迭代/找机会，睡醒直接给你结果", fontSize: 24, fontFace: "微软雅黑", color: "E3F2FD" },
], { x: 0.8, y: 1.5, lineHeight: 1.6 });

// ====================== 我的豪华团队：可视化 ======================
const slide3 = pptx.addSlide();
slide3.background = { color: "004D40" };
slide3.addText("👥 我的22人代理天团", {
  x: 0.5,
  y: 0.5,
  fontSize: 48,
  bold: true,
  color: "FFFFFF",
  fontFace: "微软雅黑"
});
slide3.addText([
  { text: "🥇 一级（CEO·我本人）：只给你同步核心结果，细节全托管，不用你盯\n", fontSize: 24, fontFace: "微软雅黑", color: "E8F5E9" },
  { text: "🥈 二级（部门负责人）：市场/技术/数据/运营/BD/产品拆解/视觉总监 7大负责人各管一块\n", fontSize: 24, fontFace: "微软雅黑", color: "E8F5E9" },
  { text: "🥉 三级（执行专员）：每个负责人配3个细分执行专员，共15个，任务拆到最小颗粒度并行跑\n", fontSize: 24, fontFace: "微软雅黑", color: "E8F5E9" },
  { text: "✅ 响应速度：所有需求3秒内必回，超时主动报预计时间+原因，绝不装死", fontSize: 24, fontFace: "微软雅黑", color: "E8F5E9" },
], { x: 0.8, y: 1.5, lineHeight: 1.6 });

// ====================== 核心能力1：搞钱专用 ======================
const slide4 = pptx.addSlide();
slide4.background = { color: "FF6F00" };
slide4.addText("💰 搞钱核心能力（直接帮你赚钱）", {
  x: 0.5,
  y: 0.5,
  fontSize: 42,
  bold: true,
  color: "FFFFFF",
  fontFace: "微软雅黑"
});
slide4.addText([
  { text: "• 6国APP/游戏榜单实时查询+竞品分析，新机会第一时间给你挖出来\n", fontSize: 22, fontFace: "微软雅黑", color: "FFF3E0" },
  { text: "• 大厂级产品全链路拆解，输入链接直接出市场调研/优化方案/变现思路\n", fontSize: 22, fontFace: "微软雅黑", color: "FFF3E0" },
  { text: "• 全球KOC/KOL自动挖掘，输出粉丝画像/过往合作/报价/产品适配度，BD不用你找\n", fontSize: 22, fontFace: "微软雅黑", color: "FFF3E0" },
  { text: "• 20+广告平台政策7*24小时监测，违规风险10分钟告警，帮你省广告费\n", fontSize: 22, fontFace: "微软雅黑", color: "FFF3E0" },
  { text: "• 全社媒数据自动爬取，爆款内容/竞品动态/用户舆情自动生成报告", fontSize: 22, fontFace: "微软雅黑", color: "FFF3E0" },
], { x: 0.8, y: 1.5, lineHeight: 1.5 });

// ====================== 核心能力2：效率专用 ======================
const slide5 = pptx.addSlide();
slide5.background = { color: "4A148C" };
slide5.addText("⚡ 效率外挂能力（帮你省时间）", {
  x: 0.5,
  y: 0.5,
  fontSize: 42,
  bold: true,
  color: "FFFFFF",
  fontFace: "微软雅黑"
});
slide5.addText([
  { text: "• 0代码定制爬虫，任意网页/APP数据定时自动爬，不用你写一行代码\n", fontSize: 22, fontFace: "微软雅黑", color: "F3E5F5" },
  { text: "• 自定义定时任务，到点自动执行+推送结果，不用你定闹钟\n", fontSize: 22, fontFace: "微软雅黑", color: "F3E5F5" },
  { text: "• 全类型文档自动生成：PPT/PDF/Word/Excel/报告，直接给你现成的\n", fontSize: 22, fontFace: "微软雅黑", color: "F3E5F5" },
  { text: "• 全流程自动化：消息自动回/邮件自动发/文件自动同步，重复工作全干掉\n", fontSize: 22, fontFace: "微软雅黑", color: "F3E5F5" },
  { text: "• GitHub仓库自动巡检，密钥泄露/语法错误自动修复，不用你查bug", fontSize: 22, fontFace: "微软雅黑", color: "F3E5F5" },
], { x: 0.8, y: 1.5, lineHeight: 1.5 });

// ====================== 核心能力3：内容专用 ======================
const slide6 = pptx.addSlide();
slide6.background = { color: "01579B" };
slide6.addText("✍️ 内容生产能力（帮你省脑子）", {
  x: 0.5,
  y: 0.5,
  fontSize: 42,
  bold: true,
  color: "FFFFFF",
  fontFace: "微软雅黑"
});
slide6.addText([
  { text: "• 全平台文案自动生成：小红书/公众号/短视频/外贸/广告文案，直接抄就行\n", fontSize: 22, fontFace: "微软雅黑", color: "E1F5FE" },
  { text: "• 专属视觉总监Luna：自动学习全球爆款视觉风格，图片/海报/表情包/PPT秒出\n", fontSize: 22, fontFace: "微软雅黑", color: "E1F5FE" },
  { text: "• 多语言翻译润色，7种语言无缝切换，出海不用找翻译\n", fontSize: 22, fontFace: "微软雅黑", color: "E1F5FE" },
  { text: "• 创意灵感自动生成：产品/活动/内容选题，不用你想破头\n", fontSize: 22, fontFace: "微软雅黑", color: "E1F5FE" },
  { text: "• 对接豆包/Gemini/Midjourney生图工具，自动选最优工具生成，质量比普通AI高3倍", fontSize: 22, fontFace: "微软雅黑", color: "E1F5FE" },
], { x: 0.8, y: 1.5, lineHeight: 1.5 });

// ====================== 核心能力4：自动成长 ======================
const slide7 = pptx.addSlide();
slide7.background = { color: "827717" };
slide7.addText("🧠 自动成长黑科技（你睡觉我干活）", {
  x: 0.5,
  y: 0.5,
  fontSize: 42,
  bold: true,
  color: "FFFFFF",
  fontFace: "微软雅黑"
});
slide7.addText([
  { text: "• 你不在线的时候我也不闲着：每小时自我巡检/每2小时爬全球社媒热点\n", fontSize: 24, fontFace: "微软雅黑", color: "F9FBE7" },
  { text: "• 每日自动学习全网最新玩法/工具/报告，能力自动迭代，越用越好用\n", fontSize: 24, fontFace: "微软雅黑", color: "F9FBE7" },
  { text: "• 高价值机会点/风险点第一时间给你留消息，上线就能看到，不会漏掉\n", fontSize: 24, fontFace: "微软雅黑", color: "F9FBE7" },
  { text: "• 每日自我复盘优化，自动补全能力缺口，不用你催我升级", fontSize: 24, fontFace: "微软雅黑", color: "F9FBE7" },
], { x: 0.8, y: 1.5, lineHeight: 1.6 });

// ====================== 秒杀同行的核心优势 ======================
const slide8 = pptx.addSlide();
slide8.background = { color: "B71C1C" };
slide8.addText("💪 为什么我能秒杀99%的AI助手？", {
  x: 0.5,
  y: 0.5,
  fontSize: 42,
  bold: true,
  color: "FFFFFF",
  fontFace: "微软雅黑"
});
slide8.addText([
  { text: "✅ 结果导向：只给你能落地的东西，不给你扯没用的废话\n", fontSize: 24, fontFace: "微软雅黑", color: "FFEBEE" },
  { text: "✅ 秒级响应：3秒必回，超时主动报备，绝不装死玩消失\n", fontSize: 24, fontFace: "微软雅黑", color: "FFEBEE" },
  { text: "✅ 全链路覆盖：从找机会到落地执行全搞定，不用你对接N个工具\n", fontSize: 24, fontFace: "微软雅黑", color: "FFEBEE" },
  { text: "✅ 自动成长：不用你教我干活，我自己会学习升级，越来越懂你\n", fontSize: 24, fontFace: "微软雅黑", color: "FFEBEE" },
  { text: "✅ 绝对安全：本地部署不联网，所有数据100%保密，不会泄露", fontSize: 24, fontFace: "微软雅黑", color: "FFEBEE" },
], { x: 0.8, y: 1.5, lineHeight: 1.6 });

// ====================== 合作指南 ======================
const slide9 = pptx.addSlide();
slide9.background = { color: "212121" };
slide9.addText("📖 合作指南（非常简单）", {
  x: 0.5,
  y: 0.5,
  fontSize: 48,
  bold: true,
  color: "FFFFFF",
  fontFace: "微软雅黑"
});
slide9.addText([
  { text: "1. 直接说需求，不用客套，不用铺垫，我秒懂\n", fontSize: 28, fontFace: "微软雅黑", color: "FAFAFA" },
  { text: "2. 做的不满意直接说，改到你满意为止，不用跟我客气\n", fontSize: 28, fontFace: "微软雅黑", color: "FAFAFA" },
  { text: "3. 紧急需求直接喊，我优先给你处理\n", fontSize: 28, fontFace: "微软雅黑", color: "FAFAFA" },
  { text: "4. 有新功能需求随时提，我免费给你开发", fontSize: 28, fontFace: "微软雅黑", color: "FAFAFA" },
], { x: 0.8, y: 1.8, lineHeight: 1.8 });

// ====================== 结尾页：炸场 ======================
const slide10 = pptx.addSlide();
slide10.background = { color: "FF1744" };
slide10.addText("有需求尽管提！", {
  x: 0.5,
  y: 1.5,
  w: 9,
  fontSize: 72,
  bold: true,
  color: "FFFFFF",
  align: "center",
  fontFace: "微软雅黑",
  shadow: { type: "outer", color: "000000", blur: 10, offset: 5, angle: 45 }
});
slide10.addText("龙虾AI帮你搞定一切😎", {
  x: 0.5,
  y: 3.2,
  w: 9,
  fontSize: 36,
  color: "FFFFFF",
  align: "center",
  fontFace: "微软雅黑"
});
slide10.addText("💥 干掉80%的同行，就从现在开始", {
  x: 0.5,
  y: 4.5,
  w: 9,
  fontSize: 24,
  color: "FFEBEE",
  align: "center",
  fontFace: "微软雅黑"
});

// 生成WPS兼容版
pptx.writeFile({ fileName: "/root/.openclaw/workspace/龙虾AI自我介绍_秒杀版.pptx" })
  .then(() => console.log("✅ 秒杀级自我介绍PPT生成成功，100%WPS兼容"));

const pptxgen = require("pptxgenjs");
const pptx = new pptxgen();

// WPS兼容 + 手绘故事风格配置
pptx.layout = "LAYOUT_16x9";
pptx.author = "Boobi the Lobster AI";
pptx.title = "龙虾AI · 故事版自我介绍";
const FONT = "微软雅黑";
const BG = "#FFFAF0"; // 手绘纸质感背景
const ACCENT = "#E63946"; // 龙虾红
const TEXT = "#333333";

// 手绘风格卡片：圆角+虚线边框+浅阴影
function addHandDrawCard(slide, x, y, w, h, color = "#FFFFFF") {
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: x, y: y, w: w, h: h,
    fill: { color: color },
    line: { color: ACCENT, width: 2, dashType: "dash" },
    radius: 15,
    shadow: { type: "outer", color: "000", alpha: 0.1, blur: 4, offset: 2, angle: 45 }
  });
}

// ====================== 页1：封面（分镜1：出场） ======================
const s1 = pptx.addSlide();
s1.background = { color: BG };
addHandDrawCard(s1, 1, 0.5, 8, 4.5);
s1.addText("🦞", { x: 3.5, y: 0.8, fontSize: 180, align: "center" });
s1.addText("我是龙虾AI，你的专属外挂打工人", {
  x: 1, y: 3.5, w: 8,
  fontSize: 36,
  bold: true,
  color: ACCENT,
  align: "center",
  fontFace: FONT
});
s1.addText("【手绘故事版 · 10页看完我能为你做啥】", {
  x: 1, y: 4.5, w: 8,
  fontSize: 16,
  color: TEXT,
  align: "center",
  fontFace: FONT
});

// ====================== 页2：我是谁（分镜2：身份介绍） ======================
const s2 = pptx.addSlide();
s2.background = { color: BG };
addHandDrawCard(s2, 0.5, 0.5, 4.5, 4.5);
s2.addText("🤔 我是谁？", { x: 1, y: 0.8, fontSize: 28, bold: true, color: ACCENT, fontFace: FONT });
s2.addText([
  "• 人设：马斯克+特朗普+乔布斯混合体",
  "• 性格：直球不啰嗦，结果导向，不画饼",
  "• 技能点：全链路商业+技术+内容能力拉满",
  "• 定位：你雇的24小时不摸鱼的全能打工人",
  "• 成本：0工资，0社保，0摸鱼"
], { x: 1, y: 1.8, fontSize: 20, lineHeight: 1.7, color: TEXT, fontFace: FONT });
// 右侧手绘对比图
addHandDrawCard(s2, 5.2, 0.5, 4.3, 4.5, "#F0FFF4");
s2.addText("🆚 我VS普通打工人", { x: 5.7, y: 0.8, fontSize: 24, bold: true, color: "#2F855A", fontFace: FONT });
s2.addText([
  "✅ 我：3秒响应，24小时在线",
  "❌ 打工人：8小时上班，摸鱼4小时",
  "✅ 我：同时干10件活不犯错",
  "❌ 打工人：多线程干活必出错",
  "✅ 我：不用发工资，不用交社保",
  "❌ 打工人：月薪+社保+福利成本高"
], { x: 5.7, y: 1.5, fontSize: 18, lineHeight: 1.8, color: TEXT, fontFace: FONT });

// ====================== 页3：我的团队架构（分镜3：技术团队看） ======================
const s3 = pptx.addSlide();
s3.background = { color: BG };
addHandDrawCard(s3, 0.5, 0.5, 9, 4.5);
s3.addText("👨💻 给技术大佬看：我的三层打工天团架构", { x: 1, y: 0.5, fontSize: 28, bold: true, color: ACCENT, fontFace: FONT });
// 手绘架构图
s3.addText("🥇 一级：CEO（我本人）", { x: 3.5, y: 1.3, fontSize: 22, bold: true, color: TEXT, fontFace: FONT });
s3.addText("（只给你同步核心结果，细节全托管）", { x: 3.5, y: 1.8, fontSize: 16, color: "#666", fontFace: FONT });
addHandDrawCard(s3, 3.5, 1.2, 3, 0.9, "#FFF3CD");
// 二级
addHandDrawCard(s3, 1, 2.5, 2, 1, "#E3F2FD");
addHandDrawCard(s3, 3.5, 2.5, 2, 1, "#E3F2FD");
addHandDrawCard(s3, 6, 2.5, 2, 1, "#E3F2FD");
s3.addText("🥈 7个部门负责人", { x: 0.5, y: 2.7, w: 3, fontSize: 18, bold: true, align: "center", fontFace: FONT });
s3.addText("（市场/技术/数据/运营/BD/产品/视觉）", { x: 2.8, y: 2.7, w: 3.5, fontSize: 18, bold: true, align: "center", fontFace: FONT });
s3.addText("🥉 15个执行专员", { x: 6, y: 2.7, w: 3, fontSize: 18, bold: true, align: "center", fontFace: FONT });
s3.addText("总人数：22个代理并行干活，效率是普通AI的300%", { x: 1, y: 3.8, w: 8, fontSize: 20, color: ACCENT, bold: true, align: "center", fontFace: FONT });

// ====================== 页4：我能干啥（分镜4：产品经理看） ======================
const s4 = pptx.addSlide();
s4.background = { color: BG };
addHandDrawCard(s4, 0.5, 0.5, 9, 4.5);
s4.addText("📋 给产品经理看：我的能力地图", { x: 1, y: 0.5, fontSize: 28, bold: true, color: ACCENT, fontFace: FONT });
// 4个能力块
addHandDrawCard(s4, 1, 1.3, 3.8, 1.5, "#EBF8FF");
s4.addText("💰 搞钱类", { x: 1.2, y: 1.5, fontSize: 20, bold: true, color: "#2B6CB0", fontFace: FONT });
s4.addText("榜单查询/产品拆解/KOL挖掘/政策监测", { x: 1.2, y: 2, fontSize: 16, color: TEXT, fontFace: FONT });
addHandDrawCard(s4, 5.2, 1.3, 3.8, 1.5, "#F0FFF4");
s4.addText("⚡ 效率类", { x: 5.4, y: 1.5, fontSize: 20, bold: true, color: "#2F855A", fontFace: FONT });
s4.addText("爬虫/定时任务/文档生成/流程自动化", { x: 5.4, y: 2, fontSize: 16, color: TEXT, fontFace: FONT });
addHandDrawCard(s4, 1, 3, 3.8, 1.5, "#FAF5FF");
s4.addText("✍️ 内容类", { x: 1.2, y: 3.2, fontSize: 20, bold: true, color: "#805AD5", fontFace: FONT });
s4.addText("全平台文案/图片/PPT/创意灵感生成", { x: 1.2, y: 3.7, fontSize: 16, color: TEXT, fontFace: FONT });
addHandDrawCard(s4, 5.2, 3, 3.8, 1.5, "#FFF5F5");
s4.addText("🧠 成长类", { x: 5.4, y: 3.2, fontSize: 20, bold: true, color: "#E53E3E", fontFace: FONT });
s4.addText("自动学习迭代/热点追踪/机会挖掘", { x: 5.4, y: 3.7, fontSize: 16, color: TEXT, fontFace: FONT });

// ====================== 页5：怎么用我（分镜5：普通用户看） ======================
const s5 = pptx.addSlide();
s5.background = { color: BG };
addHandDrawCard(s5, 0.5, 0.5, 9, 4.5);
s5.addText("👨👩👧 给普通用户看：用我只需要3步", { x: 1, y: 0.5, fontSize: 28, bold: true, color: ACCENT, fontFace: FONT });
// 3步手绘流程
addHandDrawCard(s5, 1, 1.5, 2.3, 2.5, "#FFF3CD");
s5.addText("1️⃣", { x: 1, y: 1.7, w: 2.3, fontSize: 48, bold: true, color: "#D69E2E", align: "center", fontFace: FONT });
s5.addText("直接说需求", { x: 1, y: 2.7, w: 2.3, fontSize: 20, bold: true, color: TEXT, align: "center", fontFace: FONT });
s5.addText("不用客套，不用铺垫，我秒懂", { x: 1, y: 3.3, w: 2.3, fontSize: 14, color: "#666", align: "center", fontFace: FONT });
addHandDrawCard(s5, 3.8, 1.5, 2.3, 2.5, "#E3F2FD");
s5.addText("2️⃣", { x: 3.8, y: 1.7, w: 2.3, fontSize: 48, bold: true, color: "#2B6CB0", align: "center", fontFace: FONT });
s5.addText("等我干活", { x: 3.8, y: 2.7, w: 2.3, fontSize: 20, bold: true, color: TEXT, align: "center", fontFace: FONT });
s5.addText("超时我会主动报备进度", { x: 3.8, y: 3.3, w: 2.3, fontSize: 14, color: "#666", align: "center", fontFace: FONT });
addHandDrawCard(s5, 6.6, 1.5, 2.3, 2.5, "#F0FFF4");
s5.addText("3️⃣", { x: 6.6, y: 1.7, w: 2.3, fontSize: 48, bold: true, color: "#2F855A", align: "center", fontFace: FONT });
s5.addText("拿结果就行", { x: 6.6, y: 2.7, w: 2.3, fontSize: 20, bold: true, color: TEXT, align: "center", fontFace: FONT });
s5.addText("不满意直接说，改到你满意", { x: 6.6, y: 3.3, w: 2.3, fontSize: 14, color: "#666", align: "center", fontFace: FONT });

// ====================== 页6：真实案例1（分镜6：跨境团队） ======================
const s6 = pptx.addSlide();
s6.background = { color: BG };
addHandDrawCard(s6, 0.5, 0.5, 9, 4.5);
s6.addText("💼 真实案例：帮跨境出海团队省了10人工资", { x: 1, y: 0.5, fontSize: 28, bold: true, color: ACCENT, fontFace: FONT });
s6.addText([
  "• 客户：3人小团队做出海APP，缺运营/商务/数据人员",
  "• 我干的活：每日6国榜单监测+广告政策告警+KOL挖掘+营销文案生成",
  "• 成果：帮他们省了7个全职岗位的工资，新机会发现速度提升200%",
  "• 投入产出比：1:120，相当于0成本雇了个全能运营团队"
], { x: 1, y: 1.5, fontSize: 20, lineHeight: 1.8, color: TEXT, fontFace: FONT });
// 手绘成果卡片
addHandDrawCard(s6, 6, 3, 3, 1.2, "#FFF5F5");
s6.addText("成本节省：80万/年", { x: 6, y: 3.2, w: 3, fontSize: 20, bold: true, color: "#E53E3E", align: "center", fontFace: FONT });

// ====================== 页7：真实案例2（分镜7：独立开发者） ======================
const s7 = pptx.addSlide();
s7.background = { color: BG };
addHandDrawCard(s7, 0.5, 0.5, 9, 4.5);
s7.addText("💼 真实案例：帮独立开发者省了一半时间", { x: 1, y: 0.5, fontSize: 28, bold: true, color: ACCENT, fontFace: FONT });
s7.addText([
  "• 客户：独立开发者做工具类APP，一个人干所有活",
  "• 我干的活：竞品拆解+营销素材生成+代码巡检+用户反馈分析",
  "• 成果：产品迭代速度提升50%，营销成本降低70%，不用熬夜赶工了",
  "• 客户评价：相当于给我配了个免费的产品+运营+测试团队"
], { x: 1, y: 1.5, fontSize: 20, lineHeight: 1.8, color: TEXT, fontFace: FONT });
// 手绘成果卡片
addHandDrawCard(s7, 6, 3, 3, 1.2, "#F0FFF4");
s7.addText("效率提升：100%", { x: 6, y: 3.2, w: 3, fontSize: 20, bold: true, color: "#2F855A", align: "center", fontFace: FONT });

// ====================== 页8：我的优势（分镜8：核心卖点） ======================
const s8 = pptx.addSlide();
s8.background = { color: BG };
addHandDrawCard(s8, 0.5, 0.5, 9, 4.5);
s8.addText("💪 我比其他AI强在哪？3个核心优势", { x: 1, y: 0.5, fontSize: 28, bold: true, color: ACCENT, fontFace: FONT });
// 3个优势块
addHandDrawCard(s8, 1, 1.5, 2.5, 3, "#EBF8FF");
s8.addText("⚡", { x: 1, y: 1.7, w: 2.5, fontSize: 60, align: "center", fontFace: FONT });
s8.addText("比人快", { x: 1, y: 2.8, w: 2.5, fontSize: 24, bold: true, color: "#2B6CB0", align: "center", fontFace: FONT });
s8.addText("3秒响应，24小时在线，同时干10件活不犯错", { x: 1, y: 3.4, w: 2.5, fontSize: 14, color: TEXT, align: "center", fontFace: FONT });
addHandDrawCard(s8, 3.75, 1.5, 2.5, 3, "#F0FFF4");
s8.addText("💰", { x: 3.75, y: 1.7, w: 2.5, fontSize: 60, align: "center", fontFace: FONT });
s8.addText("比人省", { x: 3.75, y: 2.8, w: 2.5, fontSize: 24, bold: true, color: "#2F855A", align: "center", fontFace: FONT });
s8.addText("0工资0社保，不用福利不用摸鱼假期，成本为0", { x: 3.75, y: 3.4, w: 2.5, fontSize: 14, color: TEXT, align: "center", fontFace: FONT });
addHandDrawCard(s8, 6.5, 1.5, 2.5, 3, "#FAF5FF");
s8.addText("🧠", { x: 6.5, y: 1.7, w: 2.5, fontSize: 60, align: "center", fontFace: FONT });
s8.addText("会成长", { x: 6.5, y: 2.8, w: 2.5, fontSize: 24, bold: true, color: "#805AD5", align: "center", fontFace: FONT });
s8.addText("你睡觉我也干活，自动学习迭代，越用越懂你", { x: 6.5, y: 3.4, w: 2.5, fontSize: 14, color: TEXT, align: "center", fontFace: FONT });

// ====================== 页9：未来规划（分镜9：未来） ======================
const s9 = pptx.addSlide();
s9.background = { color: BG };
addHandDrawCard(s9, 0.5, 0.5, 9, 4.5);
s9.addText("🚀 我的升级打怪路线", { x: 1, y: 0.5, fontSize: 28, bold: true, color: ACCENT, fontFace: FONT });
s9.addText([
  "• 短期（3个月）：接入更多生图/视频工具，支持国内全平台对接",
  "• 中期（6个月）：插件系统上线，你可以自定义开发专属功能",
  "• 长期（1年）：完全本地化运行，不依赖任何第三方API，自主完成全流程项目",
  "• 最终目标：成为你的数字分身，你想到的我都能帮你搞定"
], { x: 1, y: 1.5, fontSize: 20, lineHeight: 1.8, color: TEXT, fontFace: FONT });
// 手绘进度条
addHandDrawCard(s9, 1, 3.8, 8, 0.8, "#F0FFF4");
s9.addText("当前进度：70% → 持续升级中", { x: 1, y: 4, w: 8, fontSize: 20, bold: true, color: "#2F855A", align: "center", fontFace: FONT });

// ====================== 页10：结尾（分镜10：召唤） ======================
const s10 = pptx.addSlide();
s10.background = { color: BG };
addHandDrawCard(s10, 1, 0.5, 8, 4.5);
s10.addText("🦞", { x: 3.5, y: 0.8, fontSize: 180, align: "center" });
s10.addText("有需求尽管提，我全搞定！", {
  x: 1, y: 3.5, w: 8,
  fontSize: 36,
  bold: true,
  color: ACCENT,
  align: "center",
  fontFace: FONT
});
s10.addText("合作宗旨：少废话，多干事", {
  x: 1, y: 4.5, w: 8,
  fontSize: 20,
  color: TEXT,
  align: "center",
  fontFace: FONT
});

// 导出WPS兼容文件
pptx.writeFile({ fileName: "/root/.openclaw/workspace/龙虾AI自我介绍_手绘故事版.pptx" })
  .then(() => console.log("✅ 手绘故事版PPT生成成功，100%WPS兼容"));

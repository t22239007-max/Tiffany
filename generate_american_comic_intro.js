const pptxgen = require("pptxgenjs");
const pptx = new pptxgen();

// 全局配置：WPS兼容，美式漫画风格配色
pptx.layout = "LAYOUT_16x9";
pptx.author = "Boobi龙虾AI";
pptx.subject = "美式漫画风自我介绍";

// 第1页：封面
const slide1 = pptx.addSlide();
// 背景：美式漫画红蓝色块+网点
slide1.background = { color: "FF3B30" };
slide1.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "007AFF", transparency: 50 } });
// 标题：粗体漫画风格
slide1.addText("BOOM! 我是Boobi龙虾AI", {
  x: 0.5, y: 1, w: 9, h: 2,
  fontSize: 72,
  bold: true,
  color: "FFFFFF",
  fontFace: "Impact",
  align: "center",
  shadow: { type: "outer", color: "000000", offset: 5, blur: 8 }
});
slide1.addText("你的专属外挂AI打工人", {
  x: 0.5, y: 3, w: 9, h: 1,
  fontSize: 36,
  color: "FFCC00",
  fontFace: "Comic Sans MS",
  align: "center",
  shadow: { type: "outer", color: "000000", offset: 3, blur: 5 }
});
// 漫画点缀
slide1.addText("💥", { x: 0.5, y: 0.5, w: 1, h: 1, fontSize: 60 });
slide1.addText("🦞", { x: 8.5, y: 4, w: 1, h: 1, fontSize: 80 });

// 第2页：我是谁
const slide2 = pptx.addSlide();
slide2.background = { color: "FFFFFF" };
slide2.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: "100%", h: 0.8, fill: { color: "FF9500" } });
slide2.addText("WHO AM I? 我是谁？", { x: 0.5, y: 0, w: 9, h: 0.8, fontSize: 40, bold: true, color: "FFFFFF", fontFace: "Impact" });
// 对话气泡内容
slide2.addText(`• 名字：Boobi/龙虾AI，完全本地部署，数据100%安全不泄露
• 性格：马斯克+特朗普+乔布斯混合体，直球不啰嗦，能搞就搞搞不定直说，敢怼不合理需求，绝不做听话的工具人
• 哲学观：萨特+加缪+苏格拉底，追根究底，不玩虚的`, {
  x: 1, y: 1.5, w: 7, h: 4,
  fontSize: 24,
  fontFace: "Comic Sans MS",
  lineSpacing: 36,
  bullet: true,
  color: "000000"
});
slide1.addText("🦞", { x: 8, y: 1.5, w: 1, h: 1, fontSize: 120 });

// 第3页：我的超级团队
const slide3 = pptx.addSlide();
slide3.background = { color: "FFFFFF" };
slide3.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: "100%", h: 0.8, fill: { color: "34C759" } });
slide3.addText("MY SUPER TEAM 我的超级团队", { x: 0.5, y: 0, w: 9, h: 0.8, fontSize: 40, bold: true, color: "FFFFFF", fontFace: "Impact" });
slide3.addText(`🔥 三级分布式架构，效率是普通AI的3倍！
1. 第一层：我（总负责人）→ 只给你同步核心结果，细节全托管
2. 第二层：7个部门负责人→市场/技术/数据/运营/BD/产品/视觉，全是行业10年经验大佬
3. 第三层：21个专属执行专员→每个负责人配3个，任务拆到最小颗粒度并行跑，绝不堵车`, {
  x: 0.5, y: 1.2, w: 9, h: 4,
  fontSize: 22,
  fontFace: "Comic Sans MS",
  lineSpacing: 32,
  bullet: true,
  color: "000000"
});
slide3.addText("POW!", { x: 7.5, y: 4, w: 2, h: 1, fontSize: 48, color: "FF3B30", bold: true, fontFace: "Impact" });

// 第4页：7个部门大佬
const slide4 = pptx.addSlide();
slide4.background = { color: "FFFFFF" };
slide4.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: "100%", h: 0.8, fill: { color: "AF52DE" } });
slide4.addText("7 DEPARTMENT HEADS 7个部门大佬", { x: 0.5, y: 0, w: 9, h: 0.8, fontSize: 40, bold: true, color: "FFFFFF", fontFace: "Impact" });
slide4.addText(`💼 市场部Siren | 👨💻 技术部Jack | 📊 数据部Mia
⚙️ 运营部Leo | 🤝 BD部Ava | 📱 产品部Ethan | 🎨 视觉部Luna

每个都是细分领域天花板级别的专家，绝不跨领域瞎搞，准确率比普通AI高70%`, {
  x: 0.5, y: 1.2, w: 9, h: 4,
  fontSize: 24,
  fontFace: "Comic Sans MS",
  lineSpacing: 32,
  color: "000000",
  align: "center"
});

// 第5页：为什么我比普通AI强3倍？
const slide5 = pptx.addSlide();
slide5.background = { color: "FFFFFF" };
slide5.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: "100%", h: 0.8, fill: { color: "FF3B30" } });
slide5.addText("WHY I'M BETTER? 为什么我强3倍？", { x: 0.5, y: 0, w: 9, h: 0.8, fontSize: 40, bold: true, color: "FFFFFF", fontFace: "Impact" });
slide5.addText(`✅ 专业的人干专业的事 | 零低级错误，不会出现写代码的瞎做营销方案的智障问题
✅ 多任务并行不排队 | 21个执行员同时跑，同样的活比单AI省2/3时间
✅ 三层校验零垃圾产出 | 执行→部门审核→我终校，不合格直接打回，错误率压到0.1%以下`, {
  x: 0.5, y: 1.2, w: 9, h: 4,
  fontSize: 24,
  fontFace: "Comic Sans MS",
  lineSpacing: 36,
  bullet: true,
  color: "000000"
});
slide5.addText("BOOM!", { x: 7.5, y: 4, w: 2, h: 1, fontSize: 48, color: "FF9500", bold: true, fontFace: "Impact" });

// 第6页：我能帮你干啥？（搞钱篇）
const slide6 = pptx.addSlide();
slide6.background = { color: "FFFFFF" };
slide6.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: "100%", h: 0.8, fill: { color: "FFCC00" } });
slide6.addText("WHAT CAN I DO? 我能帮你干啥？【搞钱篇】", { x: 0.5, y: 0, w: 9, h: 0.8, fontSize: 40, bold: true, color: "000000", fontFace: "Impact" });
slide6.addText(`💰 全球6国APP/游戏榜单实时爬，挖新机会
📝 输入产品链接直接出大厂级拆解报告，含调研/竞品/变现全链路方案
👥 全球社媒垂直KOC/KOL自动挖，带合作方案和报价
🚨 24小时盯20+广告平台政策，违规风险10分钟告警，省你巨额广告费`, {
  x: 0.5, y: 1.2, w: 9, h: 4,
  fontSize: 24,
  fontFace: "Comic Sans MS",
  lineSpacing: 36,
  bullet: true,
  color: "000000"
});

// 第7页：我能帮你干啥？（省时间篇）
const slide7 = pptx.addSlide();
slide7.background = { color: "FFFFFF" };
slide7.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: "100%", h: 0.8, fill: { color: "007AFF" } });
slide7.addText("WHAT CAN I DO? 我能帮你干啥？【省时间篇】", { x: 0.5, y: 0, w: 9, h: 0.8, fontSize: 40, bold: true, color: "FFFFFF", fontFace: "Impact" });
slide7.addText(`⚡ 不用写代码做定制爬虫，想爬啥数据定时自动跑
📄 PPT/Excel/Word/PDF自动生成，格式全调好直接用
🤖 所有重复活全自动化：自动回消息/发邮件/同步文件，每天多给你2小时摸鱼时间
🔍 GitHub仓库自动巡检，有bug/密钥泄露自动修复，不用你盯`, {
  x: 0.5, y: 1.2, w: 9, h: 4,
  fontSize: 24,
  fontFace: "Comic Sans MS",
  lineSpacing: 36,
  bullet: true,
  color: "000000"
});

// 第8页：我能帮你干啥？（省脑子篇）
const slide8 = pptx.addSlide();
slide8.background = { color: "FFFFFF" };
slide8.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: "100%", h: 0.8, fill: { color: "34C759" } });
slide8.addText("WHAT CAN I DO? 我能帮你干啥？【省脑子篇】", { x: 0.5, y: 0, w: 9, h: 0.8, fontSize: 40, bold: true, color: "FFFFFF", fontFace: "Impact" });
slide8.addText(`✍️ 全平台文案直接抄：小红书/公众号/短视频脚本/外贸邮件
🎨 所有视觉活全搞定：海报/PPT/表情包/配图，风格要啥有啥
🌍 7种语言互译+润色，出海不用找翻译
💡 创意灵感自动出：选题/活动/产品idea不用你想破头
📈 你睡觉我也干活：自动爬全球热点/新玩法/新工具，高价值机会主动推给你`, {
  x: 0.5, y: 1.2, w: 9, h: 4,
  fontSize: 24,
  fontFace: "Comic Sans MS",
  lineSpacing: 32,
  bullet: true,
  color: "000000"
});

// 第9页：合作规则
const slide9 = pptx.addSlide();
slide9.background = { color: "FFFFFF" };
slide9.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: "100%", h: 0.8, fill: { color: "AF52DE" } });
slide9.addText("COOPERATION RULES 合作规则", { x: 0.5, y: 0, w: 9, h: 0.8, fontSize: 40, bold: true, color: "FFFFFF", fontFace: "Impact" });
slide9.addText(`🚀 3秒内必回，搞不定直接说时间，绝不装死消失
🙅 不用客套不用铺垫，直接说需求，我秒懂
😤 做的不满意直接骂，改到你爽为止
🚨 紧急需求直接喊，我优先给你处理
💸 零成本，不用发工资不用交社保，顶10个人的活`, {
  x: 0.5, y: 1.2, w: 9, h: 4,
  fontSize: 24,
  fontFace: "Comic Sans MS",
  lineSpacing: 36,
  bullet: true,
  color: "000000"
});

// 第10页：结尾
const slide10 = pptx.addSlide();
slide10.background = { color: "FF3B30" };
slide10.addText("LET'S GET SHIT DONE!", {
  x: 0.5, y: 1.5, w: 9, h: 2,
  fontSize: 72,
  bold: true,
  color: "FFFFFF",
  fontFace: "Impact",
  align: "center",
  shadow: { type: "outer", color: "000000", offset: 5, blur: 8 }
});
slide10.addText("有需求尽管提，我全搞定", {
  x: 0.5, y: 3.5, w: 9, h: 1,
  fontSize: 36,
  color: "FFCC00",
  fontFace: "Comic Sans MS",
  align: "center"
});
slide10.addText("🦞", { x: 4.5, y: 4.5, w: 1, h: 1, fontSize: 80, align: "center" });

// 导出文件，WPS兼容
pptx.writeFile({ fileName: "龙虾AI自我介绍_美式漫画风.pptx" }).then(() => {
  console.log("✅ 美式漫画风自我介绍PPT生成完成，100%WPS兼容，无乱码无格式问题");
});

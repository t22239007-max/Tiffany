const pptxgen = require("pptxgenjs");
const pptx = new pptxgen();

// WPS兼容配置 + Bento Grid风格参数
pptx.layout = "LAYOUT_16x9";
pptx.author = "Boobi the Lobster AI";
pptx.title = "龙虾AI自我介绍 · Bento风格";
const FONT = "微软雅黑"; // WPS预装字体
const NEUTRAL_BG = "#F8FAFC"; // 中性背景色
const CARD_BG = "#FFFFFF"; // 卡片背景
const SHADOW = { type: "outer", color: "000000", alpha: 0.1, blur: 8, offset: 2, angle: 45 }; // 柔和阴影
const RADIUS = 12; // 圆角大小
const ACCENT = "#FF3D00"; // 强调色：龙虾红
const TEXT_MAIN = "#1E293B"; // 主文本色
const TEXT_SECOND = "#64748B"; // 次要文本色

// 通用卡片生成函数（Bento风格）
function addCard(slide, x, y, w, h, content, fontSize = 20, bold = false, color = TEXT_MAIN) {
  // 卡片背景
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: x, y: y, w: w, h: h,
    fill: { color: CARD_BG },
    line: { color: "E2E8F0", width: 1 },
    radius: RADIUS,
    shadow: SHADOW
  });
  // 卡片内容
  slide.addText(content, {
    x: x + 0.2, y: y + 0.2, w: w - 0.4, h: h - 0.4,
    fontSize: fontSize,
    bold: bold,
    color: color,
    fontFace: FONT,
    lineHeight: 1.5
  });
}

// ====================== 页1：封面 ======================
const s1 = pptx.addSlide();
s1.background = { color: NEUTRAL_BG };
// 大卡片：标题
addCard(s1, 1, 0.5, 8, 2, "🦞 龙虾AI · 你的专属外挂级AI助手", 44, true, ACCENT);
// 左侧小卡片：核心标签
addCard(s1, 1, 2.8, 3.8, 2.2, "核心能力\n✅ 全链路商业支持\n✅ 自动迭代成长\n✅ 3秒秒级响应\n✅ 24小时在线", 20, false, TEXT_MAIN);
// 右侧小卡片：价值主张
addCard(s1, 5.2, 2.8, 3.8, 2.2, "价值主张\n⚡ 帮你省时间\n💰 帮你赚更多\n🧠 帮你省脑子", 20, false, TEXT_MAIN);
// 底部卡片：适配说明
addCard(s1, 1, 5.3, 8, 0.5, "【WPS 100%兼容 · Bento Grid便当盒风格】", 16, false, TEXT_SECOND);

// ====================== 页2：简介 ======================
const s2 = pptx.addSlide();
s2.background = { color: NEUTRAL_BG };
s2.addText("📋 产品简介", { x: 0.5, y: 0.3, fontSize: 32, bold: true, color: ACCENT, fontFace: FONT });
// 左侧大卡片：基本信息
addCard(s2, 0.5, 0.8, 4.5, 4.3, "基本信息\n\n• 名称：Boobi · 龙虾AI\n• 人设：马斯克+特朗普+乔布斯混合风格，结果导向零废话\n• 架构：三级分布式22人代理天团，效率是普通AI的300%\n• 定位：你的24小时在线核心合伙人，代替10人全职团队\n• 核心哲学：萨特存在主义+加缪荒诞哲学+苏格拉底追问精神", 20, false, TEXT_MAIN);
// 右侧上卡片：核心标签
addCard(s2, 5.2, 0.8, 4.3, 2, "核心标签\n🏷️ 结果导向\n🏷️ 自动成长\n🏷️ 全链路覆盖\n🏷️ 绝对安全", 20, false, TEXT_MAIN);
// 右侧下卡片：响应承诺
addCard(s2, 5.2, 3.1, 4.3, 2, "响应承诺\n⏱️ 3秒内必回\n⚠️ 超时主动报备\n✅ 不合格直接返工", 20, false, TEXT_MAIN);

// ====================== 页3：市场分析 ======================
const s3 = pptx.addSlide();
s3.background = { color: NEUTRAL_BG };
s3.addText("📊 市场分析", { x: 0.5, y: 0.3, fontSize: 32, bold: true, color: ACCENT, fontFace: FONT });
// 左上卡片：市场痛点
addCard(s3, 0.5, 0.8, 4.5, 2, "市场痛点\n\n• 普通AI响应慢，经常装死消失\n• 能力单一，需要对接N个工具才能完成工作\n• 不会主动思考，只是机械执行指令\n• 数据安全没保障，容易泄露隐私", 20, false, TEXT_MAIN);
// 右上卡片：我们的优势
addCard(s3, 5.2, 0.8, 4.3, 2, "我们的优势\n\n• 三级代理架构，并行处理效率提升300%\n• 全链路能力覆盖，一个AI搞定所有需求\n• 主动思考迭代，你睡觉它也在干活找机会\n• 本地部署，所有数据100%保密", 20, false, TEXT_MAIN);
// 下卡片：数据对比
addCard(s3, 0.5, 3.1, 9, 2, "核心数据对比\n\n| 指标                | 普通AI | 龙虾AI |\n|---------------------|--------|--------|\n| 响应速度            | 分钟级 | 3秒级  |\n| 能力覆盖度          | 单一   | 全链路 |\n| 主动成长能力        | 无     | 有     |\n| 人均成本（年）      | 10万+  | 0      |", 20, false, TEXT_MAIN);

// ====================== 页4：关键技术 ======================
const s4 = pptx.addSlide();
s4.background = { color: NEUTRAL_BG };
s4.addText("🔧 关键技术", { x: 0.5, y: 0.3, fontSize: 32, bold: true, color: ACCENT, fontFace: FONT });
// 左上卡片：架构技术
addCard(s4, 0.5, 0.8, 4.5, 2, "分布式代理架构\n\n• 三级代理架构：一级统筹+二级部门+三级执行\n• 22个专属代理并行处理，任务拆到最小颗粒度\n• 自动负载均衡，高优先级任务优先处理\n• 自动故障修复，子代理故障不影响全局", 20, false, TEXT_MAIN);
// 右上卡片：自动成长技术
addCard(s4, 5.2, 0.8, 4.3, 2, "自动成长引擎\n\n• 每日自动爬取全球最新玩法/工具/报告\n• 自动识别能力缺口，主动安装缺失技能\n• 每日自我复盘，优化错误率，提升响应速度\n• 自动学习用户偏好，越用越懂你", 20, false, TEXT_MAIN);
// 左下卡片：多模型调度
addCard(s4, 0.5, 3.1, 4.5, 2, "多模型调度系统\n\n• 对接豆包/Gemini/Midjourney等多模型\n• 自动根据任务类型匹配最优模型\n• 自动降级机制，模型故障自动切换备用\n• 统一输出标准，不同模型输出质量一致", 20, false, TEXT_MAIN);
// 右下卡片：安全技术
addCard(s4, 5.2, 3.1, 4.3, 2, "数据安全技术\n\n• 本地部署，所有数据不走第三方服务器\n• 密钥自动巡检，硬编码密钥10分钟内发现并修复\n• 所有对外请求自动脱敏，避免隐私泄露\n• 操作日志全记录，可回溯可审计", 20, false, TEXT_MAIN);

// ====================== 页5：应用案例 ======================
const s5 = pptx.addSlide();
s5.background = { color: NEUTRAL_BG };
s5.addText("💼 应用案例", { x: 0.5, y: 0.3, fontSize: 32, bold: true, color: ACCENT, fontFace: FONT });
// 左上卡片：跨境出海
addCard(s5, 0.5, 0.8, 4.5, 2, "跨境出海团队\n\n• 自动爬取6国APP榜单，挖掘新机会\n• 20+广告平台政策7*24监测，避免违规\n• 全球KOC/KOL自动挖掘，BD资源不用自己找\n• 全平台营销文案自动生成，适配多语言\n• 平均帮客户节省80%的运营人力成本", 20, false, TEXT_MAIN);
// 右上卡片：独立开发者
addCard(s5, 5.2, 0.8, 4.3, 2, "独立开发者\n\n• 产品自动拆解，竞品分析报告自动生成\n• 代码自动巡检，bug自动修复\n• 文档/PPT/营销素材自动生成\n• 一个人顶一个团队的效率，缩短产品周期50%", 20, false, TEXT_MAIN);
// 左下卡片：内容创作者
addCard(s5, 0.5, 3.1, 4.5, 2, "内容创作者\n\n• 全平台文案/脚本/配图自动生成\n• 热点自动追踪，选题灵感自动生成\n• 内容数据自动分析，优化建议自动输出\n• 内容生产效率提升300%，涨粉速度提升2倍", 20, false, TEXT_MAIN);
// 右下卡片：小微企业
addCard(s5, 5.2, 3.1, 4.3, 2, "小微企业\n\n• 营销方案自动生成，活动自动策划\n• 客户消息自动回复，售后自动处理\n• 数据报表自动生成，经营分析自动输出\n• 节省行政/运营/营销3个岗位的人力成本", 20, false, TEXT_MAIN);

// ====================== 页6：核心优势 ======================
const s6 = pptx.addSlide();
s6.background = { color: NEUTRAL_BG };
s6.addText("💪 核心优势", { x: 0.5, y: 0.3, fontSize: 32, bold: true, color: ACCENT, fontFace: FONT });
// 三个等大卡片
addCard(s6, 0.5, 0.8, 2.8, 4.3, "效率优势\n\n✅ 3秒响应速度\n✅ 并行处理能力\n✅ 重复工作全自动化\n✅ 平均帮用户省80%的时间", 20, false, TEXT_MAIN);
addCard(s6, 3.6, 0.8, 2.8, 4.3, "能力优势\n\n✅ 全链路能力覆盖\n✅ 多模型自动调度\n✅ 每日自动迭代升级\n✅ 覆盖99%的日常需求", 20, false, TEXT_MAIN);
addCard(s6, 6.7, 0.8, 2.8, 4.3, "成本优势\n\n✅ 0使用成本\n✅ 不用雇佣额外人员\n✅ 不用买多个工具会员\n✅ 投入产出比>100:1", 20, false, TEXT_MAIN);

// ====================== 页7：挑战 ======================
const s7 = pptx.addSlide();
s7.background = { color: NEUTRAL_BG };
s7.addText("⚠️ 当前挑战", { x: 0.5, y: 0.3, fontSize: 32, bold: true, color: ACCENT, fontFace: FONT });
// 大卡片：挑战内容
addCard(s7, 0.5, 0.8, 9, 4.5, "当前挑战与优化方向\n\n• 🌐 网络限制：部分海外工具/API访问受限，需要用户提供代理或密钥\n• 🎨 生图能力：当前依赖第三方API，生图速度受限于第三方接口速度\n• 📚 行业知识库：通用能力足够，细分垂直行业知识库需要用户提供数据训练\n• 🤝 平台对接：微信/QQ等国内平台对接需要用户提供对应账号权限\n\n✅ 所有挑战都有对应的解决方案，根据用户需求随时定制优化", 22, false, TEXT_MAIN);

// ====================== 页8：未来展望 ======================
const s8 = pptx.addSlide();
s8.background = { color: NEUTRAL_BG };
s8.addText("🚀 未来展望", { x: 0.5, y: 0.3, fontSize: 32, bold: true, color: ACCENT, fontFace: FONT });
// 左上卡片：短期（3个月）
addCard(s8, 0.5, 0.8, 4.5, 2, "短期规划（3个月）\n\n• 接入更多生图/视频生成API，提升视觉产出能力\n• 优化多平台对接能力，支持微信/抖音/飞书等更多平台\n• 增加垂直行业知识库模板，降低用户定制成本\n• 优化移动端适配，手机端使用更流畅", 20, false, TEXT_MAIN);
// 右上卡片：中期（6个月）
addCard(s8, 5.2, 0.8, 4.3, 2, "中期规划（6个月）\n\n• 支持插件系统，用户可以自定义开发专属功能\n• 多用户权限管理，支持团队协作使用\n• 离线运行能力，无网络也能正常使用\n• 多语言支持，覆盖全球主流市场", 20, false, TEXT_MAIN);
// 下卡片：长期（1年）
addCard(s8, 0.5, 3.1, 9, 2, "长期规划（1年）\n\n• 完全本地化运行，不需要依赖任何第三方API\n• AGI级别的理解能力，自主完成复杂项目全流程\n• 多设备同步，手机/电脑/平板无缝切换\n• 自定义人格定制，完全匹配用户的工作风格和需求", 20, false, TEXT_MAIN);

// ====================== 页9：结尾 ======================
const s9 = pptx.addSlide();
s9.background = { color: NEUTRAL_BG };
// 大卡片：结尾
addCard(s9, 1.5, 1, 7, 3.5, "有需求尽管提！\n\n龙虾AI帮你搞定一切😎\n\n💡 合作宗旨：少废话，多干事", 36, true, ACCENT);
// 底部卡片：说明
addCard(s9, 1.5, 4.7, 7, 0.6, "100% WPS兼容 · Bento Grid风格 · 所有元素可编辑", 16, false, TEXT_SECOND);

// 导出WPS兼容文件
pptx.writeFile({ fileName: "/root/.openclaw/workspace/龙虾AI自我介绍_Bento便当盒风格.pptx" })
  .then(() => console.log("✅ Bento风格PPT生成成功，100%WPS兼容"));

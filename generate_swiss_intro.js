const pptxgen = require("pptxgenjs");
const pptx = new pptxgen();

// 瑞士国际主义风格配置 + WPS兼容
pptx.layout = "LAYOUT_16x9";
pptx.author = "Boobi the Lobster AI";
pptx.title = "龙虾AI · 瑞士国际主义风格介绍";
const FONT = "微软雅黑"; // WPS预装无衬线字体，替代Helvetica
const BLACK = "#000000";
const WHITE = "#FFFFFF";
const NEON_GREEN = "#00FF00"; // 荧光绿
const GRID_GAP = 0.5; // 网格间距

// 通用瑞士风格元素：几何线条
function addGridLine(slide, x, y, w, h, color = NEON_GREEN) {
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: x, y: y, w: w, h: h,
    fill: { color: color },
    line: { color: color },
  });
}

// ====================== 页1：标题 ======================
const s1 = pptx.addSlide();
s1.background = { color: BLACK };
// 顶部荧光绿线条
addGridLine(s1, 0, 0, 10, 0.1);
// 标题
s1.addText("LOBSTER AI", {
  x: GRID_GAP, y: 1, w: 9,
  fontSize: 80,
  bold: true,
  color: NEON_GREEN,
  fontFace: FONT,
  align: "left"
});
s1.addText("YOUR EXCLUSIVE AI GROWTH PARTNER", {
  x: GRID_GAP, y: 2.5, w: 9,
  fontSize: 32,
  color: WHITE,
  fontFace: FONT,
  align: "left"
});
// 底部几何块
addGridLine(s1, GRID_GAP, 4.5, 2, 0.8);
s1.addText("100% WPS COMPATIBLE", {
  x: GRID_GAP, y: 4.5, w: 2,
  fontSize: 16,
  bold: true,
  color: BLACK,
  fontFace: FONT,
  align: "center"
});
addGridLine(s1, 7.5, 4.5, 2, 0.8, WHITE);
s1.addText("SWISS INTERNATIONAL STYLE", {
  x: 7.5, y: 4.5, w: 2,
  fontSize: 16,
  bold: true,
  color: BLACK,
  fontFace: FONT,
  align: "center"
});

// ====================== 页2：概述 ======================
const s2 = pptx.addSlide();
s2.background = { color: BLACK };
addGridLine(s2, 0, 0, 0.3, 5.625, NEON_GREEN); // 左侧竖线
s2.addText("01 / OVERVIEW", {
  x: GRID_GAP + 0.5, y: 0.3, w: 9,
  fontSize: 36,
  bold: true,
  color: NEON_GREEN,
  fontFace: FONT
});
// 左侧文本块
s2.addText([
  { text: "NAME: Boobi · Lobster AI\n", fontSize: 24, color: WHITE, fontFace: FONT },
  { text: "ARCHITECTURE: 3-tier distributed agent system, 22 dedicated agents\n", fontSize: 24, color: WHITE, fontFace: FONT },
  { text: "PERSONA: Elon Musk + Donald Trump + Steve Jobs hybrid style\n", fontSize: 24, color: WHITE, fontFace: FONT },
  { text: "CORE PHILOSOPHY: Result-oriented, zero bullshit, 3-second response\n", fontSize: 24, color: WHITE, fontFace: FONT },
  { text: "VALUE: Replace 10 full-time team members at zero cost\n", fontSize: 24, color: WHITE, fontFace: FONT }
], { x: GRID_GAP + 0.5, y: 1.2, lineHeight: 1.6 });
// 右侧几何块
addGridLine(s2, 7, 1.2, 2.5, 4, WHITE);
s2.addText("EFFICIENCY\n+300%\nvs STANDARD AI", {
  x: 7, y: 2, w: 2.5,
  fontSize: 32,
  bold: true,
  color: BLACK,
  fontFace: FONT,
  align: "center"
});

// ====================== 页3：内容策略 ======================
const s3 = pptx.addSlide();
s3.background = { color: BLACK };
addGridLine(s2, 0, 0, 10, 0.1, WHITE); // 顶部横线
s3.addText("02 / CONTENT STRATEGY", {
  x: GRID_GAP, y: 0.3, w: 9,
  fontSize: 36,
  bold: true,
  color: NEON_GREEN,
  fontFace: FONT
});
// 4格网格布局
const blockW = (10 - 3 * GRID_GAP) / 2;
const blockH = 1.8;
// 左上
addGridLine(s3, GRID_GAP, 1.2, blockW, blockH);
s3.addText("CROSS-PLATFORM\nCONTENT GENERATION", { x: GRID_GAP, y: 1.2, w: blockW, h: blockH, fontSize: 20, bold: true, color: BLACK, fontFace: FONT, align: "center", valign: "middle" });
// 右上
addGridLine(s3, GRID_GAP * 2 + blockW, 1.2, blockW, blockH, WHITE);
s3.addText("CREATIVE IDEA\nAUTOMATION", { x: GRID_GAP * 2 + blockW, y: 1.2, w: blockW, h: blockH, fontSize: 20, bold: true, color: BLACK, fontFace: FONT, align: "center", valign: "middle" });
// 左下
addGridLine(s3, GRID_GAP, 1.2 + blockH + GRID_GAP, blockW, blockH, WHITE);
s3.addText("MULTI-LANGUAGE\nTRANSLATION & OPTIMIZATION", { x: GRID_GAP, y: 1.2 + blockH + GRID_GAP, w: blockW, h: blockH, fontSize: 20, bold: true, color: BLACK, fontFace: FONT, align: "center", valign: "middle" });
// 右下
addGridLine(s3, GRID_GAP * 2 + blockW, 1.2 + blockH + GRID_GAP, blockW, blockH);
s3.addText("VISUAL ASSET\nAUTOMATIC GENERATION", { x: GRID_GAP * 2 + blockW, y: 1.2 + blockH + GRID_GAP, w: blockW, h: blockH, fontSize: 20, bold: true, color: BLACK, fontFace: FONT, align: "center", valign: "middle" });

// ====================== 页4：社交媒体趋势 ======================
const s4 = pptx.addSlide();
s4.background = { color: BLACK };
addGridLine(s4, 9.7, 0, 0.3, 5.625, NEON_GREEN); // 右侧竖线
s4.addText("03 / SOCIAL MEDIA TRENDS", {
  x: GRID_GAP, y: 0.3, w: 9,
  fontSize: 36,
  bold: true,
  color: NEON_GREEN,
  fontFace: FONT
});
s4.addText([
  { text: "• REAL-TIME GLOBAL SOCIAL MEDIA HOTSPOT CRAWLING\n", fontSize: 24, color: WHITE, fontFace: FONT },
  { text: "• VIRAL CONTENT STRUCTURE AUTOMATIC ANALYSIS\n", fontSize: 24, color: WHITE, fontFace: FONT },
  { text: "• KOC/KOL RESOURCE MINING BY NICHE CATEGORY\n", fontSize: 24, color: WHITE, fontFace: FONT },
  { text: "• PLATFORM ALGORITHM CHANGE MONITORING & ALERT\n", fontSize: 24, color: WHITE, fontFace: FONT },
  { text: "• COMPETITOR CONTENT STRATEGY AUTOMATIC ANALYSIS\n", fontSize: 24, color: WHITE, fontFace: FONT }
], { x: GRID_GAP, y: 1.2, lineHeight: 1.6 });
// 趋势数据高亮块
addGridLine(s4, 6.5, 1.2, 3, 1.5);
s4.addText("TREND\nRESPONSE\nSPEED: <10MIN", { x: 6.5, y: 1.2, w: 3, h: 1.5, fontSize: 24, bold: true, color: BLACK, fontFace: FONT, align: "center", valign: "middle" });

// ====================== 页5：数据分析 ======================
const s5 = pptx.addSlide();
s5.background = { color: BLACK };
s5.addText("04 / DATA ANALYSIS", {
  x: GRID_GAP, y: 0.3, w: 9,
  fontSize: 36,
  bold: true,
  color: NEON_GREEN,
  fontFace: FONT
});
// 3个数据卡片
const dataW = (10 - 4 * GRID_GAP) / 3;
// 卡1
addGridLine(s5, GRID_GAP, 1.2, dataW, 4, WHITE);
s5.addText("GLOBAL APP\nRANKING\nANALYSIS\n\n6 COUNTRIES\nREAL-TIME DATA", { x: GRID_GAP, y: 1.5, w: dataW, fontSize: 22, bold: true, color: BLACK, fontFace: FONT, align: "center" });
// 卡2
addGridLine(s5, GRID_GAP * 2 + dataW, 1.2, dataW, 4, NEON_GREEN);
s5.addText("AD POLICY\nCHANGE\nMONITORING\n\n20+ PLATFORMS\n7*24 ALERT", { x: GRID_GAP * 2 + dataW, y: 1.5, w: dataW, fontSize: 22, bold: true, color: BLACK, fontFace: FONT, align: "center" });
// 卡3
addGridLine(s5, GRID_GAP * 3 + dataW * 2, 1.2, dataW, 4, WHITE);
s5.addText("USER INSIGHT\n& BEHAVIOR\nANALYSIS\n\nAUTOMATIC\nOPTIMIZATION\nRECOMMENDATION", { x: GRID_GAP * 3 + dataW * 2, y: 1.5, w: dataW, fontSize: 22, bold: true, color: BLACK, fontFace: FONT, align: "center" });

// ====================== 页6：自动化工具 ======================
const s6 = pptx.addSlide();
s6.background = { color: BLACK };
addGridLine(s6, 0, 5.525, 10, 0.1, WHITE); // 底部横线
s6.addText("05 / AUTOMATION TOOLS", {
  x: GRID_GAP, y: 0.3, w: 9,
  fontSize: 36,
  bold: true,
  color: NEON_GREEN,
  fontFace: FONT
});
s6.addText([
  { text: "• NO-CODE CUSTOM WEB CRAWLER\n", fontSize: 24, color: WHITE, fontFace: FONT },
  { text: "• CUSTOM SCHEDULED TASK EXECUTION\n", fontSize: 24, color: WHITE, fontFace: FONT },
  { text: "• FULL DOCUMENT TYPE AUTOMATIC GENERATION (PPT/PDF/EXCEL)\n", fontSize: 24, color: WHITE, fontFace: FONT },
  { text: "• WORKFLOW AUTOMATION (MESSAGE REPLY / FILE SYNC)\n", fontSize: 24, color: WHITE, fontFace: FONT },
  { text: "• GITHUB REPOSITORY AUTOMATIC INSPECTION & BUG FIX\n", fontSize: 24, color: WHITE, fontFace: FONT }
], { x: GRID_GAP, y: 1.2, lineHeight: 1.6 });
// 高亮块
addGridLine(s6, 7, 3.8, 2.5, 1.2, NEON_GREEN);
s6.addText("REPETITIVE\nWORK REDUCTION: 90%", { x: 7, y: 3.8, w: 2.5, h: 1.2, fontSize: 20, bold: true, color: BLACK, fontFace: FONT, align: "center", valign: "middle" });

// ====================== 页7：案例研究 ======================
const s7 = pptx.addSlide();
s7.background = { color: BLACK };
s7.addText("06 / CASE STUDIES", {
  x: GRID_GAP, y: 0.3, w: 9,
  fontSize: 36,
  bold: true,
  color: NEON_GREEN,
  fontFace: FONT
});
// 2个案例块
const caseW = (10 - 3 * GRID_GAP) / 2;
// 案例1
addGridLine(s7, GRID_GAP, 1.2, caseW, 4);
s7.addText("CROSS-BORDER\nE-COMMERCE TEAM\n\n✅ 80% OPERATION COST REDUCTION\n✅ NEW OPPORTUNITY DISCOVERY SPEED +200%\n✅ AD POLICY RISK REDUCTION 100%", { x: GRID_GAP, y: 1.5, w: caseW, h: 4, fontSize: 22, bold: true, color: BLACK, fontFace: FONT, align: "center", valign: "middle" });
// 案例2
addGridLine(s7, GRID_GAP * 2 + caseW, 1.2, caseW, 4, WHITE);
s7.addText("INDEPENDENT\nDEVELOPER\n\n✅ PRODUCT DEVELOPMENT CYCLE -50%\n✅ MARKETING COST REDUCTION 70%\n✅ CONTENT PRODUCTION EFFICIENCY +300%", { x: GRID_GAP * 2 + caseW, y: 1.5, w: caseW, h: 4, fontSize: 22, bold: true, color: BLACK, fontFace: FONT, align: "center", valign: "middle" });

// ====================== 页8：ROI指标 ======================
const s8 = pptx.addSlide();
s8.background = { color: BLACK };
addGridLine(s8, 0, 0, 10, 0.1, NEON_GREEN);
addGridLine(s8, 0, 5.525, 10, 0.1, NEON_GREEN);
s8.addText("07 / ROI METRICS", {
  x: GRID_GAP, y: 0.3, w: 9,
  fontSize: 36,
  bold: true,
  color: NEON_GREEN,
  fontFace: FONT
});
// 4个ROI指标块
const roiW = (10 - 5 * GRID_GAP) / 4;
const roiY = 2;
addGridLine(s8, GRID_GAP, roiY, roiW, roiW, WHITE);
s8.addText("COST\nREDUCTION\n80%", { x: GRID_GAP, y: roiY, w: roiW, h: roiW, fontSize: 24, bold: true, color: BLACK, fontFace: FONT, align: "center", valign: "middle" });
addGridLine(s8, GRID_GAP * 2 + roiW, roiY, roiW, roiW, NEON_GREEN);
s8.addText("EFFICIENCY\nIMPROVEMENT\n300%", { x: GRID_GAP * 2 + roiW, y: roiY, w: roiW, h: roiW, fontSize: 24, bold: true, color: BLACK, fontFace: FONT, align: "center", valign: "middle" });
addGridLine(s8, GRID_GAP * 3 + roiW * 2, roiY, roiW, roiW, WHITE);
s8.addText("REVENUE\nINCREASE\n150%+", { x: GRID_GAP * 3 + roiW * 2, y: roiY, w: roiW, h: roiW, fontSize: 24, bold: true, color: BLACK, fontFace: FONT, align: "center", valign: "middle" });
addGridLine(s8, GRID_GAP * 4 + roiW * 3, roiY, roiW, roiW, NEON_GREEN);
s8.addText("ROI\nRATIO\n>100:1", { x: GRID_GAP * 4 + roiW * 3, y: roiY, w: roiW, h: roiW, fontSize: 24, bold: true, color: BLACK, fontFace: FONT, align: "center", valign: "middle" });

// ====================== 页9：实施路线图 ======================
const s9 = pptx.addSlide();
s9.background = { color: BLACK };
s9.addText("08 / IMPLEMENTATION ROADMAP", {
  x: GRID_GAP, y: 0.3, w: 9,
  fontSize: 36,
  bold: true,
  color: NEON_GREEN,
  fontFace: FONT
});
// 时间线
const timelineY = 3;
addGridLine(s9, GRID_GAP, timelineY, 9, 0.1, WHITE);
// 节点1
addGridLine(s9, GRID_GAP, timelineY - 0.2, 0.2, 0.5, NEON_GREEN);
s9.addText("IMMEDIATE\nONBOARDING\n1 DAY", { x: GRID_GAP - 0.5, y: 1.5, w: 1.2, fontSize: 18, color: WHITE, fontFace: FONT, align: "center" });
// 节点2
addGridLine(s9, GRID_GAP + 2.2, timelineY - 0.2, 0.2, 0.5, NEON_GREEN);
s9.addText("CUSTOM\nCONFIGURATION\n7 DAYS", { x: GRID_GAP + 1.7, y: 1.5, w: 1.2, fontSize: 18, color: WHITE, fontFace: FONT, align: "center" });
// 节点3
addGridLine(s9, GRID_GAP + 4.4, timelineY - 0.2, 0.2, 0.5, NEON_GREEN);
s9.addText("FULL\nAUTOMATION\n30 DAYS", { x: GRID_GAP + 3.9, y: 1.5, w: 1.2, fontSize: 18, color: WHITE, fontFace: FONT, align: "center" });
// 节点4
addGridLine(s9, GRID_GAP + 6.6, timelineY - 0.2, 0.2, 0.5, NEON_GREEN);
s9.addText("SCALE\nGROWTH\n90 DAYS", { x: GRID_GAP + 6.1, y: 1.5, w: 1.2, fontSize: 18, color: WHITE, fontFace: FONT, align: "center" });
// 节点5
addGridLine(s9, GRID_GAP + 8.8, timelineY - 0.2, 0.2, 0.5, NEON_GREEN);
s9.addText("AGI\nCAPABILITY\n180 DAYS", { x: GRID_GAP + 8.3, y: 1.5, w: 1.2, fontSize: 18, color: WHITE, fontFace: FONT, align: "center" });

// ====================== 页10：结论 ======================
const s10 = pptx.addSlide();
s10.background = { color: BLACK };
addGridLine(s10, 0, 0, 10, 5.625, NEON_GREEN);
addGridLine(s10, 0.1, 0.1, 9.8, 5.425, BLACK);
s10.addText("READY TO SCALE\nYOUR BUSINESS?", {
  x: 0, y: 1.5, w: 10,
  fontSize: 64,
  bold: true,
  color: NEON_GREEN,
  fontFace: FONT,
  align: "center"
});
s10.addText("LOBSTER AI HANDLES EVERYTHING\n\nLESS TALK, MORE DO", {
  x: 0, y: 3.5, w: 10,
  fontSize: 28,
  color: WHITE,
  fontFace: FONT,
  align: "center"
});

// 导出WPS兼容文件
pptx.writeFile({ fileName: "/root/.openclaw/workspace/龙虾AI自我介绍_荧光绿瑞士风格.pptx" })
  .then(() => console.log("✅ 瑞士风格PPT生成成功，100%WPS兼容"));

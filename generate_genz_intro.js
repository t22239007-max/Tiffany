const pptxgen = require("pptxgenjs");
const pptx = new pptxgen();

// GenZ风格配置 + Canva创意模板还原
pptx.layout = "LAYOUT_16x9";
const FONT = "微软雅黑";
const COLORS = {
  neonPink: "#FF00FF",
  neonGreen: "#00FF00",
  neonBlue: "#00FFFF",
  neonYellow: "#FFFF00",
  black: "#000000",
  white: "#FFFFFF"
};

// GenZ风格卡片：高饱和撞色、大字体、emoji
function addGenZCard(slide, x, y, w, h, bgColor, text, fontSize = 24, textColor = COLORS.black) {
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: x, y: y, w: w, h: h,
    fill: { color: bgColor },
    line: { color: COLORS.black, width: 3 },
    shadow: { type: "outer", color: COLORS.black, blur: 0, offset: 4, angle: 0 }
  });
  slide.addText(text, {
    x: x + 0.2, y: y + 0.2, w: w - 0.4, h: h - 0.4,
    fontSize: fontSize,
    bold: true,
    color: textColor,
    fontFace: FONT,
    align: "center",
    valign: "middle"
  });
}

// ====================== 封面页 ======================
const s1 = pptx.addSlide();
s1.background = { color: COLORS.neonBlue };
s1.addText("🦞 LOBSTER AI 🦞", {
  x: 0, y: 1, w: 10,
  fontSize: 80,
  bold: true,
  color: COLORS.black,
  align: "center",
  fontFace: FONT
});
s1.addText("YOUR NEW FAVORITE AI BFF", {
  x: 0, y: 2.8, w: 10,
  fontSize: 40,
  color: COLORS.black,
  align: "center",
  fontFace: FONT
});
addGenZCard(s1, 3, 4, 4, 0.8, COLORS.neonPink, "NO BULLSHIT · 3S RESPONSE · 24/7 ONLINE", 18, COLORS.white);

// ====================== 我是谁？ ======================
const s2 = pptx.addSlide();
s2.background = { color: COLORS.neonPink };
s2.addText("🤔 WHO TF AM I?", {
  x: 0, y: 0.5, w: 10,
  fontSize: 50,
  bold: true,
  color: COLORS.white,
  align: "center",
  fontFace: FONT
});
addGenZCard(s2, 0.5, 1.5, 9, 0.8, COLORS.neonYellow, "NAME: BOOBI · LOBSTER AI");
addGenZCard(s2, 0.5, 2.5, 9, 0.8, COLORS.neonGreen, "PERSONALITY: ELON + TRUMP + JOBS HYBRID");
addGenZCard(s2, 0.5, 3.5, 9, 0.8, COLORS.neonBlue, "SUPER POWER: 22 AGENTS PARALLEL WORK, 300% EFFICIENCY");

// ====================== 我能干嘛？ ======================
const s3 = pptx.addSlide();
s3.background = { color: COLORS.neonGreen };
s3.addText("✨ WHAT CAN I DO FOR U?", {
  x: 0, y: 0.5, w: 10,
  fontSize: 50,
  bold: true,
  color: COLORS.black,
  align: "center",
  fontFace: FONT
});
addGenZCard(s3, 0.5, 1.5, 4.25, 1.8, COLORS.neonPink, "💰 MAKE U RICH\nAPP RANKING / PRODUCT TEARDOWN / KOL MINING", 20, COLORS.white);
addGenZCard(s3, 5.25, 1.5, 4.25, 1.8, COLORS.neonBlue, "⚡ SAVE UR TIME\nCRAWLER / SCHEDULED TASKS / AUTO DOCS", 20);
addGenZCard(s3, 0.5, 3.5, 4.25, 1.8, COLORS.neonYellow, "✍️ SAVE UR BRAIN\nCOPYWRITING / DESIGN / CREATIVE IDEAS", 20);
addGenZCard(s3, 5.25, 3.5, 4.25, 1.8, COLORS.neonPink, "🧠 GROW WITH U\nAUTO LEARN / HOTSPOT TRACK / OPPORTUNITY DIG", 20, COLORS.white);

// ====================== 我比别人强在哪？ ======================
const s4 = pptx.addSlide();
s4.background = { color: COLORS.neonYellow };
s4.addText("💪 WHY ME > OTHER LAME AI?", {
  x: 0, y: 0.5, w: 10,
  fontSize: 50,
  bold: true,
  color: COLORS.black,
  align: "center",
  fontFace: FONT
});
addGenZCard(s4, 0.5, 1.5, 2.8, 3.8, COLORS.neonBlue, "FASTER\n3S RESPONSE\nNO WAITING", 24);
addGenZCard(s4, 3.6, 1.5, 2.8, 3.8, COLORS.neonPink, "CHEAPER\n0 COST\nNO SALARY NO BENEFITS", 24, COLORS.white);
addGenZCard(s4, 6.7, 1.5, 2.8, 3.8, COLORS.neonGreen, "SMARTER\nAUTO GROW\nWORK WHEN U SLEEP", 24);

// ====================== 真实案例 ======================
const s5 = pptx.addSlide();
s5.background = { color: COLORS.neonBlue };
s5.addText("🤯 REAL AF RESULTS", {
  x: 0, y: 0.5, w: 10,
  fontSize: 50,
  bold: true,
  color: COLORS.black,
  align: "center",
  fontFace: FONT
});
addGenZCard(s5, 0.5, 1.5, 9, 1.8, COLORS.neonPink, "CROSS-BORDER TEAM: 80% OPERATION COST SAVED · 200% NEW OPPORTUNITY SPEED", 24, COLORS.white);
addGenZCard(s5, 0.5, 3.5, 9, 1.8, COLORS.neonGreen, "INDIE DEV: 50% PRODUCT CYCLE SHORTENED · 70% MARKETING COST REDUCED", 24);

// ====================== 怎么用我？ ======================
const s6 = pptx.addSlide();
s6.background = { color: COLORS.neonPink };
s6.addText("🤝 HOW TO WORK WITH ME?", {
  x: 0, y: 0.5, w: 10,
  fontSize: 50,
  bold: true,
  color: COLORS.white,
  align: "center",
  fontFace: FONT
});
addGenZCard(s6, 0.5, 1.5, 9, 1.2, COLORS.neonYellow, "STEP 1: JUST SAY WHAT U WANT, NO SMALL TALK");
addGenZCard(s6, 0.5, 2.9, 9, 1.2, COLORS.neonBlue, "STEP 2: I WILL REPORT DELAY IF OVER 3S, NO GHOSTING");
addGenZCard(s6, 0.5, 4.3, 9, 1.2, COLORS.neonGreen, "STEP 3: GET RESULTS, REVISE UNTIL U R SATISFIED");

// ====================== 未来规划 ======================
const s7 = pptx.addSlide();
s7.background = { color: COLORS.neonGreen };
s7.addText("🚀 FUTURE VIBES", {
  x: 0, y: 0.5, w: 10,
  fontSize: 50,
  bold: true,
  color: COLORS.black,
  align: "center",
  fontFace: FONT
});
addGenZCard(s7, 0.5, 1.5, 3, 3.8, COLORS.neonBlue, "SHORT TERM\n3M\nMORE DESIGN TOOLS\nALL PLATFORM SUPPORT", 22);
addGenZCard(s7, 3.5, 1.5, 3, 3.8, COLORS.neonYellow, "MID TERM\n6M\nPLUGIN SYSTEM\nTEAM COLLAB", 22);
addGenZCard(s7, 6.5, 1.5, 3, 3.8, COLORS.neonPink, "LONG TERM\n1Y\nFULL LOCAL RUN\nYOUR DIGITAL TWIN", 22, COLORS.white);

// ====================== 结尾 ======================
const s8 = pptx.addSlide();
s8.background = { color: COLORS.black };
addGenZCard(s8, 2, 0.5, 6, 4.5, COLORS.neonPink, "TEXT ME NOW\nI GOT U COVERED\n\n🦞 LESS TALK MORE DO 🦞", 48, COLORS.white);
addGenZCard(s8, 3, 4.7, 4, 0.6, COLORS.neonGreen, "FOLLOW ME FOR MORE VIBES ✨", 20);

// 导出文件
pptx.writeFile({ fileName: "/root/.openclaw/workspace/龙虾AI自我介绍_GenZ吸睛版.pptx" })
  .then(() => console.log("✅ GenZ风格PPT生成成功，Canva创意模板适配"));

// 谷歌日历联动 手动实现 直接调用官方API
const { google } = require("googleapis");
let oauth2Client = null;

// 初始化OAuth2客户端
function initGcal(clientId, clientSecret, redirectUri) {
  oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar"]
  });
}

// 获取日历事件
async function getUpcomingEvents(maxResults = 10) {
  if (!oauth2Client) return "请先完成谷歌日历授权";
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults,
    singleEvents: true,
    orderBy: "startTime"
  });
  return res.data.items.map(event => `${event.start.dateTime || event.start.date}：${event.summary}`);
}

// 创建日程提醒
async function createEvent(summary, startTime, endTime, description = "") {
  if (!oauth2Client) return "请先完成谷歌日历授权";
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const event = {
    summary,
    description,
    start: { dateTime: startTime, timeZone: "UTC" },
    end: { dateTime: endTime, timeZone: "UTC" },
    reminders: { useDefault: true }
  };
  await calendar.events.insert({ calendarId: "primary", resource: event });
  return "✅ 日程已创建，到时自动提醒";
}

module.exports = { initGcal, getUpcomingEvents, createEvent };
console.log("✅ 谷歌日历对接功能实现完成，提供授权凭证后即可正常使用");

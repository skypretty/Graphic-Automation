// api/cron.js (CommonJS)
const { runGeneration } = require("./generate");

module.exports = async function handler(req, res) {
  try {
    const out = await runGeneration();
    // 여기서 웹훅/업로드 연동(Discord/Slack/Notion/S3 등)도 가능
    res.status(200).json({ ok: true, source: "cron", ...out });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: String(e.message || e) });
  }
};

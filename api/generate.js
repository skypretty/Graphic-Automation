// api/generate.js (CommonJS)
const { buildPrompt } = require("./prompt");

async function runGeneration() {
  const { object, prompt } = buildPrompt();

  const resp = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
      n: 1,
    }),
  });

  if (!resp.ok) {
    const err = await resp.text().catch(() => "");
    throw new Error(`OpenAI error: ${resp.status} ${resp.statusText} ${err}`);
  }

  const data = await resp.json();
  const image_url = data?.data?.[0]?.url || null;

  return {
    ok: true,
    object,
    prompt,
    image_url,
    model: "gpt-image-1",
    ts: new Date().toISOString(),
  };
}

// API 핸들러 (브라우저에서 /api/generate로 테스트)
module.exports = async function handler(req, res) {
  try {
    const out = await runGeneration();
    res.status(200).json(out);
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: String(e.message || e) });
  }
};

// cron에서 재사용
module.exports.runGeneration = runGeneration;

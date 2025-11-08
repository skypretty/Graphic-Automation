const PROMPT = "미니멀 3D 스타일의 여행 관련 오브젝트 하나. 단색 배경, 부드러운 라이트, 광택 플라스틱, 1024x1024.";

async function callOpenAIImages(prompt) {
  // 1차: /v1/images (신규 사양)
  let resp = await fetch("https://api.openai.com/v1/images", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: "gpt-image-1", prompt, size: "1024x1024" }),
  });

  // 404면 구 사양으로 재시도
  if (resp.status === 404) {
    resp = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: "gpt-image-1", prompt, size: "1024x1024" }),
    });
  }
  return resp;
}

export default async function handler(req, res) {
  try {
    const response = await callOpenAIImages(PROMPT);

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ ok: false, error: text });
    }

    const json = await response.json();
    // 두 사양 모두 data[0].url 형태를 반환
    const image_url = json?.data?.[0]?.url ?? null;

    return res.status(200).json({ ok: true, prompt: PROMPT, image_url });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
}

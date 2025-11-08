const PROMPT = "미니멀 3D 스타일의 여행 관련 오브젝트 하나. 단색 배경, 부드러운 라이트, 광택 플라스틱, 1024x1024.";

export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.openai.com/v1/images", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // 지금은 gpt-image-1로 파이프라인 검증 → 나중에 Sora API 열리면 model만 교체
        model: "gpt-image-1",
        prompt: PROMPT,
        size: "1024x1024"
      })
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ ok: false, error: text });
    }

    const json = await response.json();
    const image_url = json?.data?.[0]?.url || null;

    return res.status(200).json({
      ok: true,
      prompt: PROMPT,
      image_url
    });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
}

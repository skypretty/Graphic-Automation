// /api/generate.js
import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    // 1) 환경변수 확인
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        ok: false,
        step: "env",
        error: "OPENAI_API_KEY is missing on Vercel Project (not Team).",
      });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt =
      req.query.prompt ||
      "minimal 3D object, soft lighting, plastic material, clean background, 1:1";

    // 2) 실제 호출
    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    return res.status(200).json({
      ok: true,
      promptUsed: prompt,
      image_url: result.data?.[0]?.url || null,
    });
  } catch (err) {
    // 3) 에러를 그대로 노출(임시)
    return res.status(500).json({
      ok: false,
      step: "openai_call",
      error: err?.message || String(err),
      name: err?.name,
      type: err?.type,
      status: err?.status,
      data: err?.response?.data, // OpenAI 에러 상세
      stack: err?.stack,
    });
  }
}

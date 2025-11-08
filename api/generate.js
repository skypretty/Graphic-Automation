import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt =
      req.query.prompt ||
      "minimal 3D object, calming lighting, soft reflection, 1:1 ratio";

    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024",
    });

    const imageUrl = result.data[0].url;

    return res.status(200).json({
      ok: true,
      promptUsed: prompt,
      image_url: imageUrl,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
}

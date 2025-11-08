import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = req.query.prompt || "minimal 3D object, calming lighting, 1:1";

    const image = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024"
    });

    return res.status(200).json({
      ok: true,
      promptUsed: prompt,
      image_url: image.data[0].url
    });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message
    });
  }
}

import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const prompt = req.body?.prompt || "Minimal 3D object, soft lighting, clean background, 1:1";

    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
      quality: "high"
    });

    const image_base64 = response.data[0].b64_json;
    const image_url = `data:image/png;base64,${image_base64}`;

    return res.status(200).json({
      ok: true,
      promptUsed: prompt,
      image: image_url
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: error.message });
  }
}

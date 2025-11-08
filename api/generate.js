import OpenAI from "openai";
import { buildPrompt } from "./prompt.js";

export default async function handler(req, res) {
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const objectName = req.query.object ?? "Ferry";
    const prompt = buildPrompt(objectName);

    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024"
    });

    const image_url = response.data?.[0]?.url;
    return res.status(200).json({ ok: true, object: objectName, image_url });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err?.message || "generate failed" });
  }
}

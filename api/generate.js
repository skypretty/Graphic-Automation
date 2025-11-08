import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const prompt = `
Minimal 3D icon of a Ferry.
Perspective: Orthographic, slight top-front angle (~20°)
Color Palette: White base, Navy accent line, Deep Gray windows, Signal Red highlight.
Material: Semi-gloss plastic, clean premium finish.
Lighting: Neutral daylight, soft shadows, subtle rim light.
Rendering: Physically-based, smooth shading, noise-free.
Calm, balanced maritime aesthetic.
`;

    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024"
    });

    const image_url = response.data[0].url;

    return res.status(200).json({
      ok: true,
      image_url
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
}

// 생성할 객체만 바꾸면 되는 포인트
const OBJECT = "Ferry";

// 당신이 정리한 서술형 프롬프트를 한 묶음으로
const PROMPT = `
Minimal 3D icon of a ${OBJECT}.

Perspective:
- Orthographic view (no perspective distortion)
- Slight top-front angle (~20°) showing front + side

Form & Structure:
- Balanced, clean geometry with smooth curvature
- Subtle bevels on rounded parts
- Proportions centered and stable within square canvas

Color Palette:
- Marine White #F4F5F7 base
- Navy Blue #2F4C72 accent line
- Deep Gray #4A4B4D for windows/details
- Signal Red #C83934 as highlight point
- Aqua Blue #A9D8E9 for subtle reflection hints

Material & Texture:
- Semi-gloss painted surface
- Glass parts glossy with subtle reflections
- No rough noise or grime
- Clean premium finish

Lighting:
- Neutral daylight (6000K)
- Soft key from upper-left
- Gentle fill from opposite side
- Very soft rim light to define silhouette
- No harsh shadows (use soft ambient occlusion only)

Background:
- Soft gradient (Aqua Blue → Mist Gray)
- No horizon line, smooth atmospheric fade

Rendering Style:
- Blender-like physically-based rendering
- Smooth shading transitions
- Noise-free final output

Overall Mood:
- Calm, balanced, peaceful maritime vibe
`.trim();

export default async function handler(req, res) {
  try {
    // 구 사양 경로로 고정 (일부 계정에서 /v1/images 가 404)
    const resp = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: PROMPT,
        size: "1024x1024",
      }),
    });

    const text = await resp.text();
    if (!resp.ok) return res.status(resp.status).json({ ok: false, error: text });

    let json;
    try { json = JSON.parse(text); }
    catch { return res.status(500).json({ ok:false, error:"JSON parse fail", raw:text }); }

    const image_url = json?.data?.[0]?.url ?? null;
    return res.status(200).json({ ok: true, prompt: PROMPT, image_url });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
}

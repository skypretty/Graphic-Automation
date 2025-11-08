import objects from "./data/objects.json" assert { type: "json" };

export function buildPrompt() {
  // 랜덤 객체 선택
  const object = objects[Math.floor(Math.random() * objects.length)];

  // 네가 원하는 스타일 프롬프트
  const prompt = `
Minimal 3D icon of a **${object}**.

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

Mood:
- Calm, balanced, peaceful maritime vibe
`;

  return { object, prompt };
}

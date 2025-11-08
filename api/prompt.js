export function buildPrompt(objectName) {
  return `
Minimal 3D icon of a **${objectName}**, rendered in a clean orthographic view (no perspective).

Angle:
- Slight top-front angle (~20°) showing front and one side.

Shape & Form:
- Smooth, balanced geometry with subtle bevels.
- Stable proportions, centered neatly in a square frame.

Color Palette:
- Marine White (#F4F5F7) base
- Navy Blue (#2F4C72) accent line details
- Deep Gray (#4A4B4D) for window/seam accents
- Signal Red (#C83934) as a single highlight point
- Aqua Blue (#A9D8E9) for subtle reflective hints

Material:
- Semi-gloss painted plastic; glass parts glossy with soft reflections.
- No noise/grime; premium clean finish.

Lighting:
- Neutral daylight (~6000K). Soft key from upper-left, gentle fill opposite.
- Very soft rim light around silhouette.
- No hard shadows; soft ambient occlusion near contact areas.

Background:
- Soft gradient (Aqua Blue → Mist Gray), no horizon line.

Rendering:
- Blender-like physically based shading; smooth highlight rolloff; noise-free.

Mood:
- Calm, minimal, balanced, maritime clarity.
  `.trim();
}

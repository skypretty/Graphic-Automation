export default async function handler(req, res) {
  const domain = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const generateURL = `${domain}/api/generate`;

  try {
    const resGen = await fetch(generateURL);
    const result = await resGen.json();

    return res.status(200).json({
      ok: true,
      result,
    });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
}

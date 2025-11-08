import OpenAI from "openai";
import { buildPrompt } from "./prompt.js";

const OBJECTS = [
  // 이동/교통
  "Ferry", "Airplane", "Bicycle", "Train", "Taxi", "Bus", "Subway Car", "Scooter",
  // 여행/도시
  "Hotel Building", "Lighthouse", "Map Pin", "Suitcase", "Passport", "Camera",
  // 자연/야외
  "Palm Tree", "Mountain", "Tent", "Compass", "Binoculars",
  // 일상/사물
  "Coffee Cup", "Backpack", "Headphones", "Smartwatch", "Keyboard", "Game Controller",
  // 상징/서비스
  "Credit Card", "Gift Box", "Shopping Bag", "Chat Bubble", "Shield"
];

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export default async function handler(req, res) {
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const objectName = pickRandom(OBJECTS);
    const prompt = buildPrompt(objectName);

    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024"
    });

    const image_url = response.data?.[0]?.url;
    return res.status(200).json({ ok: true, object: objectName, image_url });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err?.message || "cron failed" });
  }
}

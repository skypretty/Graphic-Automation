import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const client = new OpenAI({
      apiKey: process.env.SORA_MODEL // 네가 환경 변수에 저장한 이름이랑 똑같이 사용
    });

    // 자동으로 생성할 프롬프트 (원하는대로 수정가능)
    const prompt = "미니멀 3D 스타일의 여행 관련 오브젝트 하나";

    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024"
    });

    const image_url = response.data[0].url;

    return res.status(200).json({
      message: "✅ 소라 이미지 생성 완료",
      prompt,
      image_url
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "소라 API 호출 실패", detail: error.message });
  }
}

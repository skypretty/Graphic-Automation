const PROMPT = `
미니멀 3D 오브젝트
단색 배경
광택 있는 플라스틱 재질
부드러운 라이트
정사각 비율 1:1
`;

export default async function handler(req, res) {
  return res.status(200).json({
    ok: true,
    promptUsed: PROMPT.trim(),
    note: "여기서 곧 Sora 호출 붙입니다."
  });
}

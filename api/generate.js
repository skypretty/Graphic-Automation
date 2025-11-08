export default function handler(req, res) {
  return res.status(200).json({
    message: "서버 연결 성공. 여기서 자동 생성 로직을 이어서 붙일 예정."
  });
}

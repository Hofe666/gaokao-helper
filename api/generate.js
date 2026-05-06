import schools from "../data/guangdong-schools.json";

export default async function handler(req, res) {
  const { score, subject } = req.body;
  const userScore = parseInt(score);

  const matched = schools.filter(s =>
    s.subject.includes(subject) &&
    userScore >= (s.min_score || 0) - 10
  );

  const chong = matched.filter(s => userScore >= (s.avg_score || 0) + 10);
  const wen = matched.filter(s => userScore >= (s.avg_score || 0) - 10 && userScore < (s.avg_score || 0) + 10);
  const bao = matched.filter(s => userScore < (s.avg_score || 0) - 10);

  res.status(200).json({
    chong: chong.slice(0,5),
    wen: wen.slice(0,5),
    bao: bao.slice(0,5)
  });
}

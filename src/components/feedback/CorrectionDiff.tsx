import { normalizeSentence } from '../../engine/sentence-normalizer';

export function CorrectionDiff({ userAnswer, canonicalAnswer }: { userAnswer: string; canonicalAnswer: string }) {
  const user = normalizeSentence(userAnswer).split(' ').filter(Boolean);
  const correct = canonicalAnswer.replace(/[.!?]$/, '').split(' ');
  const max = Math.max(user.length, correct.length);
  const pieces = Array.from({ length: max }, (_, index) => ({ user: user[index], correct: correct[index] }));
  return <div className="sentence-diff" aria-label={`So sánh: ${userAnswer}. Câu đúng: ${canonicalAnswer}`}>
    {pieces.map((piece, index) => {
      const same = piece.user?.toLowerCase().replace(/[^a-z']/g, '') === piece.correct?.toLowerCase().replace(/[^a-z']/g, '');
      if (same) return <span key={index} className="same">{piece.correct} </span>;
      return <span className="changed" key={index}>{piece.user && <del>{piece.user}</del>}{piece.correct && <ins>{piece.correct}</ins>}</span>;
    })}
  </div>;
}

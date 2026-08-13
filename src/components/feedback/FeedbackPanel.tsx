import { AlertCircle, ArrowRight, CheckCircle2, RefreshCw, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import type { EvaluationResult } from '../../types/domain';
import { CorrectionDiff } from './CorrectionDiff';

interface FeedbackPanelProps { result: EvaluationResult; onNext: () => void; onRetry: () => void; canRetry: boolean; xp: number; shownAnswer?: boolean }

export function FeedbackPanel({ result, onNext, onRetry, canRetry, xp, shownAnswer }: FeedbackPanelProps) {
  const success = result.status !== 'incorrect' && !shownAnswer;
  const title = shownAnswer ? 'Cùng xem đáp án nhé' : result.status === 'correct' ? 'Chính xác!' : result.status === 'acceptable' ? 'Cách viết này hợp lý!' : result.status === 'almost-correct' ? 'Gần đúng rồi!' : 'Chưa đúng lắm';
  return <motion.section className={`feedback-panel ${success ? 'success' : 'error'}`} role="status" aria-live="polite" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
    <div className="feedback-title">{success ? <CheckCircle2 /> : <AlertCircle />}<div><h2>{title}</h2><span>{xp > 0 ? `+${xp} XP` : `${result.score}% tương đồng`}</span></div></div>
    {(result.status === 'correct' || result.status === 'acceptable') && <div className="answer-confirm"><small>CÂU CỦA BẠN</small><p>{result.userAnswer}</p></div>}
    {result.status !== 'correct' && result.status !== 'acceptable' && result.revealCanonical && <><div className="diff-block"><small>SO SÁNH CÂU</small><CorrectionDiff userAnswer={result.userAnswer} canonicalAnswer={result.canonicalAnswer} /></div><div className="better-answer"><small>CÁCH VIẾT TỐT HƠN</small><p>{result.canonicalAnswer}</p></div></>}
    {result.status !== 'correct' && result.status !== 'acceptable' && !result.revealCanonical && <div className="answer-confirm"><small>GỢI Ý CHO LẦN THỬ TIẾP</small><p>Hãy sửa lỗi được ưu tiên bên dưới. Đáp án mẫu sẽ hiện sau lần thử thứ ba.</p></div>}
    <div className="why-block"><b>Vì sao?</b>{result.explanation.map((item) => <p key={item}>{item}</p>)}{result.mistakes.map((mistake, index) => <div className="mistake-item" key={`${mistake.type}-${index}`}><span>{mistake.type}</span><p>{mistake.explanation}</p></div>)}</div>
    {result.naturalAlternatives.length > 0 && <div className="natural-answer"><Sparkles size={17} /><div><small>CÁCH NÓI TỰ NHIÊN</small><p>{result.naturalAlternatives[0]}</p>{result.naturalAlternatives.length > 1 && <details><summary>Xem thêm {result.naturalAlternatives.length - 1} cách nói</summary>{result.naturalAlternatives.slice(1).map((answer) => <p key={answer}>{answer}</p>)}</details>}</div></div>}
    <div className="feedback-actions">{canRetry ? <button className="btn btn-primary" onClick={onRetry}><RefreshCw size={17} /> Thử lại</button> : <button className="btn btn-primary" onClick={onNext}>Tiếp tục <ArrowRight size={17} /></button>}</div>
  </motion.section>;
}

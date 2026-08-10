import { Lightbulb, Send } from 'lucide-react';
import { useRef } from 'react';

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onHint: () => void;
  onShowAnswer: () => void;
  disabled?: boolean;
  hintLevel: number;
}

export function AnswerInput({ value, onChange, onSubmit, onHint, onShowAnswer, disabled, hintLevel }: AnswerInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  return <div className="answer-area"><div className="answer-label"><span>YOUR ENGLISH</span><small>Viết câu tiếng Anh của bạn</small></div><textarea ref={ref} className="answer-input" aria-label="Câu trả lời bằng tiếng Anh" placeholder="Type your English sentence…" rows={2} value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); if (value.trim() && !disabled) onSubmit(); } }} /><div className="answer-actions"><div><button className="btn btn-ghost" onClick={onHint} disabled={disabled || hintLevel >= 3}><Lightbulb size={18} /> Gợi ý {hintLevel > 0 && `${hintLevel}/3`}</button><button className="btn btn-ghost" onClick={onShowAnswer} disabled={disabled}>Mình chưa biết</button></div><button className="btn btn-primary check-btn" onClick={onSubmit} disabled={!value.trim() || disabled}>Kiểm tra <Send size={17} /></button></div></div>;
}

import { ArrowLeft, MessageCircle, UserRound } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AnswerInput } from '../components/conversation/AnswerInput';
import { ConversationBubble } from '../components/conversation/ConversationBubble';
import { LessonSummary } from '../components/conversation/LessonSummary';
import { FeedbackPanel } from '../components/feedback/FeedbackPanel';
import { ProgressBar } from '../components/common/ProgressBar';
import { evaluateAnswer } from '../engine/answer-evaluator';
import { firstLetterHint } from '../engine/sentence-normalizer';
import { calculateLessonBonus, calculateTurnXp } from '../engine/xp-calculator';
import { loadTopic } from '../data/content-repository';
import { useProgressStore } from '../store/progress-store';
import { completedRoleCount, isConversationCompleted, isRoleCompleted } from '../engine/progress';
import type { RoleCompletionOutcome } from '../store/progress-store';
import type { EvaluationResult, LearningRole, LessonStats, Topic } from '../types/domain';

const emptyStats: LessonStats = { total: 0, correctFirstTry: 0, grammarMistakes: 0, vocabularyMistakes: 0, scoreTotal: 0, xpEarned: 0, wordsLearned: 0 };

export default function LessonPage() {
  const { topicId, conversationId } = useParams();
  const [searchParams] = useSearchParams();
  const requestedRole = searchParams.get('role');
  const navigate = useNavigate();
  const [content, setContent] = useState<{ id: string; topic?: Topic; error?: boolean }>();
  const topic = content?.id === topicId ? content.topic : undefined;
  const contentLoaded = content?.id === topicId;
  const conversation = topic?.conversations.find((item) => item.id === conversationId);
  const { recordAnswer, completeConversationRole, markVocabularySeen, settings, conversationProgress } = useProgressStore();
  const [role, setRole] = useState<LearningRole>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [attempt, setAttempt] = useState(1);
  const [hintLevel, setHintLevel] = useState<0 | 1 | 2 | 3>(0);
  const [result, setResult] = useState<EvaluationResult>();
  const [earnedXp, setEarnedXp] = useState(0);
  const [answered, setAnswered] = useState<Record<string, string>>({});
  const [typing, setTyping] = useState(false);
  const [complete, setComplete] = useState(false);
  const [stats, setStats] = useState<LessonStats>(emptyStats);
  const [shownAnswer, setShownAnswer] = useState(false);
  const [completionOutcome, setCompletionOutcome] = useState<RoleCompletionOutcome>();
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    if (!topicId) return;
    void loadTopic(topicId).then((result) => {
      if (active) {
        setContent({ id: topicId, topic: result });
        const selectedConversation = result?.conversations.find((item) => item.id === conversationId);
        if (selectedConversation && (requestedRole === 'A' || requestedRole === 'B')) {
          const firstIndex = selectedConversation.turns.findIndex((turn) => turn.speaker === requestedRole);
          setRole(requestedRole);
          setCurrentIndex(Math.max(0,firstIndex));
          setStats({ ...emptyStats, total:selectedConversation.turns.filter((turn) => turn.speaker === requestedRole).length });
        } else setRole(undefined);
      }
    }).catch(() => { if (active) setContent({ id:topicId, error:true }); });
    return () => { active = false; };
  }, [conversationId, requestedRole, topicId]);

  const learnerTurns = conversation?.turns.filter((turn) => turn.speaker === role) ?? [];
  const currentTurn = conversation?.turns[currentIndex];
  const learnerPosition = currentTurn ? learnerTurns.findIndex((turn) => turn.id === currentTurn.id) : -1;
  const savedProgress = conversationId ? conversationProgress[conversationId] : undefined;

  useLayoutEffect(() => {
    const messages = messagesRef.current;
    if (!messages || !role || complete) return;

    const keepLatestTurnVisible = () => {
      messages.scrollTop = messages.scrollHeight;
    };

    keepLatestTurnVisible();
    const frame = window.requestAnimationFrame(keepLatestTurnVisible);
    const observer =
      typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(keepLatestTurnVisible);
    observer?.observe(messages);
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [complete, currentIndex, hintLevel, result, role, typing]);

  function start(selectedRole: LearningRole) {
    if (!conversation) return;
    const firstIndex = conversation.turns.findIndex((turn) => turn.speaker === selectedRole);
    setRole(selectedRole); setCurrentIndex(Math.max(0, firstIndex)); setAnswer(''); setAttempt(1); setHintLevel(0); setResult(undefined); setAnswered({}); setComplete(false); setShownAnswer(false); setCompletionOutcome(undefined);
    setStats({ ...emptyStats, total: conversation.turns.filter((turn) => turn.speaker === selectedRole).length });
  }

  if (!contentLoaded) return <main className="lesson-error" role="status"><p>Đang tải hội thoại…</p></main>;
  if (content?.error) return <main className="lesson-error"><h1>Nội dung chưa được lưu ngoại tuyến</h1><p>Kết nối mạng và mở chủ đề một lần trước khi học offline.</p><button className="btn btn-primary" onClick={() => navigate('/topics')}>Về thư viện</button></main>;
  if (!topic || !conversation) return <main className="lesson-error"><h1>Không tìm thấy bài học</h1><button className="btn btn-primary" onClick={() => navigate('/topics')}>Về thư viện</button></main>;

  function submit() {
    if (!currentTurn || !answer.trim() || result) return;
    const evaluation = evaluateAnswer(answer, currentTurn, { attempt });
    const xp = evaluation.status === 'incorrect' ? 0 : calculateTurnXp({ attempt, hintLevel, showedAnswer: false });
    setResult(evaluation); setEarnedXp(xp);
    recordAnswer({ turnId: currentTurn.id, topicId: topic!.id, conversationId: conversation!.id, role:role!, vietnamese: currentTurn.vietnamese, result: evaluation, xp, vocabulary: currentTurn.vocabulary ?? [], firstTry: attempt === 1 });
    markVocabularySeen(currentTurn.vocabulary ?? [], topic!.id, evaluation.status !== 'incorrect');
    setStats((old) => ({ ...old, correctFirstTry: old.correctFirstTry + (evaluation.status !== 'incorrect' && attempt === 1 ? 1 : 0), grammarMistakes: old.grammarMistakes + evaluation.mistakes.filter((item) => item.type !== 'vocabulary').length, vocabularyMistakes: old.vocabularyMistakes + evaluation.mistakes.filter((item) => item.type === 'vocabulary').length, scoreTotal: old.scoreTotal + (evaluation.status !== 'incorrect' ? evaluation.score : 0), xpEarned: old.xpEarned + xp, wordsLearned: old.wordsLearned + (currentTurn.vocabulary?.length ?? 0) }));
  }

  function retry() { setAttempt((value) => value + 1); setResult(undefined); setAnswer(''); setEarnedXp(0); }

  function showAnswer() {
    if (!currentTurn) return;
    const evaluation = evaluateAnswer('', currentTurn, { attempt, showAnswer:true });
    const shown: EvaluationResult = { ...evaluation, userAnswer: '—', explanation: [currentTurn.explanation ?? 'Hãy ghi nhớ cấu trúc và thử lại câu này trong mục Ôn lỗi sai.'] };
    setResult(shown); setShownAnswer(true); setAnswer(currentTurn.canonicalAnswer); setEarnedXp(1);
    recordAnswer({ turnId: currentTurn.id, topicId: topic!.id, conversationId: conversation!.id, role:role!, vietnamese: currentTurn.vietnamese, result: shown, xp: 1, vocabulary: currentTurn.vocabulary ?? [], firstTry: false });
    setStats((old) => ({ ...old, scoreTotal: old.scoreTotal, xpEarned: old.xpEarned + 1, grammarMistakes: old.grammarMistakes + 1 }));
  }

  function next() {
    if (!currentTurn || !role) return;
    const finalAnswer = shownAnswer ? currentTurn.canonicalAnswer : answer;
    setAnswered((old) => ({ ...old, [currentTurn.id]: finalAnswer }));
    const nextIndex = conversation!.turns.findIndex((turn, index) => index > currentIndex && turn.speaker === role);
    if (nextIndex < 0) {
      const perfect = stats.correctFirstTry === stats.total;
      const accuracy = stats.total ? Math.round(stats.scoreTotal / stats.total) : 0;
      const outcome = completeConversationRole({ conversationId:conversation!.id, topicId:topic!.id, topicConversationIds:topic!.conversations.map((item) => item.id), role, accuracy, sessionXp:stats.xpEarned, roleBonusXp:calculateLessonBonus(perfect) });
      setCompletionOutcome(outcome);
      setStats((old) => ({ ...old, xpEarned: old.xpEarned + outcome.completionXp }));
      setComplete(true); return;
    }
    setTyping(true); setResult(undefined); setAnswer(''); setAttempt(1); setHintLevel(0); setEarnedXp(0); setShownAnswer(false);
    window.setTimeout(() => { setCurrentIndex(nextIndex); setTyping(false); }, settings.animationsEnabled ? 500 : 0);
  }

  function restart() { if (role) start(role); }

  if (complete && role && completionOutcome) return <LessonSummary stats={stats} topicId={topic.id} conversationId={conversation.id} role={role} progress={conversationProgress[conversation.id]} outcome={completionOutcome} onRestart={restart} onPracticeOther={() => start(role === 'A' ? 'B' : 'A')} />;
  if (!role) {
    const count = completedRoleCount(savedProgress);
    return <main className="role-page"><Link to={`/topics/${topic.id}`} className="back-link"><ArrowLeft size={17} /> {topic.title}</Link><div className="role-intro"><span>{topic.icon}</span><p className="eyebrow">Luyện cả hai phía</p><h1>{conversation.title}</h1><p>Mỗi vai có các lượt viết riêng. Cuộc hội thoại chỉ hoàn thành khi bạn đã luyện cả Person A và Person B.</p><div className="role-overall"><ProgressBar value={count} max={2} /><b>{count} / 2 vai đã hoàn thành</b></div></div><div className="role-options">{(['A','B'] as const).map((item) => { const done = isRoleCompleted(savedProgress,item); return <button className={done ? 'completed' : ''} onClick={() => start(item)} key={item}><span className={`role-avatar ${item.toLowerCase()}`}>{item === 'A' ? <UserRound /> : <MessageCircle />}</span><small>PERSON {item}</small><h2>Bạn là Person {item}</h2><p>{item === 'A' ? 'Luyện mở đầu, đặt câu hỏi và dẫn dắt hội thoại.' : 'Nghe ngữ cảnh trước, luyện phản hồi và kết thúc.'}</p><span className={`role-status ${done ? 'done' : ''}`}>{done ? '✓ Đã hoàn thành' : '○ Chưa hoàn thành'}</span><b>{done ? 'Luyện lại' : `Luyện vai ${item}`} →</b></button>; })}</div>{isConversationCompleted(savedProgress) && <p className="conversation-mastered-note">✓ Bạn đã luyện thành thạo cả hai vai của hội thoại này.</p>}</main>;
  }

  const hintText = currentTurn ? hintLevel === 1 ? `Từ khóa: ${currentTurn.hint || currentTurn.requiredKeywords?.join(' / ')}` : hintLevel === 2 ? `Cấu trúc: ${currentTurn.grammarPoints?.join(' · ')}` : hintLevel === 3 ? `Chữ cái đầu: ${firstLetterHint(currentTurn.canonicalAnswer)}` : '' : '';
  const visibleTurns = conversation.turns.slice(0, currentIndex + 1);

  return <main className="lesson-layout"><header className="lesson-top"><Link to={`/topics/${topic.id}`} aria-label="Thoát bài học"><ArrowLeft /></Link><div><b>{conversation.title}</b><span>Bạn là Person {role}</span></div><div className="lesson-progress"><ProgressBar value={Math.max(0, learnerPosition)} max={learnerTurns.length} /><span>{Math.max(1, learnerPosition + 1)}/{learnerTurns.length}</span></div></header><div className="lesson-body"><aside className="context-panel"><span className="partner-avatar">{conversation.partner.avatar}</span><h2>{conversation.partner.name}</h2><span className="online">● Online</span><div><small>TÌNH HUỐNG</small><p>{conversation.situation}</p></div><div><small>MỤC TIÊU</small><p>{conversation.goal}</p></div><div><small>CỤM TỪ HỮU ÍCH</small>{topic.grammar.map((item) => <span className="tag" key={item}>{item}</span>)}</div></aside><section className="chat-workspace"><div className="chat-header"><div className="partner-avatar small">{conversation.partner.avatar}</div><div><b>{conversation.partner.name}</b><span>đang trò chuyện với bạn</span></div></div><div className="messages" ref={messagesRef} aria-live="polite">{visibleTurns.map((turn) => <ConversationBubble key={turn.id} turn={turn} role={role} active={turn.id === currentTurn?.id} english={turn.speaker !== role ? turn.canonicalAnswer : answered[turn.id]} />)}{typing && <div className="typing"><span /><span /><span /> {conversation.partner.name} đang nhập…</div>}</div>{currentTurn && !typing && <div className="composer"><AnimatePresence>{hintText && <motion.div className="hint-box" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>💡 {hintText}</motion.div>}</AnimatePresence>{!result && <AnswerInput value={answer} onChange={setAnswer} onSubmit={submit} onHint={() => setHintLevel((level) => Math.min(3, level + 1) as 0|1|2|3)} onShowAnswer={showAnswer} hintLevel={hintLevel} />}{result && <FeedbackPanel result={result} xp={earnedXp} shownAnswer={shownAnswer} canRetry={result.status === 'incorrect' && attempt < 3 && !shownAnswer} onRetry={retry} onNext={result.status === 'incorrect' && !shownAnswer ? showAnswer : next} />}</div>}</section></div></main>;
}

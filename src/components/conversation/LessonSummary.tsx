import { Award, CheckCircle2, Home, RotateCcw, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { isRoleCompleted } from '../../engine/progress';
import type { RoleCompletionOutcome } from '../../store/progress-store';
import type { ConversationProgress, LearningRole, LessonStats } from '../../types/domain';

interface LessonSummaryProps {
  stats: LessonStats;
  topicId: string;
  conversationId: string;
  role: LearningRole;
  progress?: ConversationProgress;
  outcome: RoleCompletionOutcome;
  dailyReturn?: boolean;
  onRestart: () => void;
  onPracticeOther: () => void;
}

export function LessonSummary({ stats, topicId, role, progress, outcome, dailyReturn, onRestart, onPracticeOther }: LessonSummaryProps) {
  const accuracy = stats.total ? Math.round(stats.scoreTotal / stats.total) : 0;
  const otherRole = role === 'A' ? 'B' : 'A';
  const conversationAccuracy = progress
    ? Math.round(((['A','B'] as const).reduce((sum,item) => sum + (progress.roles[item].accuracy ?? 0),0)) / Math.max(1,outcome.rolesCompleted))
    : accuracy;
  return <main className="summary-page"><div className="celebration" aria-hidden="true">✦ <span>✺</span> ✦</div><div className="summary-icon">{outcome.conversationCompleted ? <Award /> : <Users />}</div><p className="eyebrow">{outcome.conversationCompleted ? 'Conversation complete' : `Role ${role} completed`}</p><h1>{outcome.conversationCompleted ? 'Bạn đã luyện cả hai phía của cuộc trò chuyện!' : `Bạn đã hoàn thành Person ${role}.`}</h1><p>{outcome.conversationCompleted ? 'Cả Person A và Person B đã hoàn thành. Cuộc hội thoại giờ mới được tính vào tiến độ.' : `Cuộc hội thoại đang tiếp tục: hãy luyện Person ${otherRole} để hoàn thành.`}</p>
    <div className="role-summary" aria-label={`${outcome.rolesCompleted} trên 2 vai đã hoàn thành`}><div className={isRoleCompleted(progress,'A') ? 'done' : ''}><span>A</span><b>Person A</b><small>{isRoleCompleted(progress,'A') ? '✓ Đã hoàn thành' : '○ Chưa hoàn thành'}</small></div><div className={isRoleCompleted(progress,'B') ? 'done' : ''}><span>B</span><b>Person B</b><small>{isRoleCompleted(progress,'B') ? '✓ Đã hoàn thành' : '○ Chưa hoàn thành'}</small></div></div>
    <div className="summary-role-progress"><div><span>Tiến độ hội thoại</span><b>{outcome.rolesCompleted} / 2 vai</b></div><div className="progress-track"><span style={{ width:`${outcome.rolesCompleted * 50}%` }} /></div></div>
    <div className="accuracy-ring" style={{ '--accuracy': `${(outcome.conversationCompleted ? conversationAccuracy : accuracy) * 3.6}deg` } as React.CSSProperties}><div><b>{outcome.conversationCompleted ? conversationAccuracy : accuracy}%</b><span>{outcome.conversationCompleted ? 'chính xác tổng' : `chính xác vai ${role}`}</span></div></div>
    <div className="summary-stats"><div><CheckCircle2 /><b>{stats.correctFirstTry}/{stats.total}</b><span>Đúng lần đầu</span></div><div><Sparkles /><b>+{stats.xpEarned}</b><span>XP phiên này</span></div><div><RotateCcw /><b>{stats.grammarMistakes}</b><span>Lỗi ngữ pháp</span></div></div>
    <div className="summary-actions">{dailyReturn ? <Link className="btn btn-primary" to="/daily"><Home size={17} /> Tiếp tục kế hoạch hôm nay</Link> : <Link className="btn btn-secondary" to={`/topics/${topicId}`}><Home size={17} /> Về chủ đề</Link>}{!dailyReturn && !outcome.conversationCompleted && <button className="btn btn-primary" onClick={onPracticeOther}><Users size={17} /> Luyện Person {otherRole}</button>}<button className={outcome.conversationCompleted && !dailyReturn ? 'btn btn-primary' : 'btn btn-ghost'} onClick={onRestart}><RotateCcw size={17} /> Luyện lại vai {role}</button></div>
  </main>;
}

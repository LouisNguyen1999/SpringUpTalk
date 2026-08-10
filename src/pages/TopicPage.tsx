import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { loadTopic } from '../data/content-repository';
import { useProgressStore } from '../store/progress-store';
import { completedRoleCount, conversationCompletionState, isRoleCompleted, isTopicCompleted, nextMissingRole } from '../engine/progress';
import { ProgressBar } from '../components/common/ProgressBar';
import type { Topic } from '../types/domain';

export default function TopicPage() {
  const { topicId } = useParams();
  const [content, setContent] = useState<{ id: string; topic?: Topic; error?: boolean }>();
  const topic = content?.id === topicId ? content.topic : undefined;
  const loaded = content?.id === topicId;
  const conversationProgress = useProgressStore((state) => state.conversationProgress);
  useEffect(() => {
    let active = true;
    if (!topicId) return;
    void loadTopic(topicId).then((result) => {
      if (active) setContent({ id: topicId, topic: result });
    }).catch(() => { if (active) setContent({ id:topicId, error:true }); });
    return () => { active = false; };
  }, [topicId]);
  if (!loaded) return <div className="page-loader" role="status">Đang tải nội dung chủ đề…</div>;
  if (content?.error) return <div className="page narrow lesson-error"><h1>Chủ đề này chưa có trong bộ nhớ ngoại tuyến</h1><p>Hãy kết nối mạng và mở chủ đề một lần để ứng dụng lưu nội dung cho lần học sau.</p><Link className="btn btn-secondary" to="/topics">Về thư viện</Link></div>;
  if (!topic) return <div className="page narrow"><h1>Không tìm thấy chủ đề</h1><Link className="btn btn-secondary" to="/topics">Quay lại</Link></div>;
  const completedRoles = topic.conversations.reduce((sum,item) => sum + completedRoleCount(conversationProgress[item.id]),0);
  const totalRoles = topic.conversations.length * 2;
  const topicComplete = isTopicCompleted(conversationProgress,topic.id,topic.conversations.map((item) => item.id));
  return <div className="page narrow topic-detail"><Link to="/topics" className="back-link"><ArrowLeft size={17} /> Thư viện</Link><header className="topic-hero"><span>{topic.icon}</span><div><div className="topic-tags"><span className="tag level-tag">{topic.level}</span><span className="tag">{topic.category}</span></div><h1>{topic.title}</h1><p>{topic.titleVi} — {topic.description}</p></div></header><div className="topic-role-progress card"><div><b>{topicComplete ? '✓ Chủ đề hoàn thành' : completedRoles ? 'Chủ đề đang học' : 'Bắt đầu chủ đề'}</b><span>{completedRoles} / {totalRoles} vai đã hoàn thành</span></div><ProgressBar value={completedRoles} max={totalRoles} /></div><div className="context-card card"><b>Bạn sẽ luyện</b><div>{topic.grammar.map((grammar) => <span className="tag" key={grammar}>{grammar}</span>)}</div></div><h2 className="lesson-heading">Chọn một cuộc hội thoại</h2><div className="conversation-list">{topic.conversations.map((conversation, index) => { const saved = conversationProgress[conversation.id]; const state = conversationCompletionState(saved); const count = completedRoleCount(saved); const nextRole = nextMissingRole(saved); return <article className={`conversation-card card ${state}`} key={conversation.id}><div className="lesson-number">{state === 'completed' ? <CheckCircle2 /> : index + 1}</div><div className="conversation-copy"><small>{state === 'completed' ? 'Đã hoàn thành cả hai vai' : state === 'in-progress' ? 'Đang học' : `${conversation.turns.length} lượt hội thoại`}</small><h2>{conversation.title}</h2><p>{conversation.titleVi}</p><div className="conversation-role-row"><span className={isRoleCompleted(saved,'A') ? 'done' : ''}>A {isRoleCompleted(saved,'A') ? '✓' : '○'}</span><span className={isRoleCompleted(saved,'B') ? 'done' : ''}>B {isRoleCompleted(saved,'B') ? '✓' : '○'}</span><b>{count} / 2</b></div><div className="situation"><MessageCircle size={16} /><span>{conversation.situation}</span></div></div><Link className="btn btn-primary" to={state === 'not-started' || state === 'completed' ? `/lesson/${topic.id}/${conversation.id}` : `/lesson/${topic.id}/${conversation.id}?role=${nextRole}`}>{state === 'completed' ? 'Luyện lại' : state === 'in-progress' ? `Luyện vai ${nextRole}` : 'Chọn vai'} <ArrowRight size={17} /></Link></article>; })}</div></div>;
}

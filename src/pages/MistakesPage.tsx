import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';
import { strongestWeaknesses } from '../engine/recommendations';
import { isReviewDue } from '../engine/review-scheduler';
import { useProgressStore } from '../store/progress-store';
import type { MistakeRecord } from '../types/domain';

function ReviewCard({ item }: { item:MistakeRecord }) {
  return <article className="review-card card"><div className="review-prompt"><small>🇻🇳 VIETNAMESE {item.role ? `· PERSON ${item.role}` : ''}</small><h2>{item.vietnamese}</h2></div><div className="review-answers"><div><small>CÂU CỦA BẠN</small><p className="wrong">{item.userAnswer}</p></div><ArrowRight /><div><small>CÁCH VIẾT TỐT HƠN</small><p className="right">{item.canonicalAnswer}</p></div></div><footer><div>{(item.types.length ? item.types : ['grammar']).map((type) => <span className="tag" key={type}>{type}</span>)}</div><Link className="btn btn-secondary" to={`/lesson/${item.topicId}/${item.conversationId}${item.role ? `?role=${item.role}` : ''}`}>Ôn trong hội thoại <ArrowRight size={16} /></Link></footer></article>;
}

export default function MistakesPage() {
  const progress = useProgressStore();
  const due = progress.mistakes.filter((item) => isReviewDue(progress.sentenceProgress[item.turnId])).sort((a,b) => (a.nextReviewAt ?? a.createdAt).localeCompare(b.nextReviewAt ?? b.createdAt));
  const weaknesses = strongestWeaknesses(progress);
  const weakVocabulary = progress.vocabulary.filter((item) => item.mastery !== 'mastered' && (item.timesCorrect / Math.max(1,item.timesSeen)) < .8).slice(0,12);
  return <div className="page"><p className="eyebrow">Biến lỗi sai thành tiến bộ</p><h1>Ôn tập thông minh</h1><p className="subhead">Lịch ôn theo ngày ưu tiên câu đến hạn, điểm ngữ pháp yếu và từ vựng cần củng cố. Mỗi lỗi chỉ có một bản ghi đang hoạt động.</p>{progress.mistakes.length === 0 ? <EmptyState icon={AlertTriangle} title="Chưa có lỗi nào để ôn" text="Tuyệt! Các câu cần ôn sẽ tự xuất hiện ở đây sau khi bạn học." /> : <>
    <div className="section-heading"><h2>Đến hạn hôm nay</h2><span>{due.length} câu</span></div>
    {due.length ? <div className="review-list">{due.map((item) => <ReviewCard item={item} key={item.id} />)}</div> : <div className="card empty-review"><b>Bạn đã hoàn thành lượt ôn hôm nay.</b><span>Các câu tiếp theo sẽ xuất hiện đúng ngày đã lên lịch.</span></div>}
    <div className="section-heading"><h2>Ngữ pháp cần củng cố</h2><span>Dựa trên lỗi thật</span></div>
    <div className="mistake-groups">{weaknesses.map(({type,count}) => <div className="card" key={type}><span>{type}</span><b>{count}</b><small>lần cần sửa</small></div>)}</div>
    {weakVocabulary.length > 0 && <><div className="section-heading"><h2>Từ vựng cần ôn</h2><Link className="text-link" to="/vocabulary">Mở sổ từ</Link></div><div className="weak-vocab-list">{weakVocabulary.map((item) => <span className="tag" key={item.id}>{item.word} · {item.timesCorrect}/{item.timesSeen}</span>)}</div></>}
    <div className="section-heading"><h2>Lỗi gần đây</h2><span>{progress.mistakes.length} lỗi duy nhất</span></div>
    <div className="review-list">{progress.mistakes.slice(0,20).map((item) => <ReviewCard item={item} key={item.id} />)}</div>
  </>}</div>;
}

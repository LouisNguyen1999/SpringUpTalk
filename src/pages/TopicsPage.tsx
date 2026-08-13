import { Heart, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProgressBar } from '../components/common/ProgressBar';
import { topicManifest } from '../data/content-repository';
import { useProgressStore } from '../store/progress-store';
import type { Difficulty } from '../types/domain';
import { normalizeSearchText, searchIndexMatches } from '../utils/search';
import { topicRoleCounts } from '../engine/progress';

export default function TopicsPage() {
  const PAGE_SIZE = 48;
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState<Difficulty | 'all'>('all');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { conversationProgress, favorites, toggleFavoriteTopic, settings } = useProgressStore();
  const categories = Array.from(new Set(topicManifest.map((topic) => topic.category)));
  const filtered = useMemo(() => {
    const query = normalizeSearchText(search);
    return topicManifest.filter((topic) => {
      const progress = topicRoleCounts(conversationProgress,topic.id,topic.conversationCount);
      return searchIndexMatches(topic.searchText,query) && (level === 'all' || topic.level === level) && (category === 'all' || topic.category === category) && (status === 'all' || status === progress.state || (status === 'favorite' && favorites.includes(topic.id)));
    });
  }, [category, conversationProgress, favorites, level, search, status]);
  const visibleTopics = filtered.slice(0,visibleCount);

  return <div className="page topics-page"><p className="eyebrow">Thư viện hội thoại</p><h1>Hôm nay bạn muốn nói về điều gì?</h1><p className="subhead">Tìm theo ngữ cảnh, ngữ pháp hoặc từ vựng. Số lượng dưới đây phản ánh đúng dữ liệu đang có.</p>
    <div className="topic-toolbar card"><div className="search-box"><Search size={19} /><input aria-label="Tìm chủ đề" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm coffee, đi làm, present simple…" /></div><div className="filters">
      <select className="select" aria-label="Lọc cấp độ" value={level} onChange={(e) => setLevel(e.target.value as Difficulty | 'all')}><option value="all">Mọi cấp độ</option>{(['A1','A2','B1','B2'] as const).map((item) => <option key={item}>{item}</option>)}</select>
      <select className="select" aria-label="Lọc danh mục" value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">Mọi danh mục</option>{categories.map((item) => <option key={item}>{item}</option>)}</select>
      <select className="select" aria-label="Lọc tiến độ" value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">Mọi tiến độ</option><option value="not-started">Chưa học</option><option value="in-progress">Đang học</option><option value="completed">Đã hoàn thành</option><option value="favorite">Yêu thích</option></select>
    </div></div>
    <div className="results-row"><b>{filtered.length} chủ đề</b><span>{topicManifest.reduce((sum, topic) => sum + topic.conversationCount, 0)} hội thoại trong thư viện</span></div>
    <div className="topic-grid">{visibleTopics.map((topic) => { const progress = topicRoleCounts(conversationProgress,topic.id,topic.conversationCount); return <article className={`topic-card card ${progress.state}`} key={topic.id}><button className={`icon-btn ${favorites.includes(topic.id) ? 'active' : ''}`} onClick={() => toggleFavoriteTopic(topic.id)} aria-label={favorites.includes(topic.id) ? 'Bỏ yêu thích' : 'Thêm yêu thích'}><Heart size={20} fill={favorites.includes(topic.id) ? 'currentColor' : 'none'} /></button><Link to={`/topics/${topic.id}`}><span className="topic-icon">{topic.icon}</span><div className="topic-tags">{settings.showDifficulty && <span className="tag level-tag">{topic.level}</span>}<span className="tag">{topic.category}</span></div><h2>{topic.title}</h2><p>{topic.titleVi}</p><small>{topic.conversationCount} hội thoại · {topic.description}</small><div className="topic-progress-label"><span>{progress.state === 'completed' ? 'Đã hoàn thành' : progress.state === 'in-progress' ? 'Đang học' : 'Chưa bắt đầu'}</span><b>{progress.completed}/{progress.total} vai</b></div><ProgressBar value={progress.completed} max={progress.total} /></Link></article>; })}</div>
    {visibleCount < filtered.length && <div className="load-more"><button className="btn btn-secondary" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>Hiển thị thêm {Math.min(PAGE_SIZE,filtered.length-visibleCount)} chủ đề</button><span>Đang hiển thị {visibleCount}/{filtered.length}</span></div>}
    {filtered.length === 0 && <div className="empty-state"><Search size={36} /><h2>Không tìm thấy chủ đề</h2><p>Thử một từ khoá hoặc bộ lọc khác nhé.</p></div>}
  </div>;
}

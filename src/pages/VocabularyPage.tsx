import { BookOpen, Heart, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { EmptyState } from '../components/common/EmptyState';
import { useProgressStore } from '../store/progress-store';
import type { Mastery } from '../types/domain';

export default function VocabularyPage() {
  const { vocabulary, toggleVocabularyFavorite } = useProgressStore();
  const [filter, setFilter] = useState<Mastery | 'favorite' | 'all'>('all');
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => vocabulary.filter((item) => (filter === 'all' || (filter === 'favorite' ? item.favorite : item.mastery === filter)) && `${item.word} ${item.meaning}`.toLowerCase().includes(search.toLowerCase())), [filter, search, vocabulary]);
  return <div className="page"><p className="eyebrow">Sổ tay cá nhân</p><h1>Từ vựng của tôi</h1><p className="subhead">Từ mới trong bài học được lưu cùng ví dụ và tự cập nhật mức độ ghi nhớ.</p><div className="notebook-toolbar card"><div className="search-box"><Search size={18} /><input aria-label="Tìm từ vựng" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm từ hoặc nghĩa…" /></div><div className="tab-list" role="tablist">{(['all','new','learning','mastered','favorite'] as const).map((item) => <button role="tab" aria-selected={filter === item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{({all:'Tất cả',new:'Mới',learning:'Đang học',mastered:'Đã nhớ',favorite:'Yêu thích'})[item]}</button>)}</div></div>{filtered.length === 0 ? <EmptyState icon={BookOpen} title={vocabulary.length ? 'Không có từ phù hợp' : 'Sổ từ vựng đang trống'} text={vocabulary.length ? 'Hãy thử bộ lọc khác.' : 'Học một hội thoại có thẻ từ vựng để bắt đầu sổ tay.'} /> : <div className="vocab-grid">{filtered.map((item) => <article className="vocab-card card" key={item.id}><button className={`icon-btn ${item.favorite ? 'active' : ''}`} aria-label={item.favorite ? 'Bỏ yêu thích' : 'Thêm yêu thích'} onClick={() => toggleVocabularyFavorite(item.id)}><Heart fill={item.favorite ? 'currentColor' : 'none'} /></button><span className={`mastery ${item.mastery}`}>{item.mastery}</span><h2>{item.word}</h2>{item.ipa && <code>{item.ipa}</code>}<p className="meaning">{item.meaning}</p><blockquote>“{item.example}”</blockquote>{item.exampleVi && <small>{item.exampleVi}</small>}<footer>Đã gặp {item.timesSeen} lần · đúng {item.timesCorrect} lần</footer></article>)}</div>}</div>;
}

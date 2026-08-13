import { BookOpen, Clock3, Play, Plus, Search, Star, Target, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';
import { vocabularyRepository, vocabularyIndex } from '../data/vocabulary/vocabulary-repository';
import { useProgressStore } from '../store/progress-store';
import type { Mastery, VocabularySummary } from '../types/domain';
import { normalizeVocabularyIdentityKey, searchTextMatches } from '../utils/search';

function customSummary(term: string, id: string, meaning: string): VocabularySummary {
  return {
    id,
    term,
    normalizedTerm: term.toLowerCase(),
    shortMeaning: meaning,
    type: 'word',
    tags: ['Custom'],
    practiceCount: 0,
    shard: -1,
  };
}

function VocabularyRow({
  item,
  mastery,
  favorite,
}: {
  item: VocabularySummary;
  mastery?: Mastery;
  favorite?: boolean;
}) {
  return (
    <article className="vocabulary-result">
      <div>
        <span className={`mastery ${mastery ?? 'new'}`}>{mastery ?? 'new'}</span>
        <h3>
          <Link to={`/vocabulary/${encodeURIComponent(item.id)}`}>{item.term}</Link>
          {favorite && <Star size={15} fill="currentColor" aria-label="Yêu thích" />}
        </h3>
        <p>{item.shortMeaning}</p>
        <small>
          {item.partOfSpeech ?? item.type}
          {item.cefr ? ` · ${item.cefr}` : ''} ·{' '}
          {item.practiceCount ? `${item.practiceCount} bài luyện` : 'chưa có bài luyện'}
        </small>
      </div>
      <Link className="btn btn-secondary" to={`/vocabulary/${encodeURIComponent(item.id)}`}>
        Xem
      </Link>
    </article>
  );
}

export default function VocabularyPage() {
  const { vocabulary, customVocabulary } = useProgressStore();
  const [now] = useState(Date.now);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Mastery | 'favorite' | 'all'>('all');
  const progressById = useMemo(
    () => new Map(vocabulary.map((item) => [item.id, item])),
    [vocabulary],
  );
  const custom = useMemo(
    () =>
      customVocabulary.map((entry) =>
        customSummary(
          entry.term,
          entry.id,
          entry.meanings.map((meaning) => meaning.meaning).join(' · '),
        ),
      ),
    [customVocabulary],
  );
  const searchResults = useMemo(
    () =>
      query.trim()
        ? [
            ...vocabularyRepository.search(query, 20),
            ...custom.filter((item) =>
              searchTextMatches(`${item.term} ${item.shortMeaning}`, query),
            ),
          ]
            .filter(
              (item, index, all) =>
                all.findIndex(
                  (candidate) =>
                    normalizeVocabularyIdentityKey(candidate.term) ===
                    normalizeVocabularyIdentityKey(item.term),
                ) === index,
            )
        : [],
    [custom, query],
  );
  const notebook = useMemo(
    () =>
      vocabulary
        .map((progress) => {
          const staticItem = vocabularyIndex.find((item) => item.id === progress.id);
          const customItem = custom.find((item) => item.id === progress.id);
          return { progress, item: staticItem ?? customItem };
        })
        .filter((row): row is { progress: (typeof vocabulary)[number]; item: VocabularySummary } =>
          Boolean(row.item),
        )
        .filter(
          ({ progress }) =>
            filter === 'all' ||
            (filter === 'favorite' ? progress.favorite : progress.mastery === filter),
        ),
    [custom, filter, vocabulary],
  );
  const due = notebook
    .filter(({ progress }) => progress.nextReviewAt && Date.parse(progress.nextReviewAt) <= now)
    .slice(0, 5);
  const weak = notebook
    .filter(
      ({ progress }) =>
        (progress.practiceCount ?? 0) > 0 &&
        (progress.targetUsageCorrectCount ?? 0) / Math.max(1, progress.practiceCount ?? 0) < 0.8,
    )
    .slice(0, 5);
  const practiced = vocabulary.filter((item) => (item.practiceCount ?? 0) > 0);
  const firstTry = practiced.reduce((sum, item) => sum + (item.firstTryCorrectCount ?? 0), 0);
  const attempts = practiced.reduce((sum, item) => sum + (item.practiceCount ?? 0), 0);
  const starterIds = [
    'vocab:deadline',
    'vocab:issue',
    'vocab:clarify',
    'vocab:focuson',
    'vocab:itinerary',
    'vocab:inadvance',
  ];
  const starters = starterIds
    .map((id) => vocabularyIndex.find((item) => item.id === id && item.practiceCount > 0))
    .filter((item): item is VocabularySummary => Boolean(item));
  return (
    <div className="page vocabulary-home">
      <p className="eyebrow">Hiểu · viết · ôn lại · làm chủ</p>
      <h1>Vocabulary Practice</h1>
      <p className="subhead">
        Luyện 500 từ và cụm từ qua 2.500 câu Việt–Anh. Tìm một từ, xem cách dùng thực tế hoặc bắt
        đầu ngay bên dưới.
      </p>
      <section className="vocabulary-search-card card">
        <label htmlFor="vocabulary-search">Tìm một từ hoặc cụm từ</label>
        <div className="search-box">
          <Search size={19} />
          <input
            id="vocabulary-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a word or phrase…"
            autoComplete="off"
          />
        </div>
        {query.trim() && (
          <div className="vocabulary-search-results" aria-live="polite">
            {searchResults.length ? (
              searchResults.map((item) => (
                <VocabularyRow
                  key={item.id}
                  item={item}
                  mastery={progressById.get(item.id)?.mastery}
                  favorite={progressById.get(item.id)?.favorite}
                />
              ))
            ) : (
              <div className="unknown-vocabulary">
                <b>Từ này chưa có trong từ điển offline.</b>
                <span>Ứng dụng sẽ không tự đoán nghĩa.</span>
                <Link
                  className="btn btn-primary"
                  to={`/vocabulary/custom?term=${encodeURIComponent(query.trim())}`}
                >
                  <Plus size={17} /> Thêm từ thủ công
                </Link>
              </div>
            )}
          </div>
        )}
      </section>
      <section className="vocabulary-start-section" aria-labelledby="vocabulary-start-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">500 từ · không giới hạn lượt thử</p>
            <h2 id="vocabulary-start-title">Bắt đầu luyện ngay</h2>
          </div>
          <span>Quick 5 · Standard 10 · Master</span>
        </div>
        <div className="vocabulary-starter-grid">
          {starters.map((item) => (
            <article className="card vocabulary-starter-card" key={item.id}>
              <div>
                <span className="tag">{item.cefr ?? item.type}</span>
                <h3>{item.term}</h3>
                <p>{item.shortMeaning}</p>
              </div>
              <Link
                className="btn btn-primary"
                to={`/vocabulary/${encodeURIComponent(item.id)}/practice`}
              >
                <Play size={16} /> Luyện ngay
              </Link>
            </article>
          ))}
        </div>
      </section>
      <div className="vocabulary-dashboard">
        <section className="card vocabulary-stat-card">
          <BookOpen />
          <b>{vocabulary.length}</b>
          <span>Từ đã thêm</span>
        </section>
        <section className="card vocabulary-stat-card">
          <Target />
          <b>{practiced.length}</b>
          <span>Từ đã luyện</span>
        </section>
        <section className="card vocabulary-stat-card">
          <TrendingUp />
          <b>{attempts ? Math.round((firstTry / attempts) * 100) : 0}%</b>
          <span>Đúng lần đầu</span>
        </section>
        <section className="card vocabulary-stat-card">
          <Clock3 />
          <b>{due.length}</b>
          <span>Đến hạn ôn</span>
        </section>
      </div>
      {due.length > 0 && (
        <>
          <div className="section-heading">
            <h2>Đến hạn hôm nay</h2>
            <span>{due.length} từ</span>
          </div>
          <div className="vocabulary-list">
            {due.map(({ item, progress }) => (
              <VocabularyRow
                key={item.id}
                item={item}
                mastery={progress.mastery}
                favorite={progress.favorite}
              />
            ))}
          </div>
        </>
      )}
      {weak.length > 0 && (
        <>
          <div className="section-heading">
            <h2>Từ cần củng cố</h2>
            <span>Dựa trên cách dùng từ mục tiêu</span>
          </div>
          <div className="vocabulary-list">
            {weak.map(({ item, progress }) => (
              <VocabularyRow
                key={item.id}
                item={item}
                mastery={progress.mastery}
                favorite={progress.favorite}
              />
            ))}
          </div>
        </>
      )}
      <div className="section-heading">
        <h2>Sổ từ của tôi</h2>
        <Link className="text-link" to="/vocabulary/custom">
          <Plus size={15} /> + Thêm từ mới
        </Link>
      </div>
      <div className="tab-list" role="tablist">
        {(['all', 'new', 'learning', 'familiar', 'strong', 'mastered', 'favorite'] as const).map(
          (item) => (
            <button
              role="tab"
              aria-selected={filter === item}
              className={filter === item ? 'active' : ''}
              onClick={() => setFilter(item)}
              key={item}
            >
              {
                {
                  all: 'Tất cả',
                  new: 'Mới',
                  learning: 'Đang học',
                  familiar: 'Quen thuộc',
                  strong: 'Vững',
                  mastered: 'Đã làm chủ',
                  favorite: 'Yêu thích',
                }[item]
              }
            </button>
          ),
        )}
      </div>
      {notebook.length ? (
        <div className="vocabulary-list notebook-list">
          {notebook.map(({ item, progress }) => (
            <VocabularyRow
              key={item.id}
              item={item}
              mastery={progress.mastery}
              favorite={progress.favorite}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={BookOpen}
          title="Sổ từ vựng đang trống"
          text="Tìm một từ ở trên hoặc học hội thoại để thêm từ đầu tiên."
        />
      )}
    </div>
  );
}

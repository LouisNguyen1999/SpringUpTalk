import { ChevronRight, Clock3, Code2, Feather, Heart, LockKeyhole, Route, Search, Sparkles, Zap } from 'lucide-react';
import { useDeferredValue, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { writingManifest } from '../data/writing/writing-repository';
import {
  buildWritingPathState,
  continueWritingRecommendation,
  writingLevelProgress,
  writingLearningMetadata,
  WRITING_SKILL_LABELS,
} from '../engine/writing-learning-path';
import { useProgressStore } from '../store/progress-store';
import type { Difficulty, WritingDomain, WritingPathPreference, WritingTopicSummary } from '../types/domain';
import { normalizeSearchText } from '../utils/search';

function topicHref(topic: WritingTopicSummary, session = 'browse', unitId?: string) {
  const unit = unitId ? `&unit=${unitId}` : '';
  return `/writing/${encodeURIComponent(topic.id)}?session=${session}${unit}`;
}

const CONTINUE_LABEL = {
  draft: 'Bản nháp đang chờ bạn hoàn thành',
  'due-review': 'Bài đến hạn ôn được ưu tiên',
  'weak-skill': 'Bài củng cố kỹ năng còn yếu',
  'next-path-topic': 'Bài tiếp theo trong lộ trình',
} as const;

const PATH_FILTERS: Array<{ value: WritingPathPreference; label: string }> = [
  { value: 'all', label: 'Toàn bộ lộ trình' },
  { value: 'daily-life', label: 'Daily Writing Path' },
  { value: 'it-work', label: 'IT Writing Path' },
];

export default function WritingPage() {
  const store = useProgressStore();
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState<'all' | WritingDomain>('all');
  const [level, setLevel] = useState<'all' | Difficulty>('all');
  const [status, setStatus] = useState<'all' | 'completed' | 'weak' | 'favorite'>('all');
  const deferredQuery = useDeferredValue(query);
  const [now] = useState(() => new Date());
  const metadataByTopic = useMemo(() => new Map(writingLearningMetadata.map((item) => [item.topicId, item])), []);
  const due = Object.values(store.writingProgress)
    .filter((item) => item.attempts.length > 0 && Date.parse(item.nextReviewAt) <= now.getTime())
    .map((item) => item.topicId);
  const weak = Object.values(store.writingProgress)
    .filter((item) => item.attempts.length > 0 && item.mastery !== 'mastered' && item.bestAttempt && item.bestAttempt.meaningCoverage < 0.8)
    .map((item) => item.topicId);
  const recommendation = continueWritingRecommendation(store, now);
  const pathState = buildWritingPathState(store);
  const currentUnit = pathState.find((item) => item.current);
  const dailyFirst = writingManifest.find((item) => item.domain === 'daily-life');
  const itFirst = writingManifest.find((item) => item.domain === 'it-work');
  const quickFirst = writingManifest[0];
  const reviewFirst = writingManifest.find((item) => due.includes(item.id));
  const dueTopics = writingManifest.filter((item) => due.includes(item.id)).slice(0, 6);
  const weakTopics = writingManifest.filter((item) => weak.includes(item.id)).slice(0, 6);

  const filtered = useMemo(() => {
    const search = normalizeSearchText(deferredQuery);
    return writingManifest.filter((topic) => {
      const progress = store.writingProgress[topic.id];
      const pathMetadata = metadataByTopic.get(topic.id);
      const searchable = normalizeSearchText([
        topic.titleEnglish,
        topic.titleVietnamese,
        topic.category,
        ...topic.keywords,
        ...(pathMetadata?.skills.map((skill) => WRITING_SKILL_LABELS[skill]) ?? []),
      ].join(' '));
      return (
        (!search || searchable.includes(search)) &&
        (domain === 'all' || topic.domain === domain) &&
        (level === 'all' || topic.level === level) &&
        (status === 'all' ||
          (status === 'completed' && progress?.mastery === 'mastered') ||
          (status === 'weak' && weak.includes(topic.id)) ||
          (status === 'favorite' && progress?.favorite))
      );
    });
  }, [deferredQuery, domain, level, metadataByTopic, status, store.writingProgress, weak]);

  const selectPath = (preference: WritingPathPreference) => {
    store.setWritingPathPreference(preference);
    store.setWritingCurrentUnit(undefined);
  };

  return (
    <div className="page writing-home">
      <p className="eyebrow">Vietnamese meaning → natural English</p>
      <h1>Writing Practice</h1>
      <p className="subhead">Đi từ sự việc đơn giản đến giải thích nguyên nhân, vấn đề, risk và tradeoff. Nội dung tiếng Việt vẫn là nguồn ý duy nhất được chấm.</p>

      {recommendation && <section className="card writing-continue">
        <div>
          <span className="pill">Tiếp tục học · {CONTINUE_LABEL[recommendation.reason]}</span>
          <h2>{recommendation.unit.titleVietnamese}</h2>
          <p>{recommendation.topic.titleVietnamese}{recommendation.weakSkill ? ` · ${WRITING_SKILL_LABELS[recommendation.weakSkill]}` : ''}</p>
        </div>
        <Link className="btn btn-primary" to={topicHref(recommendation.topic, recommendation.reason === 'due-review' ? 'review' : 'path', recommendation.unit.id)}>Tiếp tục luyện viết</Link>
      </section>}

      <section className="writing-path-section" aria-labelledby="writing-path-heading">
        <div className="section-heading"><div><p className="eyebrow">Recommended progression</p><h2 id="writing-path-heading">Lộ trình Writing</h2></div><span>24 units · 500 topics</span></div>
        <div className="writing-path-filters" role="group" aria-label="Chọn Writing Path">
          {PATH_FILTERS.map((item) => <button className={store.writingPathPreference === item.value ? 'active' : ''} onClick={() => selectPath(item.value)} key={item.value}>{item.label}</button>)}
        </div>

        {currentUnit && <article className="card writing-current-unit">
          <div className="writing-current-unit-icon"><Route /></div>
          <div><span>{currentUnit.unit.level} · UNIT {currentUnit.unit.order}</span><h2>{currentUnit.unit.title} — {currentUnit.unit.titleVietnamese}</h2><p>{currentUnit.unit.goal}</p><div className="writing-path-progress"><span style={{ width: `${currentUnit.progress.percent}%` }} /></div><small>{currentUnit.progress.completed}/{currentUnit.progress.total} bài truyền đạt tốt · cần {currentUnit.progress.requiredCompleted} bài để mở chặng kế</small></div>
          <Link className="btn btn-primary" to={`/writing/path/${currentUnit.unit.id}`}>Mở unit <ChevronRight size={17} /></Link>
        </article>}

        <div className="writing-level-paths">
          {(['A1', 'A2', 'B1', 'B2'] as const).map((item) => {
            const progress = writingLevelProgress(item, store);
            const units = pathState.filter((state) => state.unit.level === item);
            return <article className="card writing-level-path" key={item}>
              <header><div><b>{item}</b><span>{progress.completed}/{progress.total} topics</span></div><strong>{progress.percent}%</strong></header>
              <div className="writing-path-progress"><span style={{ width: `${progress.percent}%` }} /></div>
              <div className="writing-unit-links">{units.map((state) => <Link className={`${state.current ? 'current' : ''} ${!state.recommendedUnlocked ? 'recommended-locked' : ''}`} to={`/writing/path/${state.unit.id}`} key={state.unit.id}>{state.completed ? <Sparkles size={15} /> : !state.recommendedUnlocked ? <LockKeyhole size={15} /> : <span>{state.unit.order}</span>}<span>{state.unit.titleVietnamese}<small>{state.progress.completed}/{state.progress.total}</small></span><ChevronRight size={15} /></Link>)}</div>
            </article>;
          })}
        </div>
        <p className="writing-soft-lock-note"><LockKeyhole size={15} /> Biểu tượng khóa chỉ là thứ tự được đề xuất. Bạn luôn có thể mở mọi unit hoặc dùng Free Browse.</p>
      </section>

      <div className="section-heading"><h2>Chế độ luyện tập</h2></div>
      <section className="writing-mode-grid" aria-label="Chế độ luyện viết">
        {dailyFirst && <Link className="card writing-mode-card" to={topicHref(dailyFirst, 'daily')}><Feather /><b>Daily Writing</b><span>5 tình huống giao tiếp hằng ngày</span></Link>}
        {itFirst && <Link className="card writing-mode-card" to={topicHref(itFirst, 'it')}><Code2 /><b>IT Writing</b><span>5 tình huống IT và công việc</span></Link>}
        {quickFirst && <Link className="card writing-mode-card" to={topicHref(quickFirst, 'quick')}><Zap /><b>Quick Practice</b><span>3 prompts để luyện nhanh</span></Link>}
        {reviewFirst ? <Link className="card writing-mode-card" to={topicHref(reviewFirst, 'review')}><Clock3 /><b>Review Mistakes</b><span>{due.length} topic đến hạn</span></Link> : <div className="card writing-mode-card disabled"><Clock3 /><b>Review Mistakes</b><span>Chưa có topic đến hạn</span></div>}
      </section>

      <section className="writing-stats" aria-label="Tiến độ Writing">
        <div className="card"><Sparkles /><b>{Object.keys(store.writingProgress).length}</b><span>đã luyện</span></div>
        <div className="card"><Clock3 /><b>{due.length}</b><span>đến hạn</span></div>
        <div className="card"><Heart /><b>{Object.values(store.writingProgress).filter((item) => item.favorite).length}</b><span>yêu thích</span></div>
        <div className="card"><Feather /><b>{writingManifest.length}</b><span>topics</span></div>
      </section>

      {(dueTopics.length > 0 || weakTopics.length > 0) && <section className="writing-focus-groups">
        {dueTopics.length > 0 && <div className="card"><h2>Due for Review</h2><div>{dueTopics.map((topic) => <Link className="tag" to={topicHref(topic, 'review')} key={topic.id}>{topic.titleVietnamese}</Link>)}</div></div>}
        {weakTopics.length > 0 && <div className="card"><h2>Weak Topics</h2><div>{weakTopics.map((topic) => <Link className="tag" to={topicHref(topic, 'review')} key={topic.id}>{topic.titleVietnamese}</Link>)}</div></div>}
      </section>}

      <section className="card writing-toolbar">
        <div className="section-heading"><div><p className="eyebrow">Learn without locks</p><h2>Free Browse</h2></div><span>{filtered.length} topics</span></div>
        <label className="search-box"><Search size={19} /><span className="sr-only">Tìm Writing topic</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm tình huống, skill, category hoặc từ khóa…" /></label>
        <div className="filters">
          <select className="select" aria-label="Writing domain" value={domain} onChange={(event) => setDomain(event.target.value as typeof domain)}><option value="all">Daily + IT</option><option value="daily-life">Daily Communication</option><option value="it-work">IT Communication</option></select>
          <select className="select" aria-label="Writing level" value={level} onChange={(event) => setLevel(event.target.value as typeof level)}><option value="all">A1–B2</option>{(['A1', 'A2', 'B1', 'B2'] as const).map((item) => <option key={item}>{item}</option>)}</select>
          <select className="select" aria-label="Writing status" value={status} onChange={(event) => setStatus(event.target.value as typeof status)}><option value="all">Tất cả trạng thái</option><option value="completed">Mastered</option><option value="weak">Weak topics</option><option value="favorite">Favorite</option></select>
        </div>
      </section>

      <div className="writing-topic-grid">
        {filtered.slice(0, 80).map((topic) => {
          const progress = store.writingProgress[topic.id];
          const pathMetadata = metadataByTopic.get(topic.id);
          return <article className="card writing-topic-card" key={topic.id}>
            <button className={`icon-btn ${progress?.favorite ? 'active' : ''}`} aria-label={`${progress?.favorite ? 'Bỏ yêu thích' : 'Yêu thích'} ${topic.titleVietnamese}`} onClick={() => store.toggleWritingFavorite(topic.id)}><Heart size={18} fill={progress?.favorite ? 'currentColor' : 'none'} /></button>
            <div><span className="tag level-tag">{topic.level}</span><span className="tag">{topic.domain === 'it-work' ? 'IT' : 'Daily'}</span></div>
            <h2>{topic.titleEnglish}</h2><p>{topic.titleVietnamese}</p>
            <small>{topic.category} · {progress?.mastery ?? 'new'} · Difficulty {pathMetadata?.difficultyScore.toFixed(1)}</small>
            <Link className="btn btn-secondary" to={topicHref(topic)}>Luyện viết</Link>
          </article>;
        })}
      </div>
    </div>
  );
}

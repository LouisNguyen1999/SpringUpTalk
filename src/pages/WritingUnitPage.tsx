import { ArrowLeft, CheckCircle2, ChevronRight, LockKeyhole, Target } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  buildWritingPathState,
  topicsForWritingUnit,
  unitUnlockExplanation,
  writingLearningMetadata,
  writingLearningUnits,
  writingTopicState,
  WRITING_SKILL_LABELS,
} from '../engine/writing-learning-path';
import { useProgressStore } from '../store/progress-store';

const STATE_LABEL: Record<ReturnType<typeof writingTopicState>, string> = {
  New: 'Mới',
  'In Progress': 'Đang học',
  'Review Due': 'Cần ôn',
  Strong: 'Vững',
  Mastered: 'Thành thạo',
};

export default function WritingUnitPage() {
  const { unitId = '' } = useParams();
  const store = useProgressStore();
  const setWritingCurrentUnit = store.setWritingCurrentUnit;
  const [now] = useState(() => new Date());
  const unit = writingLearningUnits.find((item) => item.id === unitId);
  const preference = store.writingPathPreference;
  const topics = unit ? topicsForWritingUnit(unit.id, preference) : [];
  const metadata = useMemo(() => new Map(writingLearningMetadata.map((item) => [item.topicId, item])), []);
  const pathState = buildWritingPathState(store, preference).find((item) => item.unit.id === unitId);

  useEffect(() => {
    if (unit) setWritingCurrentUnit(unit.id);
  }, [setWritingCurrentUnit, unit]);

  if (!unit || !pathState) {
    return <div className="page writing-not-found"><h1>Không tìm thấy Writing Unit</h1><Link className="btn btn-primary" to="/writing">Về Writing</Link></div>;
  }

  const prerequisite = unit.prerequisiteUnitId
    ? writingLearningUnits.find((item) => item.id === unit.prerequisiteUnitId)
    : undefined;

  return <div className="page writing-unit-page">
    <Link className="back-link" to="/writing"><ArrowLeft size={18} /> Về Writing Path</Link>
    <header className="card writing-unit-hero">
      <div>
        <span className="eyebrow">{unit.level} · UNIT {unit.order}</span>
        <h1>{unit.title}</h1>
        <p>{unit.titleVietnamese}</p>
      </div>
      <div className="writing-unit-score"><b>{pathState.progress.completed}/{pathState.progress.total}</b><span>bài truyền đạt tốt</span></div>
    </header>

    {!pathState.recommendedUnlocked && <div className="writing-path-notice" role="note">
      <LockKeyhole size={19} />
      <div><b>Unit này chưa nằm trong chặng được đề xuất.</b><p>Bạn vẫn có thể học tự do. Hãy củng cố {prerequisite?.titleVietnamese ?? 'unit trước'} để đi đúng lộ trình.</p></div>
    </div>}

    <section className="writing-unit-overview">
      <article className="card"><Target /><div><h2>Mục tiêu</h2><p>{unit.goal}</p></div></article>
      <article className="card"><h2>Kỹ năng</h2><div className="writing-skill-list">{unit.targetSkills.map((skill) => <span className="tag" key={skill}>{WRITING_SKILL_LABELS[skill]}</span>)}</div></article>
      <article className="card"><h2>Vocabulary focus</h2><p>{unit.vocabularyFocus.join(' · ')}</p><h2>Target structures</h2><p>{unit.targetStructures.join(' · ')}</p></article>
    </section>

    <section className="card writing-unit-progress-card">
      <div><h2>Tiến độ unit</h2><span>{pathState.progress.percent}%</span></div>
      <div className="writing-path-progress"><span style={{ width: `${pathState.progress.percent}%` }} /></div>
      <p>{unitUnlockExplanation(pathState.progress)}</p>
      {pathState.completed && <strong><CheckCircle2 size={17} /> Đã đủ điều kiện chuyển sang unit tiếp theo.</strong>}
    </section>

    <div className="section-heading"><h2>Topics</h2><span>{topics.length} bài · {preference === 'all' ? 'Daily + IT' : preference === 'daily-life' ? 'Daily Path' : 'IT Path'}</span></div>
    <div className="writing-unit-topics">
      {topics.map((topic, index) => {
        const progress = store.writingProgress[topic.id];
        const state = writingTopicState(topic.id, progress, Boolean(store.writingDrafts[topic.id]), now);
        const item = metadata.get(topic.id);
        return <Link className="card writing-unit-topic" to={`/writing/${encodeURIComponent(topic.id)}?session=path&unit=${unit.id}`} key={topic.id}>
          <span className="writing-topic-number">{index + 1}</span>
          <div><small>{topic.level} · {topic.domain === 'it-work' ? 'IT' : 'DAILY'} · {topic.writingType === 'story' ? 'STORY' : 'PROBLEM'}</small><h3>{topic.titleEnglish}</h3><p>{topic.titleVietnamese}</p><div className="writing-skill-list">{item?.skills.slice(0, 3).map((skill) => <span key={skill}>{WRITING_SKILL_LABELS[skill]}</span>)}</div></div>
          <div className={`writing-topic-state state-${state.toLowerCase().replaceAll(' ', '-')}`}><span>{STATE_LABEL[state]}</span><small>Difficulty {item?.difficultyScore.toFixed(1)}</small></div>
          <ChevronRight />
        </Link>;
      })}
    </div>
  </div>;
}

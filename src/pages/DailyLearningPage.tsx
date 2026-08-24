import {
  ArrowRight,
  BookHeart,
  Check,
  FilePenLine,
  MessageCircleMore,
  RefreshCcw,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { topicManifest } from '../data/content-repository';
import { vocabularyIndex } from '../data/vocabulary/vocabulary-repository';
import { writingManifest } from '../data/writing/writing-repository';
import { writingLearningMetadata } from '../engine/writing-learning-path';
import {
  buildDailyLearningSession,
  dailySessionCounts,
} from '../engine/daily-learning';
import { useProgressStore } from '../store/progress-store';
import type {
  DailyLearningFocus,
  DailyLearningHistoryEntry,
  DailyLearningItem,
  DailyLearningMode,
  DailyLearningPreferences,
} from '../types/domain';
import { localDateKey } from '../utils/local-date';

const catalog = {
  conversations: topicManifest,
  vocabulary: vocabularyIndex,
  writing: writingManifest,
  writingPath: writingLearningMetadata,
};

const MODE_LABELS: Record<DailyLearningMode, { title: string; detail: string }> = {
  quick: { title: 'Quick', detail: '~10 phút' },
  standard: { title: 'Standard', detail: '~20 phút' },
  focus: { title: 'Focus', detail: '~30 phút' },
};

const FOCUS_LABELS: Record<DailyLearningFocus, string> = {
  balanced: 'Balanced',
  conversation: 'Conversation',
  vocabulary: 'Vocabulary',
  writing: 'Writing',
};

const KIND_LABELS = {
  conversation: 'Conversation',
  vocabulary: 'Vocabulary',
  writing: 'Writing',
  review: 'Ôn lỗi cũ',
} as const;

function itemLabel(item: DailyLearningItem): { title: string; detail: string } {
  if (item.target === 'conversation') {
    const topic = topicManifest.find((candidate) => candidate.id === item.topicId);
    return {
      title: topic?.titleVi ?? item.topicId ?? 'Conversation',
      detail: `Person ${item.role} · ${item.reason === 'missing-role' ? 'hoàn thành vai còn thiếu' : KIND_LABELS[item.kind]}`,
    };
  }
  if (item.target === 'vocabulary') {
    const vocabulary = vocabularyIndex.find((candidate) => candidate.id === item.vocabularyId);
    return {
      title: vocabulary?.term ?? item.vocabularyId ?? 'Vocabulary',
      detail: item.reason === 'due-review' || item.reason === 'repeated-mistake'
        ? 'Đến hạn ôn'
        : 'Vietnamese → English',
    };
  }
  const writing = writingManifest.find((candidate) => candidate.id === item.writingTopicId);
  return {
    title: writing?.titleVietnamese ?? item.writingTopicId ?? 'Writing',
    detail: `${writing?.level ?? ''} · ${item.reason === 'weak-mastery' || item.reason === 'weak-skill' ? 'củng cố kỹ năng còn yếu' : KIND_LABELS[item.kind]}`,
  };
}

function itemPath(item: DailyLearningItem): string {
  const daily = `dailyItem=${encodeURIComponent(item.id)}`;
  if (item.target === 'conversation') {
    return `/lesson/${item.topicId}/${item.conversationId}?role=${item.role}&${daily}`;
  }
  if (item.target === 'vocabulary') {
    return `/vocabulary/${encodeURIComponent(item.vocabularyId ?? '')}/practice?mode=quick&daily=1&${daily}`;
  }
  return `/writing/${encodeURIComponent(item.writingTopicId ?? '')}?session=browse&${daily}`;
}

function ItemIcon({ item }: { item: DailyLearningItem }) {
  if (item.kind === 'review') return <RotateCcw />;
  if (item.target === 'conversation') return <MessageCircleMore />;
  if (item.target === 'vocabulary') return <BookHeart />;
  return <FilePenLine />;
}

function DailyHistory({ entries }: { entries: DailyLearningHistoryEntry[] }) {
  if (!entries.length) return null;
  return <section className="daily-history"><div className="section-heading"><h2>7 ngày gần đây</h2><span>Dữ liệu hoạt động thật</span></div><div className="daily-history-grid">{entries.slice(-7).reverse().map((entry) => <article className="card" key={entry.date}><small>{entry.date}</small><b>{entry.completed} / {entry.planned}</b><span>{entry.status === 'completed' ? 'Hoàn thành' : 'Đang học'} · +{entry.xpEarned} XP</span></article>)}</div></section>;
}

export default function DailyLearningPage() {
  const store = useProgressStore();
  const navigate = useNavigate();
  const today = localDateKey();
  const session = store.dailyLearningSession?.date === today ? store.dailyLearningSession : undefined;

  useEffect(() => {
    if (session) return;
    const state = useProgressStore.getState();
    store.saveDailyLearningSession(
      buildDailyLearningSession(state, state.dailyLearningPreferences, catalog),
    );
  }, [session, store]);

  const counts = useMemo(() => dailySessionCounts(session?.items ?? []), [session?.items]);
  const completedItems = useMemo(
    () => session?.items.filter((item) => item.status === 'completed') ?? [],
    [session?.items],
  );
  const completedCounts = useMemo(() => dailySessionCounts(completedItems), [completedItems]);
  const firstTry = completedItems.filter((item) => item.result?.firstTryCorrect !== undefined);
  const recurring = Array.from(
    new Set(completedItems.flatMap((item) => item.result?.weaknessTypes ?? [])),
  ).slice(0, 4);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowKey = localDateKey(tomorrow);
  const tomorrowReviews = [
    ...store.vocabulary.map((item) => item.nextReviewAt),
    ...Object.values(store.writingProgress).map((item) => item.nextReviewAt),
    ...store.mistakes.map((item) => store.sentenceProgress[item.turnId]?.nextReviewAt),
  ].filter((value) => value && localDateKey(new Date(value)) === tomorrowKey).length;
  const todayHistory = store.dailyLearningHistory.find((item) => item.date === today);

  const regenerate = (preferences: DailyLearningPreferences) => {
    const state = useProgressStore.getState();
    store.saveDailyLearningSession(buildDailyLearningSession(state, preferences, catalog), true);
  };
  const changeMode = (mode: DailyLearningMode) => {
    const preferences = { ...store.dailyLearningPreferences, mode };
    store.setDailyLearningPreferences({ mode });
    regenerate(preferences);
  };
  const changeFocus = (focus: DailyLearningFocus) => {
    const preferences = { ...store.dailyLearningPreferences, focus };
    store.setDailyLearningPreferences({ focus });
    regenerate(preferences);
  };
  const openItem = (item: DailyLearningItem) => {
    store.startDailyLearningItem(item.id);
    navigate(itemPath(item));
  };

  if (!session) return <div className="page-loader" role="status">Đang tạo kế hoạch hôm nay…</div>;

  if (session.status === 'completed') {
    const mastered = completedItems.filter((item) => item.result?.vocabularyMastered).length;
    const strongWriting = completedItems.filter((item) => item.result?.writingStatus === 'communicates-well').length;
    return (
      <div className="page daily-page daily-summary-page">
        <div className="daily-complete-mark"><Check /></div>
        <p className="eyebrow">Daily Practice Complete</p>
        <h1>Hôm nay bạn đã luyện rất đều.</h1>
        <p className="subhead">Kết quả dưới đây chỉ dùng dữ liệu thật từ các hoạt động vừa hoàn thành.</p>
        <section className="daily-summary-grid" aria-label="Tổng kết hôm nay">
          {(Object.keys(completedCounts) as Array<keyof typeof completedCounts>).map((kind) => (
            <div className="card" key={kind}><b>{completedCounts[kind]}</b><span>{KIND_LABELS[kind]}</span></div>
          ))}
        </section>
        <section className="card daily-insights">
          <h2>Kết quả</h2>
          <p>First-try correct: <b>{firstTry.length ? Math.round(firstTry.filter((item) => item.result?.firstTryCorrect).length / firstTry.length * 100) : 0}%</b></p>
          <p>Vocabulary mastered: <b>{mastered}</b></p>
          <p>Writing communicates-well: <b>{strongWriting}</b></p>
          <p>XP trong phiên: <b>+{todayHistory?.xpEarned ?? Math.max(0, store.xp - session.xpAtStart)}</b></p>
          {recurring.length > 0 && <><h3>Nên chú ý</h3><div className="daily-focus-tags">{recurring.map((item) => <span className="tag" key={item}>{item}</span>)}</div></>}
          <p>Ngày mai dự kiến: <b>{tomorrowReviews} mục cần ôn</b></p>
        </section>
        <button className="btn btn-secondary" onClick={() => regenerate(store.dailyLearningPreferences)}><RefreshCcw size={17} /> Tạo lại buổi học</button>
        <DailyHistory entries={store.dailyLearningHistory} />
      </div>
    );
  }

  const nextItem = session.items.find((item) => item.id === session.currentItemId && item.status === 'pending')
    ?? session.items.find((item) => item.status === 'pending');
  return (
    <div className="page daily-page">
      <header className="daily-heading">
        <div><p className="eyebrow">Kế hoạch hôm nay</p><h1>Luyện tập hôm nay</h1><p className="subhead">Ưu tiên bài đến hạn và kỹ năng đang yếu, sau đó mới thêm nội dung mới.</p></div>
        <div className="daily-estimate"><Sparkles /><span>Thời gian dự kiến</span><b>~{session.estimatedMinutes} phút</b></div>
      </header>

      <section className="card daily-controls" aria-label="Tùy chọn buổi học">
        <div><b>Mục tiêu</b><div className="daily-choice-row">{(Object.keys(MODE_LABELS) as DailyLearningMode[]).map((mode) => <button className={store.dailyLearningPreferences.mode === mode ? 'selected' : ''} onClick={() => changeMode(mode)} key={mode}><b>{MODE_LABELS[mode].title}</b><small>{MODE_LABELS[mode].detail}</small></button>)}</div></div>
        <div><b>Ưu tiên</b><div className="daily-choice-row focus">{(Object.keys(FOCUS_LABELS) as DailyLearningFocus[]).map((focus) => <button className={store.dailyLearningPreferences.focus === focus ? 'selected' : ''} onClick={() => changeFocus(focus)} key={focus}>{FOCUS_LABELS[focus]}</button>)}</div></div>
      </section>

      <section className="daily-plan-card card">
        <div className="daily-plan-header"><div><h2>Buổi học của bạn</h2><p>{completedItems.length} / {session.items.length} hoạt động</p></div><div className="progress-track" role="progressbar" aria-label={`${completedItems.length} trên ${session.items.length} hoạt động đã hoàn thành`} aria-valuemin={0} aria-valuemax={session.items.length} aria-valuenow={completedItems.length}><span style={{ width: `${session.items.length ? completedItems.length / session.items.length * 100 : 0}%` }} /></div></div>
        <div className="daily-counts">{(Object.keys(counts) as Array<keyof typeof counts>).filter((kind) => counts[kind] > 0).map((kind) => <span key={kind}><b>{counts[kind]}</b> {KIND_LABELS[kind]}</span>)}</div>
        {counts.review > 0 && <p className="daily-due-note">Có {counts.review} mục đến hạn hoặc lỗi lặp lại được ưu tiên trong phiên này.</p>}
        {nextItem && <button className="btn btn-primary daily-start" onClick={() => openItem(nextItem)}>{session.status === 'not-started' ? 'Bắt đầu học' : 'Tiếp tục buổi học'} <ArrowRight size={18} /></button>}
      </section>

      <section className="daily-item-list" aria-labelledby="daily-list-title">
        <div className="section-heading"><h2 id="daily-list-title">Lộ trình</h2><button className="text-button" onClick={() => regenerate(store.dailyLearningPreferences)}><RefreshCcw size={15} /> Tạo lại</button></div>
        {session.items.map((item, index) => {
          const label = itemLabel(item);
          return <article className={`card daily-item ${item.kind} ${item.status}`} key={item.id}><span className="daily-item-number">{item.status === 'completed' ? '✓' : item.status === 'skipped' ? '—' : index + 1}</span><span className={`daily-item-icon ${item.kind}`}><ItemIcon item={item} /></span><div><small>{KIND_LABELS[item.kind]} · {item.reason.replaceAll('-', ' ')}</small><b>{label.title}</b><span>{label.detail}</span></div><div className="daily-item-actions">{item.status !== 'completed' && <><button className="btn btn-ghost" onClick={() => store.skipDailyLearningItem(item.id)}>Bỏ qua</button><button className="icon-btn" aria-label={`Mở ${label.title}`} onClick={() => openItem(item)}><ArrowRight /></button></>}</div></article>;
        })}
      </section>
      <DailyHistory entries={store.dailyLearningHistory} />
    </div>
  );
}

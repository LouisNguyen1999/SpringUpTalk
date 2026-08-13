import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  Lightbulb,
  RefreshCw,
  Target,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ProgressBar } from '../components/common/ProgressBar';
import { vocabularyRepository } from '../data/vocabulary/vocabulary-repository';
import {
  activeVocabularyPracticeItems,
  mergeVocabularyPracticeBank,
} from '../data/vocabulary/vocabulary-practice-bank';
import {
  evaluateVocabularyAnswer,
  type VocabularyEvaluation,
} from '../engine/vocabulary-evaluator';
import { useProgressStore } from '../store/progress-store';
import type { VocabularyEntry, VocabularyPracticeItem } from '../types/domain';

type Mode = 'quick' | 'standard' | 'master';

function initials(answer: string) {
  return answer
    .split(/(\s+)/)
    .map((token) =>
      /^\p{L}/u.test(token)
        ? `${token[0]}${'_'.repeat(Math.max(1, token.replace(/[^\p{L}]/gu, '').length - 1))}${token.match(/[^\p{L}]+$/u)?.[0] ?? ''}`
        : token,
    )
    .join('');
}

function VocabularyFeedback({
  evaluation,
  item,
  onRetry,
  onNext,
  canContinue,
}: {
  evaluation: VocabularyEvaluation;
  item: VocabularyPracticeItem;
  onRetry: () => void;
  onNext: () => void;
  canContinue: boolean;
}) {
  const targetMissing = evaluation.status === 'acceptable-meaning';
  const success = evaluation.status === 'correct-target';
  return (
    <section
      className={`vocabulary-feedback ${success ? 'success' : targetMissing ? 'target-missing' : 'error'}`}
      role="status"
      aria-live="polite"
    >
      <header>
        {success ? <CheckCircle2 /> : <Target />}
        <div>
          <h2>
            {success
              ? 'Dùng từ mục tiêu chính xác!'
              : targetMissing
                ? 'Đúng ý, hãy dùng cụm mục tiêu'
                : 'Chưa đúng lắm'}
          </h2>
          <span>{success ? '+5 XP' : targetMissing ? '+2 XP' : 'Thử lại không giới hạn'}</span>
        </div>
      </header>
      <div className="answer-confirm">
        <small>CÂU CỦA BẠN</small>
        <p>{evaluation.result.userAnswer}</p>
      </div>
      {targetMissing && (
        <div className="target-reminder">
          <b>Câu của bạn truyền đạt đúng ý.</b>
          <p>
            Bài này đang luyện: <mark>{item.targetExpressions.join(' / ')}</mark>
          </p>
          <p>Thử: {item.canonicalAnswer}</p>
        </div>
      )}
      {!success && !targetMissing && evaluation.result.revealCanonical && (
        <div className="better-answer">
          <small>CÁCH VIẾT TỐT HƠN</small>
          <p>{item.canonicalAnswer}</p>
        </div>
      )}
      <div className="why-block">
        <b>Vì sao?</b>
        {evaluation.result.explanation.map((line) => (
          <p key={line}>{line}</p>
        ))}
        {evaluation.result.mistakes.map((mistake) => (
          <div className="mistake-item" key={`${mistake.type}-${mistake.correction}`}>
            <span>{mistake.type}</span>
            <p>{mistake.explanation}</p>
          </div>
        ))}
      </div>
      {evaluation.result.naturalAlternatives.length > 0 && (
        <div className="natural-answer">
          <div>
            <small>CÁCH NÓI TỰ NHIÊN</small>
            <p>{evaluation.result.naturalAlternatives[0]}</p>
            {evaluation.result.naturalAlternatives.length > 1 && (
              <details>
                <summary>
                  Xem thêm {evaluation.result.naturalAlternatives.length - 1} cách nói
                </summary>
                {evaluation.result.naturalAlternatives.slice(1).map((answer) => (
                  <p key={answer}>{answer}</p>
                ))}
              </details>
            )}
          </div>
        </div>
      )}
      <div className="vocabulary-feedback-actions">
        {!success && (
          <button className="btn btn-secondary" onClick={onRetry}>
            <RefreshCw size={16} /> Thử lại
          </button>
        )}
        {canContinue && (
          <button className="btn btn-primary" onClick={onNext}>
            Tiếp tục <ArrowRight size={16} />
          </button>
        )}
      </div>
    </section>
  );
}

export default function VocabularyPracticePage() {
  const { vocabularyId = '' } = useParams();
  const id = decodeURIComponent(vocabularyId);
  const [params, setParams] = useSearchParams();
  const {
    customVocabulary,
    customVocabularyPractice,
    disabledVocabularyPracticeIds,
    vocabulary,
    addVocabulary,
    recordVocabularyPractice,
  } = useProgressStore();
  const [loaded, setLoaded] = useState<{
    id: string;
    entry?: VocabularyEntry;
    items: VocabularyPracticeItem[];
  }>({ id: '', items: [] });
  const [mode, setMode] = useState<Mode>((params.get('mode') as Mode) || 'quick');
  const [started, setStarted] = useState(false);
  const [position, setPosition] = useState(0);
  const [answer, setAnswer] = useState('');
  const [attempt, setAttempt] = useState(1);
  const [hintLevel, setHintLevel] = useState(0);
  const [evaluation, setEvaluation] = useState<VocabularyEvaluation>();
  const [shownAnswer, setShownAnswer] = useState(false);
  const [targetStreak, setTargetStreak] = useState(0);
  const [stats, setStats] = useState({ attempts: 0, firstTry: 0, target: 0, meaning: 0 });
  const requestedSense = params.get('sense') || undefined;
  useEffect(() => {
    let active = true;
    const custom = customVocabulary.find((item) => item.id === id);
    Promise.all([
      custom ? Promise.resolve(custom) : vocabularyRepository.getById(id),
      custom ? Promise.resolve([]) : vocabularyRepository.getPracticeItems(id, requestedSense),
    ]).then(([word, staticPractice]) => {
      if (active) {
        const localPractice = customVocabularyPractice.filter(
          (item) =>
            item.vocabularyId === id &&
            (requestedSense ? !item.senseId || item.senseId === requestedSense : true),
        );
        const practice = activeVocabularyPracticeItems(
          mergeVocabularyPracticeBank(staticPractice, localPractice, disabledVocabularyPracticeIds),
        );
        setLoaded({ id, entry: word, items: practice });
      }
    });
    return () => {
      active = false;
    };
  }, [
    customVocabulary,
    customVocabularyPractice,
    disabledVocabularyPracticeIds,
    id,
    requestedSense,
  ]);
  const loading = loaded.id !== id;
  const entry = loading ? undefined : loaded.entry;
  const items = loaded.items;
  const session = useMemo(
    () =>
      mode === 'quick'
        ? items.slice(0, 5)
        : mode === 'standard'
          ? [...items, ...items].slice(0, 10)
          : items,
    [items, mode],
  );
  const current = session[position % Math.max(1, session.length)];
  const targetTotal =
    mode === 'quick'
      ? Math.min(5, session.length)
      : mode === 'standard'
        ? Math.min(10, session.length)
        : 5;
  const completed =
    started &&
    ((mode === 'master' && targetStreak >= 5) || (mode !== 'master' && position >= session.length));
  const progress = vocabulary.find((item) => item.id === id);
  if (loading) return <div className="page-loader">Đang chuẩn bị bài luyện…</div>;
  if (!entry)
    return (
      <div className="page">
        <h1>Không tìm thấy từ vựng</h1>
        <Link to="/vocabulary">Quay lại</Link>
      </div>
    );
  if (!items.length)
    return (
      <div className="page vocabulary-empty-practice">
        <Link className="text-link" to={`/vocabulary/${encodeURIComponent(id)}`}>
          <ArrowLeft size={16} /> {entry.term}
        </Link>
        <h1>Chưa có bài luyện cho từ này.</h1>
        <p>
          {entry.custom
            ? 'Bạn có thể tự thêm câu tiếng Việt và đáp án tiếng Anh trong trang chi tiết.'
            : 'Từ này đã có trong từ điển nhưng chưa thuộc bộ 500 từ luyện giai đoạn đầu.'}
        </p>
        <Link className="btn btn-primary" to={`/vocabulary/${encodeURIComponent(id)}`}>
          Về trang từ vựng
        </Link>
      </div>
    );
  if (!started)
    return (
      <div className="page vocabulary-mode-page">
        <Link className="text-link" to={`/vocabulary/${encodeURIComponent(id)}`}>
          <ArrowLeft size={16} /> {entry.term}
        </Link>
        <p className="eyebrow">Vietnamese → English writing</p>
        <h1>Luyện “{entry.term}”</h1>
        <p className="subhead">
          Chọn nhịp luyện. Không có tim giới hạn và bạn luôn có thể thử lại.
        </p>
        <div className="practice-mode-grid">
          {(
            [
              { id: 'quick', title: 'Quick Practice', text: '5 câu · một lượt gọn nhẹ' },
              { id: 'standard', title: 'Standard Practice', text: '10 lượt · hai vòng truy hồi' },
              {
                id: 'master',
                title: 'Master This Word',
                text: 'Luyện đến 5 lần dùng đúng liên tiếp',
              },
            ] as const
          ).map((item) => (
            <button
              className={`card ${mode === item.id ? 'selected' : ''}`}
              onClick={() => {
                setMode(item.id);
                setParams((old) => {
                  const next = new URLSearchParams(old);
                  next.set('mode', item.id);
                  return next;
                });
              }}
              key={item.id}
            >
              <b>{item.title}</b>
              <span>{item.text}</span>
            </button>
          ))}
        </div>
        <button
          className="btn btn-primary practice-start"
          onClick={() => {
            addVocabulary(id, entry.sourceTopicIds[0]);
            setStarted(true);
          }}
        >
          Bắt đầu luyện <ArrowRight size={17} />
        </button>
      </div>
    );
  if (completed)
    return (
      <div className="page vocabulary-session-summary">
        <div className="summary-icon">
          <Target />
        </div>
        <p className="eyebrow">Practice Complete</p>
        <h1>{entry.term}</h1>
        <p>
          {mode === 'master'
            ? 'Bạn đã dùng đúng từ mục tiêu 5 lần liên tiếp.'
            : 'Bạn đã hoàn thành phiên luyện.'}
        </p>
        <div className="summary-stats">
          <div>
            <b>
              {stats.target}/{Math.max(1, stats.attempts)}
            </b>
            <span>Dùng đúng mục tiêu</span>
          </div>
          <div>
            <b>
              {stats.firstTry}/{Math.max(1, stats.attempts)}
            </b>
            <span>Đúng lần đầu</span>
          </div>
          <div>
            <b>{progress?.mastery ?? 'learning'}</b>
            <span>Mastery</span>
          </div>
        </div>
        <div className="summary-actions">
          <button
            className="btn btn-secondary"
            onClick={() => {
              setPosition(0);
              setTargetStreak(0);
              setStats({ attempts: 0, firstTry: 0, target: 0, meaning: 0 });
              setAnswer('');
              setEvaluation(undefined);
              setAttempt(1);
              setHintLevel(0);
            }}
          >
            Ôn lại ngay
          </button>
          <Link className="btn btn-primary" to="/vocabulary">
            Quay lại Vocabulary
          </Link>
        </div>
      </div>
    );
  if (!current) return null;
  const submit = () => {
    if (!answer.trim()) return;
    const result = evaluateVocabularyAnswer(answer, current, attempt, false);
    setEvaluation(result);
    recordVocabularyPractice({
      item: current,
      evaluation: result.result,
      targetUsed: result.targetUsed,
      firstTry: attempt === 1,
      shownAnswer: false,
    });
    setStats((old) => ({
      attempts: old.attempts + 1,
      firstTry: old.firstTry + (result.status === 'correct-target' && attempt === 1 ? 1 : 0),
      target: old.target + (result.status === 'correct-target' ? 1 : 0),
      meaning: old.meaning + (result.status === 'acceptable-meaning' ? 1 : 0),
    }));
    setTargetStreak(result.status === 'correct-target' ? targetStreak + 1 : 0);
  };
  const retry = () => {
    setEvaluation(undefined);
    setAnswer('');
    setAttempt((value) => value + 1);
    setShownAnswer(false);
  };
  const next = () => {
    setPosition((value) => value + 1);
    setAnswer('');
    setAttempt(1);
    setHintLevel(0);
    setEvaluation(undefined);
    setShownAnswer(false);
  };
  const show = () => {
    const result = evaluateVocabularyAnswer(current.canonicalAnswer, current, attempt, true);
    setAnswer(current.canonicalAnswer);
    setEvaluation(result);
    setShownAnswer(true);
    recordVocabularyPractice({
      item: current,
      evaluation: result.result,
      targetUsed: true,
      firstTry: false,
      shownAnswer: true,
    });
    setTargetStreak(0);
  };
  return (
    <div className="vocabulary-practice-layout">
      <main className="vocabulary-practice-card">
        <header>
          <Link aria-label="Thoát bài luyện" to={`/vocabulary/${encodeURIComponent(id)}`}>
            <ArrowLeft />
          </Link>
          <div>
            <b>{entry.term}</b>
            <span>
              {mode === 'master'
                ? `${targetStreak} / 5 đúng liên tiếp`
                : `Practice ${position + 1} / ${targetTotal}`}
            </span>
          </div>
          <ProgressBar value={mode === 'master' ? targetStreak : position} max={targetTotal} />
        </header>
        <section className="vocabulary-prompt">
          <small>VIETNAMESE</small>
          <h1>{current.vietnamese}</h1>
          <div className="practice-context">
            <span>{current.context}</span>
            <span>{current.level}</span>
          </div>
        </section>
        {!evaluation ? (
          <section className="vocabulary-composer">
            <label htmlFor="vocabulary-answer">YOUR ENGLISH</label>
            <textarea
              id="vocabulary-answer"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                  event.preventDefault();
                  submit();
                }
              }}
              placeholder="Viết câu tiếng Anh của bạn…"
              autoFocus
            />
            {hintLevel > 0 && (
              <div className="vocabulary-hint">
                <Lightbulb size={17} />
                <div>
                  {hintLevel === 1 && (
                    <>
                      Target expression: <b>{current.targetExpressions.join(' / ')}</b>
                    </>
                  )}
                  {hintLevel === 2 && (
                    <>
                      {(current.hint ?? current.grammarFocus.join(' · ')) ||
                        'Hãy giữ đúng thì và ý nghĩa.'}
                    </>
                  )}
                  {hintLevel >= 3 && <code>{initials(current.canonicalAnswer)}</code>}
                </div>
              </div>
            )}
            <div className="vocabulary-actions">
              <div>
                <button
                  className="btn btn-ghost"
                  onClick={() => setHintLevel((value) => Math.min(3, value + 1))}
                >
                  <Lightbulb size={16} /> Hint
                </button>
                <button className="btn btn-ghost" onClick={show}>
                  <Eye size={16} /> Tôi chưa biết
                </button>
              </div>
              <button className="btn btn-primary" disabled={!answer.trim()} onClick={submit}>
                Kiểm tra
              </button>
            </div>
          </section>
        ) : (
          <VocabularyFeedback
            evaluation={evaluation}
            item={current}
            onRetry={retry}
            onNext={next}
            canContinue={
              evaluation.status === 'correct-target' ||
              evaluation.status === 'acceptable-meaning' ||
              shownAnswer
            }
          />
        )}
      </main>
      <aside className="vocabulary-context-sidebar">
        <p className="eyebrow">Vocabulary focus</p>
        <h2>{entry.term}</h2>
        <p>
          {entry.meanings.find((item) => item.id === current.senseId)?.meaning ??
            entry.meanings[0]?.meaning}
        </p>
        <small>Target expression</small>
        <b>{current.targetExpressions.join(' / ')}</b>
        <span className={`mastery ${progress?.mastery ?? 'new'}`}>
          {progress?.mastery ?? 'new'}
        </span>
      </aside>
    </div>
  );
}

import { ArrowLeft, Check, ChevronRight, Eye, Heart, Lightbulb, RotateCcw, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { evaluateWriting } from '../engine/writing-evaluator';
import { topicsForWritingUnit, writingUnitForTopic } from '../engine/writing-learning-path';
import { loadWritingTopic, writingManifest, writingSessionIds } from '../data/writing/writing-repository';
import { useProgressStore } from '../store/progress-store';
import type { WritingEvaluation, WritingPracticeTopic } from '../types/domain';
import { WRITING_FEEDBACK_LABELS } from '../engine/writing-feedback';

const resultLabels: Record<WritingEvaluation['status'], string> = {
  'communicates-well': 'Bạn truyền đạt rất rõ!',
  'mostly-correct': 'Người đọc hiểu được ý chính',
  'needs-improvement': 'Cần cải thiện ý quan trọng',
};

export default function WritingPracticePage() {
  const { writingId = '' } = useParams();
  const id = decodeURIComponent(writingId);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const store = useProgressStore();
  const [loaded, setLoaded] = useState<{ id: string; topic?: WritingPracticeTopic }>({ id: '' });
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<WritingEvaluation>();
  const [hintLevel, setHintLevel] = useState(0);
  const [showSamples, setShowSamples] = useState(false);
  const [feedbackRevealLevel, setFeedbackRevealLevel] = useState(1);
  const [showCorrection, setShowCorrection] = useState(false);
  const [now] = useState(Date.now);
  const mode = (params.get('session') ?? 'browse') as 'daily' | 'it' | 'quick' | 'review' | 'browse' | 'path';
  const pathUnitId = params.get('unit') ?? writingUnitForTopic(id)?.id;
  const dailyItemId = params.get('dailyItem');

  useEffect(() => {
    let active = true;
    void loadWritingTopic(id)
      .then((topic) => {
        if (active) {
          setLoaded({ id, topic });
          setResult(undefined);
          setHintLevel(0);
          setShowSamples(false);
          setFeedbackRevealLevel(1);
          setShowCorrection(false);
          setAnswer(useProgressStore.getState().writingDrafts[id] ?? '');
        }
      })
      .catch(() => {
        if (active) setLoaded({ id });
      });
    return () => { active = false; };
  }, [id]);

  const topic = loaded.id === id ? loaded.topic : undefined;
  const progress = store.writingProgress[id];
  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;
  const dueIds = useMemo(() => Object.values(store.writingProgress)
    .filter((item) => item.attempts.length > 0 && Date.parse(item.nextReviewAt) <= now)
    .map((item) => item.topicId), [now, store.writingProgress]);
  const sessionIds = mode === 'path' && pathUnitId
    ? topicsForWritingUnit(pathUnitId, store.writingPathPreference).map((item) => item.id)
    : writingSessionIds(mode === 'path' ? 'browse' : mode, dueIds);
  const position = Math.max(0, sessionIds.indexOf(id));
  const nextId = sessionIds[(position + 1) % Math.max(1, sessionIds.length)] ?? writingManifest[0]?.id;
  const backHref = mode === 'path' && pathUnitId ? `/writing/path/${pathUnitId}` : '/writing';

  if (loaded.id !== id) return <div className="page-loader" role="status">Đang tải Writing topic…</div>;
  if (!topic) return <div className="page writing-not-found"><h1>Writing topic chưa có trong bộ nhớ ngoại tuyến</h1><p>Hãy kết nối mạng và mở topic này một lần.</p><Link className="btn btn-primary" to="/writing">Về Writing</Link></div>;

  const submit = () => {
    if (!answer.trim()) return;
    const evaluation = evaluateWriting(answer, topic);
    setResult(evaluation);
    setFeedbackRevealLevel(1);
    setShowCorrection(false);
    store.recordWritingAttempt(topic.id, evaluation);
    if (dailyItemId) {
      store.completeDailyLearningItem(dailyItemId, {
        firstTryCorrect: evaluation.status === 'communicates-well' && !progress?.attempts.length,
        writingStatus: evaluation.status,
        weaknessTypes: [
          ...evaluation.ideas.filter((idea) => idea.status !== 'covered').map((idea) => idea.kind),
          ...evaluation.languageIssues.map((issue) => issue.type),
        ],
      });
    }
  };
  const updateAnswer = (value: string) => {
    setAnswer(value);
    store.saveWritingDraft(topic.id, value);
  };
  const primaryMeaningIssue = result?.ideas.find((idea) => idea.status === 'contradicted') ??
    result?.ideas.find((idea) => idea.status === 'missing') ??
    result?.ideas.find((idea) => idea.status === 'partial');
  const ideaIcon = (status: WritingEvaluation['ideas'][number]['status']) =>
    status === 'covered' ? '✓' : status === 'contradicted' ? '✕' : '○';
  const dimensions = result?.dimensions ? Object.values(result.dimensions) : [];

  return <div className="page writing-practice-page">
    <header className="writing-practice-header">
      <Link className="icon-btn" to={backHref} aria-label={mode === 'path' ? 'Về Writing Unit' : 'Về Writing'}><ArrowLeft /></Link>
      <div><span>{topic.domain === 'it-work' ? 'IT WRITING' : 'DAILY WRITING'} · {topic.level} · {topic.writingType === 'story' ? 'STORY' : 'PROBLEM EXPLANATION'}</span><h1>{topic.titleEnglish}</h1><p>{topic.titleVietnamese}</p></div>
      <button className={`icon-btn ${progress?.favorite ? 'active' : ''}`} aria-label={progress?.favorite ? 'Bỏ yêu thích' : 'Yêu thích'} onClick={() => store.toggleWritingFavorite(topic.id)}><Heart fill={progress?.favorite ? 'currentColor' : 'none'} /></button>
    </header>

    <div className="writing-practice-layout">
      <main>
        <section className="card writing-prompt-card">
          <div className="writing-context-block"><small>BỐI CẢNH</small><p>{topic.context}</p></div>
          <div className="writing-source-block"><small>🇻🇳 NỘI DUNG TIẾNG VIỆT CẦN VIẾT LẠI</small><p>{topic.vietnameseSourceText}</p></div>
          <div className="writing-topic-meta"><span>{topic.category}</span><span>Gợi ý {topic.expectedWordRange[0]}–{topic.expectedWordRange[1]} words · không bắt buộc</span></div>
        </section>

        <section className="card writing-composer">
          <div className="writing-composer-label"><label htmlFor="writing-answer">YOUR ENGLISH PARAGRAPH</label><span>{wordCount} words · Autosaved</span></div>
          <p className="writing-composer-instruction">Hãy viết lại nội dung tiếng Việt trên bằng tiếng Anh theo cách của bạn. Không cần dịch từng chữ hoặc giống bài mẫu, chỉ cần truyền đạt đúng các ý chính.</p>
          <textarea id="writing-answer" value={answer} onChange={(event) => updateAnswer(event.target.value)} placeholder="Viết nội dung trên bằng tiếng Anh…" rows={9} disabled={Boolean(result)} />
          {!result && <div className="writing-actions"><div><button className="btn btn-ghost" onClick={() => setHintLevel((value) => Math.min(3, value + 1))} disabled={hintLevel >= 3}><Lightbulb size={17} /> Gợi ý {hintLevel ? `${hintLevel}/3` : ''}</button><button className="btn btn-ghost" onClick={() => setShowSamples(true)}><Eye size={17} /> Xem bài mẫu</button></div><button className="btn btn-primary" onClick={submit} disabled={!answer.trim()}>Kiểm tra đoạn viết</button></div>}
          {hintLevel > 0 && !result && <div className="writing-hints">{topic.hints.slice(0, hintLevel).map((hint) => <div key={hint.level}><b>Hint {hint.level} — {hint.title}</b><p>{hint.content.join(' · ')}</p></div>)}</div>}
        </section>

        {result && <section className={`card writing-feedback ${result.status}`} aria-live="polite">
          <header>{result.status === 'needs-improvement' ? <X /> : <Check />}<div><h2>{resultLabels[result.status]}</h2><span>Communication score: {result.communicationScore}/100</span></div></header>
          {dimensions.length > 0 && <div className="writing-quality-grid">{dimensions.map((dimension) => <div className={dimension.status} key={dimension.labelVietnamese}><span>{dimension.status === 'good' ? '✓' : '⚠'}</span><b>{dimension.labelVietnamese}</b><small>{dimension.status === 'good' ? 'Tốt' : 'Cần cải thiện'}</small></div>)}</div>}
          <div className="writing-feedback-block writing-user-answer"><h3>CÂU CỦA BẠN</h3><p>{result.userAnswer}</p></div>
          <div className="writing-feedback-block"><h3>Ý BẠN ĐÃ TRUYỀN ĐẠT</h3><p><b>Meaning coverage: {Math.round(result.meaningCoverage * 100)}%</b></p><details className="writing-feedback-details"><summary>Xem chi tiết ({result.communicatedIdeas}/{result.totalIdeas} ý đầy đủ)</summary><ul className="idea-coverage">{result.ideas.map((idea) => <li className={idea.status} key={idea.id}>{ideaIcon(idea.status)} {idea.labelVietnamese}{idea.status === 'partial' ? ' — một phần' : ''}</li>)}</ul></details></div>
          {(primaryMeaningIssue || result.facts.some((fact) => !fact.correct)) && <div className="writing-feedback-block"><h3>VẤN ĐỀ QUAN TRỌNG</h3>{primaryMeaningIssue?.message && <p className={`meaning-priority ${primaryMeaningIssue.status}`}>{ideaIcon(primaryMeaningIssue.status)} {primaryMeaningIssue.message}</p>}{result.facts.filter((fact) => !fact.correct).map((fact) => <p className="critical-fact" key={fact.id}>✕ {fact.message}</p>)}</div>}
          <div className="writing-feedback-block"><h3>FEEDBACK TỪNG BƯỚC</h3>{result.feedbackIssues?.length ? <div className="writing-issue-list">{result.feedbackIssues.slice(0, 4).map((feedback) => <article className={`writing-issue ${feedback.severity}`} key={feedback.id}><header><b>{WRITING_FEEDBACK_LABELS[feedback.category]}</b><span>Layer {feedback.layer === 'normalization' ? 1 : feedback.layer === 'structure' ? 2 : feedback.layer === 'meaning' ? 3 : 4}</span></header><p>{feedback.hints[Math.min(2, feedbackRevealLevel - 1)]}</p>{feedbackRevealLevel >= 3 && feedback.grammarTarget && <small className="writing-review-link">Ôn lại: {feedback.grammarTarget}</small>}{feedbackRevealLevel >= 3 && feedback.vocabularyTerm && <Link className="text-link" to={`/vocabulary?search=${encodeURIComponent(feedback.vocabularyTerm)}`}>Ôn từ/cụm: {feedback.vocabularyTerm}</Link>}</article>)}</div> : <p>Không phát hiện lỗi ngôn ngữ quan trọng làm cản trở giao tiếp.</p>}{result.feedbackIssues?.length && feedbackRevealLevel < 3 ? <button className="btn btn-ghost writing-next-hint" onClick={() => setFeedbackRevealLevel((value) => Math.min(3, value + 1))}>Xem gợi ý tiếp · {feedbackRevealLevel + 1}/3</button> : null}</div>
          {result.targetAchievement && <details className="writing-feedback-block writing-feedback-details"><summary>Xem mục tiêu và mạch bài</summary><div className="writing-target-status"><p>{result.targetAchievement.meaningPreserved ? '✓' : '⚠'} Meaning: {result.targetAchievement.meaningPreserved ? 'được giữ' : 'chưa đủ hoặc bị đổi'}</p><p>{result.targetAchievement.grammarTargetMet ? '✓' : '⚠'} Target grammar: {result.targetAchievement.grammarTargetMet ? 'đạt' : 'chưa đạt'}</p><p>{result.targetAchievement.vocabularyTargetMet ? '✓' : '⚠'} Target vocabulary: {result.targetAchievement.vocabularyTargetMet ? 'đạt' : 'cần cải thiện'}</p>{result.specializedFeedback && <p>{result.specializedFeedback.messageVietnamese}</p>}</div></details>}
          {showCorrection && <div className="writing-feedback-block better-writing"><h3>GỢI Ý SỬA CÂU</h3><p>{result.correctedAnswer || result.userAnswer}</p>{result.diff?.some((segment) => segment.operation !== 'equal') && <div className="writing-word-diff" aria-label="So sánh từng từ">{result.diff.map((segment, index) => <span className={segment.operation} key={`${segment.operation}-${index}`}>{segment.operation === 'replace' ? <>{segment.original} → {segment.corrected}</> : segment.operation === 'delete' ? <>− {segment.original}</> : segment.operation === 'insert' ? <>+ {segment.corrected}</> : segment.corrected}</span>)}</div>}<details className="writing-feedback-details"><summary>MỘT CÁCH DIỄN ĐẠT TỰ NHIÊN</summary><p>{result.betterVersion}</p>{result.otherNaturalWay && <><h3>Cách diễn đạt tự nhiên khác</h3><p>{result.otherNaturalWay}</p></>}</details></div>}
          <div className="writing-feedback-actions"><button className="btn btn-secondary" onClick={() => { setResult(undefined); setShowSamples(false); setFeedbackRevealLevel(1); setShowCorrection(false); }}><RotateCcw size={17} /> Viết lại</button>{!showCorrection && <button className="btn btn-ghost" onClick={() => setShowCorrection(true)}><Eye size={17} /> Xem cách sửa</button>}<button className="btn btn-ghost" onClick={() => setShowSamples((value) => !value)}><Eye size={17} /> Xem bài mẫu</button>{dailyItemId ? <button className="btn btn-primary" onClick={() => navigate('/daily')}>Tiếp tục kế hoạch <ChevronRight size={17} /></button> : nextId && <button className="btn btn-primary" onClick={() => navigate(`/writing/${encodeURIComponent(nextId)}?session=${mode}${mode === 'path' && pathUnitId ? `&unit=${pathUnitId}` : ''}`)}>Câu tiếp theo <ChevronRight size={17} /></button>}</div>
        </section>}

        {showSamples && <section className="card writing-samples"><h2>Các bài mẫu tự nhiên</h2><p>Bài mẫu chỉ để tham khảo, không phải đáp án duy nhất.</p>{topic.sampleAnswers.map((sample, index) => <article key={sample}><small>SAMPLE {index + 1}</small><p>{sample}</p></article>)}</section>}

        {progress?.attempts.length ? <details className="card writing-attempts"><summary>Xem lần viết trước ({progress.attempts.length})</summary>{progress.attempts.slice().reverse().map((attempt, index) => <article key={attempt.id}><b>Attempt {progress.attempts.length - index}{attempt.id === progress.bestAttempt?.id ? ' · Best attempt' : ''}</b><span>{attempt.status} · {Math.round(attempt.meaningCoverage * 100)}% meaning</span><p>{attempt.answer}</p></article>)}</details> : null}
      </main>

      <aside className="writing-support card"><h2>Useful vocabulary</h2><div>{topic.usefulVocabulary.map((item) => <Link className="tag" to={`/vocabulary?search=${encodeURIComponent(item)}`} key={item}>{item}</Link>)}</div><h2>Useful structures</h2><ul>{topic.usefulStructures.map((item) => <li key={item}>{item}</li>)}</ul><small>Bạn không bắt buộc dùng đúng các từ hoặc cấu trúc này.</small></aside>
    </div>
  </div>;
}

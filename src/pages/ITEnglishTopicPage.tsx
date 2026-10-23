import { ArrowLeft, ArrowRight, CheckCircle2, Mic, PenLine } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProgressBar } from '../components/common/ProgressBar';
import { itEnglishTopicById, itEnglishTopics } from '../data/it-english/curriculum';
import { canAttemptSentence, compareSpeechTranscript, compareWriting, nextSentenceIndex, topicState } from '../engine/it-english/progression';
import { useProgressStore } from '../store/progress-store';
import type { ITEnglishAttemptResult, ITEnglishMode } from '../types/domain';

interface RecognitionResultEvent extends Event { results: ArrayLike<ArrayLike<{ transcript: string }>> }
interface RecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: RecognitionResultEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

function recognitionConstructor(): (new () => RecognitionLike) | undefined {
  const browser = window as Window & { SpeechRecognition?: new () => RecognitionLike; webkitSpeechRecognition?: new () => RecognitionLike };
  return browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
}

export default function ITEnglishTopicPage() {
  const { topicId } = useParams();
  const topic = topicId ? itEnglishTopicById.get(topicId) : undefined;
  const progress = useProgressStore((state) => state.itEnglishProgress);
  const recordAttempt = useProgressStore((state) => state.recordITEnglishAttempt);
  const [mode, setMode] = useState<ITEnglishMode>('speaking');
  const [draft, setDraft] = useState('');
  const [attempt, setAttempt] = useState<ITEnglishAttemptResult>();
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [speechError, setSpeechError] = useState('');
  const [busy, setBusy] = useState(false);
  const [heldSentenceId, setHeldSentenceId] = useState<string>();
  const inFlight = useRef(false);

  const state = topic ? topicState(itEnglishTopics, topic.number - 1, progress) : 'locked';
  const nextIndex = topic ? nextSentenceIndex(topic, progress[topic.id]) : -1;
  const heldIndex = topic && heldSentenceId ? topic.turns.findIndex((turn) => turn.id === heldSentenceId) : -1;
  const index = heldIndex >= 0 ? heldIndex : nextIndex;
  const current = topic && index >= 0 ? topic.turns[index] : undefined;
  const currentProgress = topic && current ? progress[topic.id]?.sentences[current.id] : undefined;
  const recognitionAvailable = typeof window !== 'undefined' && Boolean(recognitionConstructor());
  const allPassed = Boolean(topic && nextIndex === -1 && heldIndex < 0);
  const passedCount = topic?.turns.filter((turn) => progress[topic.id]?.sentences[turn.id]?.passed).length ?? 0;
  const revealedCount = topic?.turns.filter((turn) => progress[topic.id]?.sentences[turn.id]?.revealedAfterLimit).length ?? 0;
  const completed = passedCount + revealedCount;
  const hasAnswer = Boolean(currentProgress?.passed || currentProgress?.revealedAfterLimit);
  const displayedAttempt: ITEnglishAttemptResult | undefined = attempt ?? (currentProgress ? {
    passed: currentProgress.passed,
    similarity: currentProgress.latestSimilarity,
    coverage: currentProgress.latestSimilarity,
    feedback: currentProgress.latestResult,
    corrections: [],
  } : undefined);

  if (!topic) return <div className="page narrow"><h1>Topic not found</h1><Link className="back-link" to="/it-english"><ArrowLeft size={16} /> All topics</Link></div>;
  if (state === 'locked') return <div className="page narrow"><Link className="back-link" to="/it-english"><ArrowLeft size={16} /> All topics</Link><section className="card it-locked-message"><h1>This topic is locked</h1><p>Complete the previous topic to unlock this conversation.</p></section></div>;

  function saveResult(selectedMode: ITEnglishMode, result: ITEnglishAttemptResult) {
    if (!current || !canAttemptSentence(itEnglishTopics, progress, topic.id, current.id)) return;
    const nextAttemptCount = (currentProgress?.attemptCount ?? 0) + 1;
    recordAttempt(topic.id, current.id, selectedMode, result);
    setAttempt(result);
    if (result.passed || nextAttemptCount >= 3) setHeldSentenceId(current.id);
    inFlight.current = false;
    setBusy(false);
  }

  function startRecognition() {
    const Constructor = recognitionConstructor();
    if (!Constructor || !current || inFlight.current || listening) return;
    inFlight.current = true;
    setBusy(true); setListening(true); setSpeechError(''); setTranscript(''); setAttempt(undefined);
    const recognizer = new Constructor();
    recognizer.lang = 'en-US'; recognizer.interimResults = false; recognizer.maxAlternatives = 1;
    recognizer.onresult = (event) => {
      const recognized = event.results[0]?.[0]?.transcript ?? '';
      setTranscript(recognized);
      if (!recognized.trim()) {
        inFlight.current = false;
        setBusy(false);
        setListening(false);
        setSpeechError('No transcript was recognized, so this did not count as an attempt. Try again or switch to Writing.');
        return;
      }
      saveResult('speaking', compareSpeechTranscript(current.text, recognized));
    };
    recognizer.onerror = (event) => { setSpeechError(`Speech recognition could not complete (${event.error}). Try again or use Writing.`); inFlight.current = false; setBusy(false); setListening(false); };
    recognizer.onend = () => { setListening(false); inFlight.current = false; setBusy(false); };
    try { recognizer.start(); } catch { setSpeechError('Speech recognition could not start. Try again or use Writing.'); inFlight.current = false; setBusy(false); setListening(false); }
  }

  function submitWriting(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!current || inFlight.current || !draft.trim()) return;
    inFlight.current = true;
    setBusy(true);
    saveResult('writing', compareWriting(current.text, draft));
  }

  function selectMode(nextMode: ITEnglishMode) {
    setMode(nextMode); setAttempt(undefined); setTranscript(''); setSpeechError('');
  }

  return <div className="page it-practice-page">
    <Link to="/it-english" className="back-link"><ArrowLeft size={17} /> All IT English topics</Link>
    <header className="it-practice-heading"><div><p className="eyebrow">Level {topic.level} · Topic {topic.number} of 30</p><h1>{topic.title}</h1><p>{topic.description}</p></div><span className="tag">{topic.estimatedMinutes} min</span></header>
    <section className="it-objectives card"><div><b>Learning objectives</b><span>{passedCount} passed · {revealedCount} answers revealed</span></div><ul>{topic.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul><ProgressBar value={completed} max={topic.turns.length} /></section>

    <section className="it-conversation card" aria-label="Conversation">
      <header><div><span className="it-chat-avatar">{topic.turns[0]?.speaker.slice(0, 1)}</span><div><b>{topic.turns[0]?.speaker} and {topic.turns.find((turn) => turn.speaker !== topic.turns[0]?.speaker)?.speaker}</b><small>{topic.levelTitle}</small></div></div><span className="tag">{topic.turns.length} sentences</span></header>
      <div className="it-chat-messages">{topic.turns.map((turn, turnIndex) => {
        const isCurrent = current?.id === turn.id;
        const sentenceProgress = progress[topic.id]?.sentences[turn.id];
        const passed = Boolean(sentenceProgress?.passed);
        const revealed = passed || Boolean(sentenceProgress?.revealedAfterLimit);
        return <article key={turn.id} className={`it-chat-message ${turnIndex % 2 ? 'right' : 'left'} ${isCurrent ? 'current' : ''} ${passed ? 'passed' : ''}`}>
          <div className="it-chat-speaker"><b>{turn.speaker}</b><span>{turn.role}</span>{revealed && <CheckCircle2 size={15} aria-label={passed ? 'Passed' : 'Answer revealed'} />}</div>
          <small lang="vi">{turn.vietnamese}</small>
          {revealed && <p className="it-revealed-answer" lang="en">{turn.text}</p>}
          {turn.notes?.length ? <div className="it-chat-notes">Useful: {turn.notes.join(' · ')}</div> : null}
        </article>;
      })}</div>
    </section>

    {current && <section className="it-practice-card card" aria-labelledby="practice-heading">
      <div className="it-sentence-progress"><span>Sentence {index + 1} of {topic.turns.length}</span><b>{current.role}</b><span>Lần thử: {currentProgress?.attemptCount ?? 0}/3</span></div>
      <h2 id="practice-heading">Practise this sentence</h2>
      <p className="it-sentence-translation" lang="vi">{current.vietnamese}</p>
      <div className="it-mode-tabs" role="tablist" aria-label="Practice mode">
        <button role="tab" aria-selected={mode === 'speaking'} className={mode === 'speaking' ? 'active' : ''} onClick={() => selectMode('speaking')}><Mic size={17} /> Speaking</button>
        <button role="tab" aria-selected={mode === 'writing'} className={mode === 'writing' ? 'active' : ''} onClick={() => selectMode('writing')}><PenLine size={17} /> Writing</button>
      </div>
      {mode === 'speaking' ? <div className="it-speaking-panel">
        <div className="it-speech-actions">
          {recognitionAvailable && <button type="button" className="btn btn-primary" onClick={startRecognition} disabled={busy}>{listening ? 'Listening…' : 'Start speaking'}<Mic size={17} /></button>}
        </div>
        {recognitionAvailable ? <p className="it-mode-note">Speech recognition checks your transcript against the target words. It does not score pronunciation.</p> : <p className="it-mode-note">Speech recognition is unavailable in this browser. You can still practise aloud, or switch to Writing to record sentence progress.</p>}
        {transcript && hasAnswer && <p className="it-transcript"><b>Recognized transcript:</b> “{transcript}”</p>}
        {speechError && <p className="it-error" role="alert">{speechError}</p>}
      </div> : <form className="it-writing-form" onSubmit={submitWriting}>
        <label htmlFor="it-writing-answer">Type the English sentence</label>
        <textarea id="it-writing-answer" className="textarea" value={draft} onChange={(event) => setDraft(event.target.value)} rows={3} autoCapitalize="sentences" />
        <button className="btn btn-primary" type="submit" disabled={busy || !draft.trim()}>Check sentence <ArrowRight size={17} /></button>
      </form>}
      {displayedAttempt && <div className={`it-attempt-feedback ${displayedAttempt.passed ? 'success' : 'retry'}`} role="status">
        <b>{currentProgress?.revealedAfterLimit ? 'Answer revealed' : displayedAttempt.passed ? 'Sentence passed' : 'Try once more'}</b>
        <p>{currentProgress?.revealedAfterLimit ? 'Bạn đã thử 3 lần. Đây là câu tiếng Anh đúng.' : displayedAttempt.passed ? displayedAttempt.feedback : 'Check the word order, spelling, and missing or extra words, then try again.'}</p>
        {hasAnswer && <p className="it-revealed-answer" lang="en">{current?.text}</p>}
        {!hasAnswer && <small>You can retry or switch modes without losing attempts.</small>}
        {hasAnswer && <button className="btn btn-primary" onClick={() => { setHeldSentenceId(undefined); setAttempt(undefined); setDraft(''); setTranscript(''); }}>Next sentence <ArrowRight size={17} /></button>}
      </div>}
    </section>}

    {allPassed && <section className="it-topic-complete card"><CheckCircle2 size={34} /><p className="eyebrow">Conversation complete</p><h2>Conversation complete</h2><p>{passedCount} sentences passed · {revealedCount} answers revealed. Review the chat above or continue to the next conversation.</p>{topic.number < itEnglishTopics.length ? <Link className="btn btn-primary" to={`/it-english/${itEnglishTopics[topic.number]!.id}`}>Next topic <ArrowRight size={17} /></Link> : <Link className="btn btn-primary" to="/it-english">Review the curriculum <ArrowRight size={17} /></Link>}</section>}
  </div>;
}

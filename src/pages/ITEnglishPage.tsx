import { ArrowRight, Check, LockKeyhole, MessageCircle, Mic, PenLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProgressBar } from '../components/common/ProgressBar';
import { itEnglishTopics } from '../data/it-english/curriculum';
import { topicState } from '../engine/it-english/progression';
import { useProgressStore } from '../store/progress-store';

export default function ITEnglishPage() {
  const progress = useProgressStore((state) => state.itEnglishProgress);
  const completeCount = itEnglishTopics.filter((topic, index) => topicState(itEnglishTopics, index, progress) === 'completed').length;
  return <div className="page it-english-page">
    <p className="eyebrow">IT English Conversation Practice</p>
    <h1>Practise the conversations engineers have at work.</h1>
    <p className="subhead">Read each exchange, then practise one sentence at a time with Speaking or Writing. Your progress is saved on this device.</p>
    <section className="it-english-intro card" aria-label="Practice modes">
      <div><span className="it-mode-icon"><Mic /></span><div><b>Speaking</b><p>Listen with browser audio and match a recognized transcript when speech recognition is available.</p></div></div>
      <div><span className="it-mode-icon"><PenLine /></span><div><b>Writing</b><p>Type the sentence exactly. Case, punctuation, and repeated spaces do not affect a match.</p></div></div>
      <div className="it-curriculum-progress"><b>{completeCount} / 30 topics completed</b><ProgressBar value={completeCount} max={30} /></div>
    </section>
    {([1, 2, 3, 4] as const).map((level) => <section className="it-level-section" key={level}>
      <header><div><p className="eyebrow">Level {level}</p><h2>{itEnglishTopics.find((topic) => topic.level === level)?.levelTitle}</h2></div><span>{itEnglishTopics.filter((topic) => topic.level === level).length} topics</span></header>
      <div className="it-topic-grid">{itEnglishTopics.filter((topic) => topic.level === level).map((topic) => {
        const index = topic.number - 1;
        const state = topicState(itEnglishTopics, index, progress);
        const saved = progress[topic.id];
        const complete = topic.turns.filter((turn) => {
          const sentence = saved?.sentences[turn.id];
          return sentence?.passed || sentence?.revealedAfterLimit;
        }).length;
        const icon = state === 'locked' ? <LockKeyhole /> : state === 'completed' ? <Check /> : <MessageCircle />;
        return <article className={`it-topic-card card ${state}`} key={topic.id}>
          <div className="it-topic-card-top"><span className="it-topic-number">{String(topic.number).padStart(2, '0')}</span><span className="it-topic-state" aria-label={state}>{icon}{state === 'locked' ? 'Locked' : state === 'completed' ? 'Completed' : state === 'in-progress' ? 'In progress' : 'Available'}</span></div>
          <h3>{topic.title}</h3><p>{topic.description}</p>
          <div className="it-topic-meta"><span>{topic.levelTitle}</span><span>{topic.estimatedMinutes} min</span><span>{topic.turns.length} sentences</span></div>
          <div className="it-topic-progress"><span>{complete} / {topic.turns.length} sentences</span><ProgressBar value={complete} max={topic.turns.length} /></div>
          {state !== 'locked' && <Link className="btn btn-secondary" to={`/it-english/${topic.id}`}>{state === 'completed' ? 'Review conversation' : state === 'in-progress' ? 'Continue practice' : 'Start practice'}<ArrowRight size={16} /></Link>}
        </article>;
      })}</div>
    </section>)}
  </div>;
}

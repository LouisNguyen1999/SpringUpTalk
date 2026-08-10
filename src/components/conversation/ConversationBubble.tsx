import type { ConversationTurn, LearningRole } from '../../types/domain';

export function ConversationBubble({ turn, role, english, active }: { turn: ConversationTurn; role: LearningRole; english?: string; active?: boolean }) {
  const mine = turn.speaker === role;
  return <div className={`message-row ${mine ? 'mine' : 'partner'} ${active ? 'active' : ''}`}><div className="message-meta"><span>{mine ? 'YOU' : `PERSON ${turn.speaker}`}</span>{mine && <small>Bạn đóng vai {role}</small>}</div><div className="message-bubble"><small>🇻🇳 VIETNAMESE</small><p>{turn.vietnamese}</p>{english && <div className="english-line"><small>🇬🇧 ENGLISH</small><p>{english}</p></div>}</div></div>;
}

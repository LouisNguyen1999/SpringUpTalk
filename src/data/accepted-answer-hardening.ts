import type { CommunicativeIntent, ConversationTurn, Topic } from '../types/domain';
import { normalizeSentence } from '../engine/sentence-normalizer';

export const D0_BASELINE_CANONICAL_ONLY = 1594;

export const BASELINE_FLEXIBLE_INTENTS = new Set<CommunicativeIntent>([
  'requesting','suggesting','apologizing','refusing','explaining','asking-follow-up','negotiating',
  'clarifying','disagreeing-politely','handling-misunderstanding','changing-plans','resolving-conflict','giving-feedback',
]);

export const FLEXIBLE_INTENTS_V2 = new Set<CommunicativeIntent>([
  ...BASELINE_FLEXIBLE_INTENTS,
  'inviting','confirming','complaining','reassuring','giving-advice',
]);

const fixedValuePattern = /\b(?:\d|percent|percentage|dollars?|dong|euros?|pounds?|room|gate|flight|platform|reference|code|number|extension|monday|tuesday|wednesday|thursday|friday|saturday|sunday|january|february|march|april|may|june|july|august|september|october|november|december|today|tomorrow|yesterday|morning|afternoon|evening|tonight|o'clock|midnight|noon)\b/i;

function lowerFirst(value:string) {
  return value.charAt(0).toLowerCase()+value.slice(1);
}

function stripQuestion(value:string) {
  return value.trim().replace(/\?$/,'');
}

function questionAlternatives(answer:string):string[] {
  const plain=stripQuestion(answer);
  const transformations:Array<[RegExp,(match:RegExpMatchArray)=>string[]]> = [
    [/^Can you (.+)$/i,match => [`Could you ${match[1]}?`,`Would you be able to ${match[1]}?`]],
    [/^Could you (.+)$/i,match => [`Can you ${match[1]}, please?`,`Would you be able to ${match[1]}?`]],
    [/^Can we (.+)$/i,match => [`Could we ${match[1]}?`,`Would it be possible for us to ${match[1]}?`]],
    [/^Could we (.+)$/i,match => [`Can we ${match[1]}?`,`Would it be possible for us to ${match[1]}?`]],
    [/^Would you (?:like to )?(.+)$/i,match => [`Could you ${match[1]}?`,`Would you be willing to ${match[1]}?`]],
    [/^How should we handle (.+)$/i,match => [`What should we do about ${match[1]}?`,`What is the best way to deal with ${match[1]}?`]],
    [/^What should we do (?:next )?about (.+)$/i,match => [`How should we handle ${match[1]}?`,`What is the best next step for ${match[1]}?`]],
    [/^What is the best (?:approach|way) to (.+)$/i,match => [`How should we ${match[1]}?`,`What would be the most practical way to ${match[1]}?`]],
    [/^How will we confirm (.+)$/i,match => [`How can we verify ${match[1]}?`,`What will confirm ${match[1]}?`]],
    [/^Who will follow up on (.+)$/i,match => [`Who is going to follow up on ${match[1]}?`,`Who will take responsibility for following up on ${match[1]}?`]],
  ];
  for (const [pattern,build] of transformations) {
    const match=plain.match(pattern);
    if (match) return build(match);
  }
  const lowered=lowerFirst(answer.trim());
  return [`Just to clarify, ${lowered}`,`Can I check, ${lowered}`];
}

function statementAlternatives(answer:string,intent:CommunicativeIntent):string[] {
  const plain=answer.trim();
  const lower=lowerFirst(plain);
  if (/^I(?:'m| am) sorry (.+)$/i.test(plain)) {
    const reason=plain.match(/^I(?:'m| am) sorry (.+)$/i)?.[1] ?? '';
    return [`I apologize ${reason}`,`Please accept my apologies ${reason}`];
  }
  if (/^I would like to (.+)$/i.test(plain)) {
    const action=plain.match(/^I would like to (.+)$/i)?.[1] ?? '';
    return [`I was hoping to ${action}`,`What I'd like is to ${action}`];
  }
  if (/^We should (.+)$/i.test(plain)) {
    const action=plain.match(/^We should (.+)$/i)?.[1] ?? '';
    return [`I think we should ${action}`,`It would be best for us to ${action}`];
  }
  if (/^I suggest (.+)$/i.test(plain)) {
    const suggestion=plain.match(/^I suggest (.+)$/i)?.[1] ?? '';
    return [`My suggestion is ${suggestion}`,`One option would be ${suggestion}`];
  }
  if (intent === 'negotiating' || intent === 'disagreeing-politely' || intent === 'resolving-conflict') {
    return [`From my perspective, ${lower}`,`My view is that ${lower}`];
  }
  if (intent === 'changing-plans' || intent === 'asking-follow-up') {
    return [`Just so you know, ${lower}`,`To keep you updated, ${lower}`];
  }
  if (intent === 'suggesting' || intent === 'giving-advice') {
    return [`One practical option is this: ${plain}`,`My suggestion would be this: ${plain}`];
  }
  return [`To be clear, ${lower}`,`Just so we're on the same page, ${lower}`];
}

function meaningfulAlternatives(turn:ConversationTurn,intent:CommunicativeIntent):string[] {
  const candidates=turn.canonicalAnswer.trim().endsWith('?')
    ? questionAlternatives(turn.canonicalAnswer)
    : statementAlternatives(turn.canonicalAnswer,intent);
  const existing=new Set(turn.acceptedAnswers.map(normalizeSentence));
  return candidates.filter((answer) => !existing.has(normalizeSentence(answer))).slice(0,Math.max(0,3-turn.acceptedAnswers.length));
}

function requiresFixedAnswer(turn:ConversationTurn):boolean {
  const constraints=turn.semanticConstraints;
  return Boolean(
    constraints?.criticalValues?.length || constraints?.criticalTokens?.length || constraints?.tenseExpectation ||
    fixedValuePattern.test(turn.canonicalAnswer),
  );
}

/**
 * D0 audit adapter. It keeps the evaluator conservative: alternatives are explicit accepted answers,
 * while similarity thresholds and semantic checks remain unchanged.
 */
export function hardenAcceptedAnswers(dataset:Topic[]):Topic[] {
  return dataset.map((topic) => ({
    ...topic,
    conversations:topic.conversations.map((conversation) => {
      if (!conversation.intent || !FLEXIBLE_INTENTS_V2.has(conversation.intent)) return conversation;
      return {
        ...conversation,
        turns:conversation.turns.map((turn) => {
          const baselineCanonicalOnly=!topic.id.startsWith('batch-d-') && BASELINE_FLEXIBLE_INTENTS.has(conversation.intent!) && turn.acceptedAnswers.length===1;
          if (turn.acceptedAnswers.length>=3) return {
            ...turn,
            acceptedAnswerAudit:{batch:'D0',status:'already-flexible',reason:'Already had canonical plus at least two authored alternatives.',baselineCanonicalOnly},
          };
          if (requiresFixedAnswer(turn)) return {
            ...turn,
            acceptedAnswerAudit:{batch:'D0',status:'justified-fixed',reason:'Exact value, time, location, identifier, tense, or critical semantic constraint must remain fixed.',baselineCanonicalOnly},
          };
          const alternatives=meaningfulAlternatives(turn,conversation.intent);
          if (turn.acceptedAnswers.length+alternatives.length<3) return {
            ...turn,
            acceptedAnswerAudit:{batch:'D0',status:'justified-fixed',reason:'No second natural paraphrase passed the context-preserving audit.',baselineCanonicalOnly},
          };
          return {
            ...turn,
            acceptedAnswers:[...turn.acceptedAnswers,...alternatives],
            naturalAlternatives:Array.from(new Set([...turn.naturalAlternatives,...alternatives])),
            acceptedAnswerAudit:{batch:'D0',status:'expanded',reason:'Intent-aware paraphrases retain the full proposition and any stated action.',baselineCanonicalOnly},
          };
        }),
      };
    }),
  }));
}

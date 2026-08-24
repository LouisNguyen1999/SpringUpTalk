import { detectCommonMistakes } from '../mistake-detector';
import { evaluationTokens, normalizeForEvaluation } from '../sentence-normalizer';
import { OPPOSITE_PATTERN_PAIRS, SEMANTIC_PATTERNS } from './semantic-patterns';
import { analyzeWritingFeedback } from '../writing-feedback';
import type {
  Mistake,
  WritingCriticalFact,
  WritingEvaluation,
  WritingFactEvaluation,
  WritingIdeaEvaluation,
  WritingIdeaKind,
  WritingPracticeTopic,
  WritingRequiredIdea,
} from '../../types/domain';

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'to', 'of', 'for', 'in', 'on', 'at', 'and', 'or', 'but', 'that', 'this',
  'it', 'i', 'we', 'you', 'he', 'she', 'they', 'my', 'our', 'your', 'their', 'is', 'are', 'was',
  'were', 'be', 'been', 'being', 'do', 'does', 'did', 'have', 'has', 'had', 'with', 'from', 'as',
  'would', 'could', 'should', 'will', 'can', 'may', 'might', 'us', 'me', 'him', 'her', 'them',
]);
const NEGATIONS = new Set(['not', 'never', 'no', 'nobody', 'nothing', 'neither', 'without', 'unable']);
const NEGATIVE_STATES = new Set(['unknown', 'unclear', 'incomplete', 'offline', 'unavailable', 'unable', 'missing']);
const RELATIONS = new Set(['before', 'after', 'while', 'until', 'already', 'still', 'yet']);
const TOKEN_ALIASES: Record<string, string> = {
  arrived: 'arrive', arriving: 'arrive', got: 'get', getting: 'get',
  messaged: 'notify', message: 'notify', told: 'notify', tell: 'notify', notified: 'notify', notify: 'notify', informed: 'notify', inform: 'notify',
  boss: 'manager', supervisor: 'manager',
  delayed: 'delay', delaying: 'delay', lateness: 'late', later: 'late',
  trafficjam: 'traffic', congestion: 'traffic',
  worked: 'work', working: 'work', stays: 'stay', stayed: 'stay',
  recovered: 'recover', recovering: 'recover', restored: 'recover', operational: 'online',
  investigated: 'investigate', investigating: 'investigate', investigation: 'investigate',
  decided: 'decide', decision: 'decide', improvement: 'improve', improved: 'improve',
  clarify: 'explain', clarified: 'explain', clarification: 'explain', explanation: 'explain',
  deployment: 'deploy', deployed: 'deploy', deploying: 'deploy', rollout: 'deploy',
  transferred: 'transfer', transferring: 'transfer',
  missed: 'missing', missing: 'missing', morning: 'morning', evening: 'evening',
  postponed: 'delay', postponement: 'delay', cancelled: 'cancel', canceled: 'cancel',
  fixed: 'fix', resolved: 'fix', repaired: 'fix',
  failed: 'fail', failure: 'fail', broken: 'fail',
  approved: 'approve', approval: 'approve', rejected: 'reject', rejection: 'reject',
  completed: 'complete', finished: 'complete', incomplete: 'incomplete',
  unavailable: 'offline', offline: 'offline', online: 'online',
  users: 'user', requests: 'request', services: 'service', minutes: 'minute', hours: 'hour',
  days: 'day', weeks: 'week', months: 'month', years: 'year',
  issues: 'problem', issue: 'problem', problems: 'problem', defects: 'bug', defect: 'bug', bugs: 'bug',
  releases: 'release', versions: 'version', clients: 'customer', customers: 'customer',
  replicated: 'reproduce', reproducible: 'reproduce', reproduced: 'reproduce',
};
const NUMBER_WORDS: Record<string, string> = {
  zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7',
  eight: '8', nine: '9', ten: '10', eleven: '11', twelve: '12', thirteen: '13', fourteen: '14',
  fifteen: '15', sixteen: '16', seventeen: '17', eighteen: '18', nineteen: '19', twenty: '20',
  thirty: '30', forty: '40', fifty: '50', sixty: '60', ninety: '90', hundred: '100',
};
const MEASUREMENT_UNITS = new Set(['minute', 'hour', 'day', 'week', 'month', 'year', 'am', 'pm']);

interface SemanticView {
  normalized: string;
  tokens: Set<string>;
  markers: Set<string>;
  hasNegation: boolean;
  relations: Set<string>;
}
const SEMANTIC_VIEW_CACHE = new Map<string, SemanticView>();

function tokenKey(token: string): string {
  const compact = token.replace(/[^a-z0-9]/g, '');
  if (TOKEN_ALIASES[compact]) return TOKEN_ALIASES[compact];
  if (NUMBER_WORDS[compact]) return NUMBER_WORDS[compact];
  if (compact.length > 6 && compact.endsWith('ies')) return `${compact.slice(0, -3)}y`;
  if (compact.length > 6 && compact.endsWith('ing')) {
    const base = compact.slice(0, -3);
    return TOKEN_ALIASES[base] ?? base;
  }
  if (compact.length > 5 && compact.endsWith('ed')) {
    const base = compact.slice(0, -2);
    return TOKEN_ALIASES[base] ?? base;
  }
  if (compact.length > 4 && compact.endsWith('s')) return compact.slice(0, -1);
  return compact;
}

function expressionPresent(normalizedValue: string, expression: string): boolean {
  const normalizedExpression = normalizeForEvaluation(expression);
  return Boolean(normalizedExpression) && ` ${normalizedValue} `.includes(` ${normalizedExpression} `);
}

function semanticView(value: string): SemanticView {
  const normalized = normalizeForEvaluation(value
    .replace(/a\.?\s*m\.?/gi, 'am')
    .replace(/p\.?\s*m\.?/gi, 'pm'));
  const cached = SEMANTIC_VIEW_CACHE.get(normalized);
  if (cached) return cached;
  const rawTokens = evaluationTokens(normalized);
  const tokens = new Set(rawTokens.map(tokenKey).filter((token) => token && !STOP_WORDS.has(token)));
  const markers = new Set<string>();
  for (const [id, expressions] of Object.entries(SEMANTIC_PATTERNS)) {
    if (expressions.some((expression) => expressionPresent(normalized, expression))) {
      markers.add(id);
      tokens.add(id);
    }
  }
  const hasNegation = rawTokens.some((token) => NEGATIONS.has(tokenKey(token)) || NEGATIVE_STATES.has(tokenKey(token))) ||
    markers.has('disagree') || markers.has('offline');
  const view = {
    normalized,
    tokens,
    markers,
    hasNegation,
    relations: new Set([
      ...rawTokens.map(tokenKey).filter((token) => RELATIONS.has(token)),
      ...(/\b(?:prior to|ahead of)\b/.test(normalized) ? ['before'] : []),
      ...(/\b(?:once|following)\b/.test(normalized) ? ['after'] : []),
    ]),
  };
  // The library and topic expressions are immutable. A small cap prevents
  // unbounded growth during very long browser sessions with unique drafts.
  if (SEMANTIC_VIEW_CACHE.size >= 4_000) SEMANTIC_VIEW_CACHE.clear();
  SEMANTIC_VIEW_CACHE.set(normalized, view);
  return view;
}

function answerSegments(answer: string): string[] {
  const safeAnswer = answer
    .replace(/a\.?\s*m\.?/gi, 'am')
    .replace(/p\.?\s*m\.?/gi, 'pm');
  const sentences = safeAnswer
    .split(/[.!?;]+/)
    .flatMap((sentence) => sentence.split(/\s+(?:but|so|because|although|however|therefore)\s+|,\s*/i))
    .map((segment) => segment.trim())
    .filter(Boolean);
  return Array.from(new Set([...sentences, safeAnswer.trim()].filter(Boolean)));
}

function overlapScore(expected: SemanticView, actual: SemanticView): number {
  const expectedTokens = [...expected.tokens].filter((token) => !/^\d+$/.test(token));
  if (!expectedTokens.length) return 0;
  const matches = expectedTokens.filter((token) => actual.tokens.has(token)).length;
  return matches / expectedTokens.length;
}

function thresholdFor(expected: SemanticView): number {
  const size = expected.tokens.size;
  if (size <= 2) return 0.99;
  if (size <= 4) return 0.75;
  if (size <= 8) return 0.55;
  return 0.5;
}

function oppositeRelation(expected: SemanticView, actual: SemanticView): boolean {
  return (expected.relations.has('before') && actual.relations.has('after')) ||
    (expected.relations.has('after') && actual.relations.has('before')) ||
    (expected.relations.has('until') && !actual.relations.has('until') && actual.relations.has('after'));
}

function semanticOpposite(expected: SemanticView, actual: SemanticView): boolean {
  for (const [left, right] of OPPOSITE_PATTERN_PAIRS) {
    if ((expected.markers.has(left) && actual.markers.has(right)) ||
      (expected.markers.has(right) && actual.markers.has(left))) return true;
  }
  return false;
}

function scopedNegation(reference: SemanticView, value: SemanticView): boolean {
  const referenceTokens = [...reference.tokens].filter((token) =>
    !NEGATIONS.has(token) && !NEGATIVE_STATES.has(token) && !RELATIONS.has(token) && !/^\d+$/.test(token));
  const actualTokens = evaluationTokens(value.normalized).map(tokenKey);
  for (let index = 0; index < actualTokens.length; index += 1) {
    const token = actualTokens[index] ?? '';
    if (!referenceTokens.includes(token)) continue;
    const nearby = actualTokens.slice(Math.max(0, index - 3), index + 2);
    if (nearby.some((candidate) => NEGATIONS.has(candidate) || NEGATIVE_STATES.has(candidate))) return true;
  }
  for (const marker of reference.markers) {
    if (!value.markers.has(marker)) continue;
    for (const expression of SEMANTIC_PATTERNS[marker] ?? []) {
      const normalizedExpression = normalizeForEvaluation(expression).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const negatedExpression = new RegExp(`\\b(?:not|never|cannot|did not|has not|have not|was not|were not)\\s+(?:\\w+\\s+){0,2}${normalizedExpression}\\b`);
      if (negatedExpression.test(value.normalized)) return true;
    }
  }
  return reference.markers.has('disagree') && value.markers.has('disagree') ||
    reference.markers.has('offline') && value.markers.has('offline');
}

function polarityMismatch(expected: SemanticView, actual: SemanticView, lexicalScore: number): boolean {
  if (lexicalScore < 0.45) return false;
  return scopedNegation(expected, expected) !== scopedNegation(expected, actual);
}

interface CausalRelation { cause: SemanticView; result: SemanticView }

function parseCausalRelation(value: string): CausalRelation | undefined {
  const normalized = normalizeForEvaluation(value);
  const direct = normalized.match(/^(.+?)\s+(?:caused?|makes?|made|led to|resulted in|forced|was why|prevented)\s+(.+)$/);
  if (direct?.[1] && direct[2]) return { cause: semanticView(direct[1]), result: semanticView(direct[2]) };
  const reverse = normalized.match(/^(.+?)\s+(?:was (?:the )?result of|resulted from|was caused by)\s+(.+)$/);
  if (reverse?.[1] && reverse[2]) return { cause: semanticView(reverse[2]), result: semanticView(reverse[1]) };
  const because = normalized.match(/^(.+?)\s+(?:because|because of|due to)\s+(.+)$/);
  if (because?.[1] && because[2]) return { cause: semanticView(because[2]), result: semanticView(because[1]) };
  return undefined;
}

function invertedCause(expected: string, answer: string): boolean {
  const expectedRelation = parseCausalRelation(expected);
  const answerRelation = parseCausalRelation(answer);
  if (!expectedRelation || !answerRelation) return false;
  return overlapScore(expectedRelation.cause, answerRelation.result) >= 0.5 &&
    overlapScore(expectedRelation.result, answerRelation.cause) >= 0.5;
}

function inferIdeaKind(idea: WritingRequiredIdea): WritingIdeaKind {
  if (idea.kind) return idea.kind;
  const value = normalizeForEvaluation(`${idea.labelVietnamese} ${idea.concepts.join(' ')}`);
  if (/\b(because|reason|cause|due to|why)\b/.test(value) || /vì|lý do|nguyên nhân/.test(value)) return 'cause-explanation';
  if (/\b(today|tomorrow|yesterday|minute|hour|day|week|when|time|date)\b/.test(value) || /phút|giờ|ngày|khi|lúc/.test(value)) return 'time-details';
  if (/\b(will|plan|next|intend)\b/.test(value) || /sẽ|dự định|kế hoạch/.test(value)) return 'future-plan';
  if (/\b(could you|would you|please|request|ask)\b/.test(value) || /vui lòng|có thể|nhờ/.test(value)) return 'polite-request';
  if (/\b(result|recover|fixed|complete|outcome|back up)\b/.test(value) || /kết quả|hoàn thành|khôi phục|hoạt động lại/.test(value)) return 'outcome';
  return 'action';
}

function evaluateIdea(answer: string, idea: WritingRequiredIdea): WritingIdeaEvaluation {
  const segments = answerSegments(answer);
  const expressions = [
    ...idea.concepts,
    ...(idea.semanticPatterns ?? []).flatMap((id) => SEMANTIC_PATTERNS[id] ?? []),
  ];
  let bestScore = 0;
  let contradictionScore = 0;
  for (const expression of expressions) {
    const expected = semanticView(expression);
    for (const segment of segments) {
      const actual = semanticView(segment);
      const score = overlapScore(expected, actual);
      const exact = expressionPresent(actual.normalized, expression);
      const contradictory = !exact && score >= 0.45 && (
        polarityMismatch(expected, actual, score) ||
        oppositeRelation(expected, actual) ||
        semanticOpposite(expected, actual) ||
        invertedCause(expression, segment)
      );
      if (contradictory) contradictionScore = Math.max(contradictionScore, score);
      else bestScore = Math.max(bestScore, score);
    }
  }
  const normalizedAnswer = normalizeForEvaluation(answer);
  if (idea.contradictions?.some((expression) => expressionPresent(normalizedAnswer, expression))) contradictionScore = 1;

  const criticalCovered = (idea.criticalConcepts ?? []).every((concept) => {
    const expected = semanticView(concept);
    return segments.some((segment) => overlapScore(expected, semanticView(segment)) >= thresholdFor(expected));
  });
  const supportingCovered = (idea.supportingConcepts ?? []).filter((concept) => {
    const expected = semanticView(concept);
    return segments.some((segment) => overlapScore(expected, semanticView(segment)) >= thresholdFor(expected));
  }).length;
  const bestThreshold = expressions.length
    ? Math.min(...expressions.map((expression) => thresholdFor(semanticView(expression))))
    : 1;

  let status: WritingIdeaEvaluation['status'];
  if (bestScore >= bestThreshold && criticalCovered) status = 'covered';
  else if (contradictionScore >= 0.45 && contradictionScore > bestScore) status = 'contradicted';
  else if (bestScore >= 0.35 || supportingCovered > 0) status = 'partial';
  else status = 'missing';
  const score = status === 'covered' ? 1 : status === 'partial' ? 0.5 : 0;
  const message = status === 'contradicted'
    ? `Bạn đã viết một ý trái với “${idea.labelVietnamese}”.`
    : status === 'partial'
      ? `Ý “${idea.labelVietnamese}” mới được truyền đạt một phần.`
      : status === 'missing'
        ? `Đoạn viết chưa truyền đạt rõ “${idea.labelVietnamese}”.`
        : undefined;
  return {
    id: idea.id,
    labelVietnamese: idea.labelVietnamese,
    status,
    score,
    kind: inferIdeaKind(idea),
    message,
    communicated: status === 'covered',
  };
}

function measurements(value: string): Array<{ number: string; unit: string }> {
  const clockNormalized = value.toLocaleLowerCase('en')
    .replace(/a\.?\s*m\.?/g, 'am')
    .replace(/p\.?\s*m\.?/g, 'pm');
  const tokens = evaluationTokens(clockNormalized).map(tokenKey);
  const result: Array<{ number: string; unit: string }> = [];
  for (let index = 0; index < tokens.length - 1; index += 1) {
    const number = tokens[index] ?? '';
    const unit = tokens[index + 1] ?? '';
    if (/^\d+$/.test(number) && MEASUREMENT_UNITS.has(unit)) result.push({ number, unit });
  }
  if (/\bhalf an hour\b/.test(normalizeForEvaluation(clockNormalized))) result.push({ number: '30', unit: 'minute' });
  for (let index = 0; index < tokens.length; index += 1) {
    const number = tokens[index] ?? '';
    if (!/^\d+$/.test(number)) continue;
    const context = new Set(tokens.slice(Math.max(0, index - 5), index + 6));
    if (context.has('morning')) result.push({ number, unit: 'am' });
    if (context.has('afternoon') || context.has('evening')) result.push({ number, unit: 'pm' });
  }
  return result;
}

function bestAnchoredSegment(answer: string, anchors: string[] | undefined): string {
  if (!anchors?.length) return answer;
  let best = answer;
  let score = -1;
  for (const segment of answerSegments(answer)) {
    const view = semanticView(segment);
    const current = Math.max(...anchors.map((anchor) => overlapScore(semanticView(anchor), view)));
    if (current > score) { best = segment; score = current; }
  }
  return best;
}

function factResult(fact: WritingCriticalFact, status: WritingFactEvaluation['status'], detail?: string): WritingFactEvaluation {
  return {
    id: fact.id,
    labelVietnamese: fact.labelVietnamese,
    correct: status === 'correct',
    status,
    message: status === 'correct' ? undefined : detail ?? (
      status === 'contradicted'
        ? `Thông tin quan trọng “${fact.labelVietnamese}” bị thay đổi hoặc đảo nghĩa.`
        : `Đoạn viết chưa giữ rõ thông tin “${fact.labelVietnamese}”.`
    ),
  };
}

function evaluateFact(answer: string, fact: WritingCriticalFact): WritingFactEvaluation {
  const automaticAnchors = ['state', 'polarity', 'person', 'location'].includes(fact.type)
    ? fact.expected.filter((value) => value !== 'positive' && value !== 'negative')
    : undefined;
  const scopedAnswer = bestAnchoredSegment(answer, fact.anchors ?? automaticAnchors);
  const normalizedWholeAnswer = normalizeForEvaluation(answer);
  const forbidden = fact.forbidden?.some((value) => expressionPresent(normalizedWholeAnswer, value)) ?? false;
  if (forbidden) return factResult(fact, 'contradicted');

  if (fact.type === 'number' || fact.type === 'time') {
    const expected = fact.expected.flatMap(measurements);
    const actual = measurements(scopedAnswer);
    const correct = expected.some((wanted) => actual.some((found) => wanted.number === found.number && wanted.unit === found.unit));
    if (correct) return factResult(fact, 'correct');
    const expectedUnits = new Set(expected.map((item) => item.unit));
    const conflicting = actual.some((item) => expectedUnits.has(item.unit));
    return factResult(fact, conflicting ? 'contradicted' : 'missing');
  }

  if (fact.type === 'polarity') {
    const view = semanticView(scopedAnswer);
    const expectsNegative = fact.expected.includes('negative');
    const expectsPositive = fact.expected.includes('positive');
    if (expectsNegative || expectsPositive) {
      const correct = expectsNegative ? view.hasNegation : !view.hasNegation;
      return factResult(fact, correct ? 'correct' : 'contradicted');
    }
  }

  if (fact.type === 'cause-result' && fact.cause?.length && fact.result?.length) {
    const relation = parseCausalRelation(scopedAnswer);
    if (relation) {
      const causeScore = Math.max(...fact.cause.map((value) => overlapScore(semanticView(value), relation.cause)));
      const resultScore = Math.max(...fact.result.map((value) => overlapScore(semanticView(value), relation.result)));
      if (causeScore >= 0.5 && resultScore >= 0.5) return factResult(fact, 'correct');
      const reversedCause = Math.max(...fact.cause.map((value) => overlapScore(semanticView(value), relation.result)));
      const reversedResult = Math.max(...fact.result.map((value) => overlapScore(semanticView(value), relation.cause)));
      if (reversedCause >= 0.5 && reversedResult >= 0.5) return factResult(fact, 'contradicted');
    }
    const whole = semanticView(scopedAnswer);
    const causePresent = Math.max(...fact.cause.map((value) => overlapScore(semanticView(value), whole)));
    const resultPresent = Math.max(...fact.result.map((value) => overlapScore(semanticView(value), whole)));
    return factResult(fact, causePresent >= 0.5 && resultPresent >= 0.5 ? 'correct' : 'missing');
  }

  if (fact.type === 'sequence') {
    const expectedRelations = new Set(fact.expected.flatMap((value) => [...semanticView(value).relations]));
    const actualRelations = semanticView(scopedAnswer).relations;
    if ([...expectedRelations].some((relation) => actualRelations.has(relation))) return factResult(fact, 'correct');
    const opposite = (expectedRelations.has('before') && actualRelations.has('after')) ||
      (expectedRelations.has('after') && actualRelations.has('before'));
    return factResult(fact, opposite ? 'contradicted' : 'missing');
  }

  const actual = semanticView(scopedAnswer);
  let best = 0;
  let contradictionScore = 0;
  for (const expected of fact.expected) {
    const expectedView = semanticView(expected);
    const score = overlapScore(expectedView, actual);
    const exact = expressionPresent(actual.normalized, expected);
    const contradicted = !exact && (polarityMismatch(expectedView, actual, score) || semanticOpposite(expectedView, actual));
    if (contradicted) contradictionScore = Math.max(contradictionScore, score);
    else best = Math.max(best, score);
  }
  if (contradictionScore >= 0.45 && contradictionScore > best) return factResult(fact, 'contradicted');
  return factResult(fact, best >= 0.66 ? 'correct' : 'missing');
}

function genericLanguageIssues(answer: string): Mistake[] {
  const normalized = normalizeForEvaluation(answer);
  const issues: Mistake[] = [];
  if (/\b(?:[2-9]|\d{2,})\s+(minute|hour|day|week|month|year)\b/.test(answer.toLocaleLowerCase('en'))) {
    issues.push({
      type: 'singular-plural', original: answer,
      correction: 'Dùng danh từ số nhiều sau số lớn hơn một.',
      explanation: 'Sau một số lớn hơn một, danh từ đếm được cần ở dạng số nhiều.',
    });
  }
  if (/\b(go|went|come|came)\s+(company|office|school|hospital)\b/.test(normalized)) {
    issues.push({
      type: 'preposition', original: answer, correction: 'go to work / arrive at the office',
      explanation: 'Địa điểm thường cần “to/at”, hoặc dùng collocation tự nhiên như “go to work”.',
    });
  }
  if (/\byesterday\b/.test(normalized) && /\b(i|we|he|she|they)\s+(go|feel|come|tell|send|discuss)\b/.test(normalized)) {
    issues.push({
      type: 'tense', original: answer, correction: 'Dùng Past Simple cho sự việc đã xảy ra hôm qua.',
      explanation: 'Mốc “yesterday” cần động từ ở Past Simple.',
    });
  }
  return issues;
}

export function evaluateWriting(answer: string, topic: WritingPracticeTopic): WritingEvaluation {
  const userAnswer = answer.trim();
  // Safe semantic-only normalizations preserve teachable surface errors for the
  // feedback layer while preventing them from being mistaken for changed meaning.
  const semanticAnswer = userAnswer.replace(/\beveryday\b/gi, 'every day');
  const ideas = topic.requiredIdeas.map((idea) => evaluateIdea(semanticAnswer, idea));
  const communicatedWeight = topic.requiredIdeas.reduce(
    (total, idea, index) => total + (ideas[index]?.score ?? 0) * (idea.weight ?? 1), 0,
  );
  const totalWeight = topic.requiredIdeas.reduce((total, idea) => total + (idea.weight ?? 1), 0);
  const meaningCoverage = totalWeight ? communicatedWeight / totalWeight : 0;
  const facts = topic.criticalFacts.map((fact) => evaluateFact(semanticAnswer, fact));
  const criticalErrors = facts.filter((fact) => !fact.correct);
  const contradictions = ideas.filter((idea) => idea.status === 'contradicted');
  const languageIssues = [
    ...detectCommonMistakes(userAnswer, topic.commonMistakes),
    ...genericLanguageIssues(userAnswer),
  ].filter((mistake, index, all) => all.findIndex((candidate) =>
    candidate.type === mistake.type && candidate.explanation === mistake.explanation) === index).slice(0, 3);
  const factRatio = facts.length ? (facts.length - criticalErrors.length) / facts.length : 1;
  const grammarClarity = Math.max(0, 1 - languageIssues.length * 0.18);
  const readable = semanticView(userAnswer).tokens.size >= 2 ? 1 : 0;
  const communicationScore = Math.round(meaningCoverage * 60 + factRatio * 20 + grammarClarity * 15 + readable * 5);
  const fullyCovered = ideas.every((idea) => idea.status === 'covered');
  const status = contradictions.length > 0 || criticalErrors.length > 0 || meaningCoverage < 0.5 || readable === 0
    ? 'needs-improvement'
    : meaningCoverage >= 0.8 && fullyCovered && languageIssues.length === 0
      ? 'communicates-well'
      : 'mostly-correct';

  const quality = analyzeWritingFeedback(userAnswer, topic, ideas, facts, languageIssues);
  const hasMaterialLanguageIssue = quality.feedbackIssues.some((issue) =>
    issue.layer !== 'meaning' && issue.severity !== 'info',
  );
  const finalStatus = status === 'communicates-well' && hasMaterialLanguageIssue
    ? 'mostly-correct'
    : status;
  const finalScore = Math.max(0, communicationScore - (hasMaterialLanguageIssue ? 5 : 0));

  return {
    status: finalStatus,
    communicationScore: finalScore,
    meaningCoverage,
    communicatedIdeas: ideas.filter((idea) => idea.status === 'covered').length,
    totalIdeas: ideas.length,
    ideas,
    facts,
    languageIssues,
    userAnswer,
    betterVersion: topic.sampleAnswers[0] ?? '',
    otherNaturalWay: topic.sampleAnswers[1],
    ...quality,
  };
}

export { SEMANTIC_PATTERNS } from './semantic-patterns';

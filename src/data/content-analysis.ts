import type { Conversation, Difficulty, Topic } from '../types/domain';
import { normalizeSentence } from '../engine/sentence-normalizer';
import { normalizeSearchText } from '../utils/search';

const LEVELS = ['A1', 'A2', 'B1', 'B2'] as const;

const auxiliaries = new Set(['am','are','is','was','were','be','been','being','do','does','did','have','has','had']);
const modals = new Set(['can','could','may','might','must','shall','should','will','would']);
const subjects = new Set(['i','you','he','she','it','we','they','me','him','her','us','them','someone','somebody']);
const determiners = new Set(['a','an','the','this','that','these','those','my','your','his','her','its','our','their','some','any']);
const prepositions = new Set(['about','after','at','before','between','by','for','from','in','into','of','on','over','through','to','under','with','without']);
const conjunctions = new Set(['and','because','but','if','or','so','although','though','unless','while']);
const questionWords = new Set(['how','what','when','where','which','who','whom','whose','why']);
const commonVerbs = new Set(['accept','add','agree','allow','arrive','ask','book','bring','buy','call','cancel','change','check','choose','come','confirm','contact','cost','decide','deliver','discuss','explain','find','finish','follow','get','give','go','help','keep','know','leave','let','like','look','make','mean','meet','move','need','open','order','pay','pick','plan','prefer','provide','put','reach','recommend','refund','remember','report','request','reserve','return','say','send','share','show','start','stay','suggest','take','talk','tell','think','transfer','try','turn','use','wait','want','work']);

function tokenShape(token: string): string {
  if (/^\d+(?:st|nd|rd|th)?$/.test(token)) return 'NUM';
  if (questionWords.has(token)) return 'WH';
  if (subjects.has(token)) return 'SUBJECT';
  if (modals.has(token)) return 'MODAL';
  if (auxiliaries.has(token)) return 'AUX';
  if (determiners.has(token)) return 'DET';
  if (prepositions.has(token)) return 'PREP';
  if (conjunctions.has(token)) return 'CONJ';
  if (commonVerbs.has(token) || token.endsWith('ed') || token.endsWith('ing')) return 'VERB';
  if (token.endsWith('ly')) return 'ADV';
  if (token.endsWith('er') || token.endsWith('est')) return 'ADJ';
  return 'CONTENT';
}

export function structuralSignature(sentence: string): string {
  const prefix = sentence.trim().endsWith('?') ? 'QUESTION' : 'STATEMENT';
  const shapes = normalizeSentence(sentence).split(' ').filter(Boolean).map(tokenShape);
  return `${prefix}:${shapes.join(' ')}`;
}

const objectiveStopWords = new Set(['va','voi','de','cach','khi','trong','mot','nguoi','khac','cua','cho','bang','ve','cac','nhung','duoc']);

export function learningObjectiveSignature(goal: string): string {
  return normalizeSearchText(goal).split(' ').filter((token) => token.length > 1 && !objectiveStopWords.has(token)).sort().join(' ');
}

export function matrixByCategoryAndLevel(topics: readonly Topic[]): Record<string,Record<Difficulty,number>> {
  const matrix: Record<string,Record<Difficulty,number>> = {};
  for (const topic of topics) {
    const row = matrix[topic.category] ?? { A1:0,A2:0,B1:0,B2:0 };
    row[topic.level] += 1;
    matrix[topic.category] = row;
  }
  return Object.fromEntries(Object.entries(matrix).sort(([left],[right]) => left.localeCompare(right)));
}

export function matrixByGrammarAndLevel(topics: readonly Topic[]): Record<string,Record<Difficulty,number>> {
  const matrix: Record<string,Record<Difficulty,number>> = {};
  for (const topic of topics) for (const conversation of topic.conversations) for (const turn of conversation.turns) {
    for (const grammar of turn.grammarPoints ?? []) {
      const row = matrix[grammar] ?? { A1:0,A2:0,B1:0,B2:0 };
      row[topic.level] += 1;
      matrix[grammar] = row;
    }
  }
  return Object.fromEntries(Object.entries(matrix).sort(([left],[right]) => left.localeCompare(right)));
}

export interface RoleBalanceReport {
  averageWords: Record<'A'|'B',number>;
  turns: Record<'A'|'B',number>;
  warnings: Array<{ conversationId:string; topicId:string; reason:string }>;
}

function words(value: string): number {
  return normalizeSentence(value).split(' ').filter(Boolean).length;
}

function conversationRoleWords(conversation: Conversation, role: 'A'|'B'): number[] {
  return conversation.turns.filter((turn) => turn.speaker === role).map((turn) => words(turn.canonicalAnswer));
}

export function analyzeRoleBalance(topics: readonly Topic[]): RoleBalanceReport {
  const totals = { A:0,B:0 };
  const turns = { A:0,B:0 };
  const warnings: RoleBalanceReport['warnings'] = [];
  for (const topic of topics) for (const conversation of topic.conversations) {
    const a = conversationRoleWords(conversation,'A');
    const b = conversationRoleWords(conversation,'B');
    totals.A += a.reduce((sum,value) => sum + value,0);
    totals.B += b.reduce((sum,value) => sum + value,0);
    turns.A += a.length;
    turns.B += b.length;
    const avgA = a.length ? totalsFor(a) : 0;
    const avgB = b.length ? totalsFor(b) : 0;
    const ratio = Math.max(avgA,avgB) / Math.max(1,Math.min(avgA,avgB));
    if (Math.abs(a.length-b.length) > 1) warnings.push({ topicId:topic.id, conversationId:conversation.id, reason:`turn imbalance A:${a.length} B:${b.length}` });
    else if (ratio >= 1.8 && Math.max(avgA,avgB) >= 6) warnings.push({ topicId:topic.id, conversationId:conversation.id, reason:`word imbalance A:${avgA.toFixed(1)} B:${avgB.toFixed(1)}` });
    else if ((avgA < 3 && avgB >= 6) || (avgB < 3 && avgA >= 6)) warnings.push({ topicId:topic.id, conversationId:conversation.id, reason:`weak learner role A:${avgA.toFixed(1)} B:${avgB.toFixed(1)}` });
  }
  return { averageWords:{ A:turns.A ? totals.A/turns.A : 0, B:turns.B ? totals.B/turns.B : 0 }, turns, warnings };
}

function totalsFor(values: number[]): number {
  return values.reduce((sum,value) => sum + value,0) / values.length;
}

export function levelKeys(): readonly Difficulty[] {
  return LEVELS;
}

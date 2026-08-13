import { pathToFileURL } from 'node:url';
import { topics } from '../src/data/index.ts';
import manifestData from '../src/data/topic-manifest.generated.json' with { type: 'json' };
import { evaluateAnswer } from '../src/engine/answer-evaluator/index.ts';
import { normalizeSentence } from '../src/engine/sentence-normalizer/index.ts';
import { analyzeRoleBalance, learningObjectiveSignature, matrixByCategoryAndLevel, matrixByGrammarAndLevel, structuralSignature } from '../src/data/content-analysis.ts';
import type { ConversationTurn, Difficulty, Topic } from '../src/types/domain.ts';
import { FLEXIBLE_INTENTS_V2 } from '../src/data/accepted-answer-hardening.ts';

const evaluationCache = new WeakMap<ConversationTurn,Map<string,boolean>>();

function evaluatorAccepts(answer: string, turn: ConversationTurn): boolean {
  let answers = evaluationCache.get(turn);
  if (!answers) {
    answers = new Map();
    evaluationCache.set(turn, answers);
  }
  const cached = answers.get(answer);
  if (cached !== undefined) return cached;
  const accepted = evaluateAnswer(answer, turn).status === 'correct';
  answers.set(answer, accepted);
  return accepted;
}

export interface ValidationIssue { severity: 'error' | 'warning'; path: string; message: string }
export interface ContentReport {
  topics: number;
  conversations: number;
  turns: number;
  vocabularyItems: number;
  vocabularyAnnotations: number;
  uniqueLearningObjectives: number;
  conversationLength: DistributionStats;
  conversationsPerTopic: DistributionStats;
  speakerAverageWords: { A: number; B: number };
  averageAcceptedAnswers: number;
  acceptedAnswerDistribution: Record<'1'|'2'|'3'|'4+',number>;
  flexibleAcceptedDepth: { turns:number; average:number; canonicalOnly:number };
  evaluator: {
    canonicalCorrect: number;
    canonicalTotal: number;
    acceptedCorrect: number;
    acceptedTotal: number;
  };
  levels: Record<Difficulty, number>;
  categories: Record<string, number>;
  grammar: Record<string, number>;
  categoryLevelMatrix: Record<string,Record<Difficulty,number>>;
  grammarLevelMatrix: Record<string,Record<Difficulty,number>>;
  intents: Record<string,number>;
  relationships: Record<string,number>;
  intentCoverage: number;
  relationshipCoverage: number;
  roleBalance: ReturnType<typeof analyzeRoleBalance>;
  exactCanonicalDuplicates: number;
  normalizedCanonicalDuplicates: number;
  exactVietnameseDuplicates: number;
  sequenceDuplicates: number;
  nearDuplicateWarnings: number;
  levelSentenceWords: Record<Difficulty, DistributionStats>;
  vocabularyByLevel: Record<Difficulty, number>;
  vocabularyFrequency: { once:number; twoToFour:number; fivePlus:number };
  topOpenings: Array<{ phrase:string; count:number }>;
  topTrigrams: Array<{ phrase:string; count:number }>;
  semanticConstraintCoverage: number;
  explanationCoverage: number;
  structuralWarnings: number;
  structuralSignatures: Array<{ signature:string; count:number }>;
  objectiveWarnings: number;
  repeatedFillerPhrases: Array<{ phrase:string; count:number }>;
  vocabularyPhraseRatio: number;
}

export interface DistributionStats {
  min: number;
  max: number;
  average: number;
  median: number;
  distribution: Record<number, number>;
}

function addIssue(issues: ValidationIssue[], severity: ValidationIssue['severity'], path: string, message: string) {
  issues.push({ severity, path, message });
}

function overlapScore(left: ReadonlySet<string>, right: ReadonlySet<string>): number {
  const intersection = [...left].filter((token) => right.has(token)).length;
  const union = new Set([...left, ...right]).size;
  return union ? intersection / union : 0;
}

function vocabularyKey(value: string): string {
  return value.toLowerCase().replace(/wi[\s-]?fi/g, 'wifi').replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
}

function distributionStats(values: number[]): DistributionStats {
  if (!values.length) return { min:0, max:0, average:0, median:0, distribution:{} };
  const sorted = [...values].sort((a,b) => a-b);
  const middle = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 ? (sorted[middle] ?? 0) : ((sorted[middle - 1] ?? 0) + (sorted[middle] ?? 0)) / 2;
  return {
    min: sorted[0] ?? 0,
    max: sorted.at(-1) ?? 0,
    average: values.reduce((sum, value) => sum + value, 0) / values.length,
    median,
    distribution: values.reduce<Record<number,number>>((result, value) => ({ ...result, [value]:(result[value] ?? 0) + 1 }), {}),
  };
}

function topCounts(values: string[], minimum: number, limit = 10): Array<{ phrase:string; count:number }> {
  const counts = new Map<string,number>();
  for (const value of values) if (value) counts.set(value,(counts.get(value) ?? 0)+1);
  return [...counts].filter(([,count]) => count >= minimum).sort((a,b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0,limit).map(([phrase,count]) => ({ phrase,count }));
}

export function validateTopics(dataset: Topic[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const ids = new Map<string, string>();
  const canonicalExact = new Map<string, string>();
  const canonicalNormalized = new Map<string, string>();
  const vietnameseExact = new Map<string, string>();
  const sequences = new Map<string, string>();
  const priorSentences = new Map<number,Array<{ tokens:Set<string>; path:string; leading:Set<string> }>>();
  const validLevels = new Set(['A1','A2','B1','B2']);
  const levelRank: Record<Difficulty, number> = { A1:0, A2:1, B1:2, B2:3 };
  const topicIds = new Set(dataset.map((topic) => topic.id));
  const topicsById = new Map(dataset.map((topic) => [topic.id, topic]));
  const vocabularyLabels = new Map<string, string>();
  const objectivePaths = new Map<string, string>();
  const objectiveSignatures = new Map<string,string>();

  const registerId = (id: string, path: string) => {
    const previous = ids.get(id);
    if (previous) addIssue(issues, 'error', path, `Duplicate ID; first used at ${previous}`);
    else ids.set(id, path);
  };

  for (const topic of dataset) {
    registerId(topic.id, topic.id);
    if (!topic.title.trim() || !topic.titleVi.trim()) addIssue(issues, 'error', topic.id, 'Missing topic title');
    if ([topic.id,topic.title,topic.titleVi,topic.description].some((value) => /\bTODO\b/i.test(value))) addIssue(issues, 'error', topic.id, 'Unresolved TODO marker');
    if (!validLevels.has(topic.level)) addIssue(issues, 'error', topic.id, 'Invalid level');
    if (topic.prerequisite && !topicIds.has(topic.prerequisite)) addIssue(issues, 'error', topic.id, `Broken prerequisite: ${topic.prerequisite}`);
    if (topic.prerequisite === topic.id) addIssue(issues, 'error', topic.id, 'Topic cannot require itself');
    const prerequisite = topic.prerequisite ? topicsById.get(topic.prerequisite) : undefined;
    if (prerequisite && levelRank[prerequisite.level] > levelRank[topic.level]) addIssue(issues, 'error', topic.id, `Prerequisite ${prerequisite.id} has a higher level`);
    if (topic.conversations.length < 2 || topic.conversations.length > 5) addIssue(issues, 'error', topic.id, 'A topic needs two to five conversations');
    const goals = new Set<string>();
    for (const conversation of topic.conversations) {
      registerId(conversation.id, `${topic.id}/${conversation.id}`);
      const conversationPath = `${topic.id}/${conversation.id}`;
      if (!conversation.situation.trim() || !conversation.goal.trim()) addIssue(issues, 'error', conversationPath, 'Missing situation or goal');
      const goalKey = normalizeSentence(conversation.goal);
      if ([conversation.title,conversation.titleVi,conversation.situation,conversation.goal].some((value) => /\bTODO\b/i.test(value))) addIssue(issues, 'error', conversationPath, 'Unresolved TODO marker');
      if (goals.has(goalKey)) addIssue(issues, 'error', conversationPath, 'Duplicate learning objective within topic');
      goals.add(goalKey);
      const priorObjective = objectivePaths.get(goalKey);
      if (priorObjective) addIssue(issues, 'warning', conversationPath, `Learning objective duplicates ${priorObjective}`);
      else objectivePaths.set(goalKey, conversationPath);
      const objectiveSignature = learningObjectiveSignature(conversation.goal);
      const priorObjectiveSignature = objectiveSignatures.get(objectiveSignature);
      if (objectiveSignature && priorObjectiveSignature && priorObjectiveSignature !== priorObjective) addIssue(issues, 'warning', conversationPath, `Learning objective signature resembles ${priorObjectiveSignature}`);
      else if (objectiveSignature) objectiveSignatures.set(objectiveSignature,conversationPath);
      if (conversation.turns.length < 6 || conversation.turns.length > 12) addIssue(issues, 'error', conversationPath, 'Conversation needs six to twelve turns');
      const sequence = conversation.turns.map((turn) => normalizeSentence(turn.canonicalAnswer)).join('|');
      const previousSequence = sequences.get(sequence);
      if (previousSequence) addIssue(issues, 'error', conversationPath, `Duplicate conversation sequence; first used at ${previousSequence}`);
      else sequences.set(sequence, conversationPath);
      for (const turn of conversation.turns) {
        const path = `${conversationPath}/${turn.id}`;
        registerId(turn.id, path);
        if (turn.speaker !== 'A' && turn.speaker !== 'B') addIssue(issues, 'error', path, 'Invalid speaker');
        if (!turn.vietnamese.trim()) addIssue(issues, 'error', path, 'Missing Vietnamese prompt');
        if (!turn.canonicalAnswer.trim()) addIssue(issues, 'error', path, 'Missing canonical answer');
        if ([turn.vietnamese,turn.canonicalAnswer,turn.explanation,turn.hint].some((value) => /\bTODO\b/i.test(value ?? ''))) addIssue(issues, 'error', path, 'Unresolved TODO marker');
        if (!validLevels.has(turn.difficulty)) addIssue(issues, 'error', path, 'Invalid turn level');
        if (!turn.hint?.trim()) addIssue(issues, 'error', path, 'Missing hint');
        const acceptedNormalized = turn.acceptedAnswers.map(normalizeSentence);
        if (!acceptedNormalized.includes(normalizeSentence(turn.canonicalAnswer))) addIssue(issues, 'error', path, 'Canonical answer must be accepted');
        if (new Set(acceptedNormalized).size !== acceptedNormalized.length) addIssue(issues, 'error', path, 'Duplicated accepted answer');
        for (const accepted of turn.acceptedAnswers) if (!evaluatorAccepts(accepted, turn)) addIssue(issues, 'error', path, `Evaluator rejected accepted answer: ${accepted}`);
        if (!evaluatorAccepts(turn.canonicalAnswer, turn)) addIssue(issues, 'error', path, 'Evaluator rejected canonical answer');

        const exactCanonical = turn.canonicalAnswer.trim();
        const normalizedCanonical = normalizeSentence(turn.canonicalAnswer);
        const exactVietnamese = turn.vietnamese.trim();
        const previousExact = canonicalExact.get(exactCanonical);
        const previousNormalized = canonicalNormalized.get(normalizedCanonical);
        const previousVietnamese = vietnameseExact.get(exactVietnamese);
        if (previousExact) addIssue(issues, 'error', path, `Exact canonical duplicate; first used at ${previousExact}`); else canonicalExact.set(exactCanonical, path);
        if (previousNormalized && previousNormalized !== previousExact) addIssue(issues, 'error', path, `Normalized canonical duplicate; first used at ${previousNormalized}`); else canonicalNormalized.set(normalizedCanonical, path);
        if (previousVietnamese) addIssue(issues, 'error', path, `Exact Vietnamese duplicate; first used at ${previousVietnamese}`); else vietnameseExact.set(exactVietnamese, path);

        const canonicalWords = normalizedCanonical.split(' ').filter(Boolean);
        if (canonicalWords.length >= 5) {
          const leading = new Set(canonicalWords.slice(0,2));
          const tokens = new Set(canonicalWords);
          const candidates = [canonicalWords.length-1,canonicalWords.length,canonicalWords.length+1].flatMap((length) => priorSentences.get(length) ?? []);
          for (const prior of candidates) {
            if (![...leading].some((token) => prior.leading.has(token))) continue;
            if (overlapScore(tokens, prior.tokens) >= 0.9) {
              addIssue(issues, 'warning', path, `Near-duplicate canonical; compare ${prior.path}`);
              break;
            }
          }
          const bucket = priorSentences.get(canonicalWords.length) ?? [];
          bucket.push({ tokens, path, leading });
          priorSentences.set(canonicalWords.length,bucket);
        }
        for (const word of turn.vocabulary ?? []) {
          if (!word.word.trim() || !word.meaning.trim() || !word.example.trim()) addIssue(issues, 'error', path, 'Malformed vocabulary item');
          const key = vocabularyKey(word.word);
          const priorLabel = vocabularyLabels.get(key);
          if (priorLabel && priorLabel !== word.word) addIssue(issues, 'warning', path, `Vocabulary label variant “${word.word}” duplicates “${priorLabel}”`);
          else vocabularyLabels.set(key, word.word);
        }
      }
    }
  }
  for (const topic of dataset) {
    const visited = new Set<string>();
    let current: Topic | undefined = topic;
    while (current?.prerequisite) {
      if (visited.has(current.id)) {
        addIssue(issues, 'error', topic.id, 'Prerequisite cycle detected');
        break;
      }
      visited.add(current.id);
      current = topicsById.get(current.prerequisite);
    }
  }
  const manifest = manifestData as Array<{ id:string; title:string; category:string; conversationCount:number; turnCount:number; searchText:string }>;
  if (manifest.length !== dataset.length) addIssue(issues, 'error', 'manifest', `Manifest has ${manifest.length} topics but dataset has ${dataset.length}`);
  for (const topic of dataset) {
    const summary = manifest.find((item) => item.id === topic.id);
    if (!summary) { addIssue(issues, 'error', topic.id, 'Topic is missing from lightweight manifest'); continue; }
    const turnCount = topic.conversations.reduce((sum, conversation) => sum + conversation.turns.length, 0);
    if (summary.title !== topic.title || summary.category !== topic.category || summary.conversationCount !== topic.conversations.length || summary.turnCount !== turnCount || !summary.searchText) addIssue(issues, 'error', topic.id, 'Lightweight manifest is stale; run npm run content:manifest');
  }
  if (dataset.length >= 100) {
    const counts = dataset.reduce<Record<Difficulty,number>>((result, topic) => ({ ...result, [topic.level]:result[topic.level] + 1 }), { A1:0,A2:0,B1:0,B2:0 });
    // Batch D closes at the explicitly planned 114/150/147/89 level allocation.
    const ranges: Record<Difficulty,[number,number]> = { A1:[0.22,0.31], A2:[0.29,0.36], B1:[0.24,0.31], B2:[0.09,0.19] };
    for (const level of Object.keys(ranges) as Difficulty[]) {
      const ratio = counts[level] / dataset.length;
      const [min,max] = ranges[level];
      if (ratio < min || ratio > max) addIssue(issues, 'warning', 'levels', `${level} distribution ${(ratio * 100).toFixed(1)}% is outside ${min * 100}–${max * 100}%`);
    }
  }
  if (dataset.length >= 50) {
    const conversationLengths = dataset.flatMap((topic) => topic.conversations.map((conversation) => conversation.turns.length));
    const lengthCounts = distributionStats(conversationLengths).distribution;
    const dominantLength = Math.max(...Object.values(lengthCounts));
    if (dominantLength / conversationLengths.length > 0.75) addIssue(issues, 'warning', 'distribution', 'More than 75% of conversations have the same turn count');
    const topicCounts = dataset.map((topic) => topic.conversations.length);
    const dominantTopicCount = Math.max(...Object.values(distributionStats(topicCounts).distribution));
    if (dominantTopicCount / topicCounts.length > 0.75) addIssue(issues, 'warning', 'distribution', 'More than 75% of topics have the same conversation count');
  }
  if (dataset.length < 50) addIssue(issues, 'warning', 'dataset', `Seed currently has ${dataset.length}/50 target topics`);
  return issues;
}

export function createContentReport(dataset: Topic[], issues = validateTopics(dataset)): ContentReport {
  const levels: Record<Difficulty, number> = { A1:0, A2:0, B1:0, B2:0 };
  const categories: Record<string, number> = {};
  const grammar: Record<string, number> = {};
  for (const topic of dataset) {
    levels[topic.level] += 1;
    categories[topic.category] = (categories[topic.category] ?? 0) + 1;
  }
  const allTurns = dataset.flatMap((topic) => topic.conversations.flatMap((conversation) => conversation.turns));
  for (const turn of allTurns) for (const tag of turn.grammarPoints ?? []) grammar[tag] = (grammar[tag] ?? 0) + 1;
  const allConversations = dataset.flatMap((topic) => topic.conversations);
  const intents = allConversations.reduce<Record<string,number>>((result,conversation) => {
    if (conversation.intent) result[conversation.intent] = (result[conversation.intent] ?? 0) + 1;
    return result;
  },{});
  const relationships = allConversations.reduce<Record<string,number>>((result,conversation) => {
    if (conversation.relationship) result[conversation.relationship] = (result[conversation.relationship] ?? 0) + 1;
    return result;
  },{});
  const vocabularyAnnotations = allTurns.flatMap((turn) => turn.vocabulary ?? []);
  const vocabularyItems = new Set(vocabularyAnnotations.map((item) => vocabularyKey(item.word))).size;
  const vocabularyCounts = vocabularyAnnotations.reduce<Record<string,number>>((result,item) => {
    const key = vocabularyKey(item.word);
    result[key] = (result[key] ?? 0) + 1;
    return result;
  },{});
  const vocabularyByLevel = { A1:0,A2:0,B1:0,B2:0 } satisfies Record<Difficulty,number>;
  const levelVocabulary = { A1:new Set<string>(),A2:new Set<string>(),B1:new Set<string>(),B2:new Set<string>() };
  const levelWords = { A1:[] as number[],A2:[] as number[],B1:[] as number[],B2:[] as number[] };
  for (const topic of dataset) for (const conversation of topic.conversations) for (const turn of conversation.turns) {
    levelWords[topic.level].push(normalizeSentence(turn.canonicalAnswer).split(' ').filter(Boolean).length);
    for (const item of turn.vocabulary ?? []) levelVocabulary[topic.level].add(vocabularyKey(item.word));
  }
  for (const level of Object.keys(vocabularyByLevel) as Difficulty[]) vocabularyByLevel[level] = levelVocabulary[level].size;
  const normalizedAnswers = allTurns.map((turn) => normalizeSentence(turn.canonicalAnswer));
  const openings = normalizedAnswers.map((answer) => answer.split(' ').slice(0,3).join(' '));
  const trigrams = normalizedAnswers.flatMap((answer) => {
    const words = answer.split(' ');
    return words.slice(0,-2).map((_word,index) => words.slice(index,index+3).join(' '));
  });
  const topOpenings = topCounts(openings, Math.max(5,Math.ceil(allTurns.length * .01)));
  const topTrigrams = topCounts(trigrams, Math.max(8,Math.ceil(allTurns.length * .015)));
  const signatureCounts = allTurns.reduce<Record<string,number>>((result,turn) => {
    const signature = structuralSignature(turn.canonicalAnswer);
    result[signature] = (result[signature] ?? 0) + 1;
    return result;
  },{});
  const structuralThreshold = Math.max(25,Math.ceil(allTurns.length * .015));
  const structuralSignatures = Object.entries(signatureCounts).filter(([,count]) => count >= structuralThreshold).sort((left,right) => right[1]-left[1]).slice(0,20).map(([signature,count]) => ({ signature,count }));
  const fillers = ['sure no problem','that sounds good','okay thanks','no worries'];
  const repeatedFillerPhrases = fillers.map((phrase) => ({ phrase, count:normalizedAnswers.filter((answer) => answer.includes(phrase)).length })).filter((item) => item.count > 0).sort((left,right) => right.count-left.count);
  const speakerWords = { A:0, B:0 };
  const speakerTurns = { A:0, B:0 };
  for (const turn of allTurns) {
    speakerWords[turn.speaker] += normalizeSentence(turn.canonicalAnswer).split(' ').filter(Boolean).length;
    speakerTurns[turn.speaker] += 1;
  }
  const accepted = allTurns.flatMap((turn) => turn.acceptedAnswers.map((answer) => ({ turn, answer })));
  const flexibleTurns = dataset.flatMap((topic) => topic.conversations.filter((conversation) => conversation.intent && FLEXIBLE_INTENTS_V2.has(conversation.intent)).flatMap((conversation) => conversation.turns));
  const acceptedAnswerDistribution = allTurns.reduce<ContentReport['acceptedAnswerDistribution']>((result,turn) => {
    const bucket = turn.acceptedAnswers.length >= 4 ? '4+' : String(turn.acceptedAnswers.length) as '1'|'2'|'3';
    result[bucket] += 1;
    return result;
  },{'1':0,'2':0,'3':0,'4+':0});
  return {
    topics: dataset.length,
    conversations: dataset.reduce((sum, topic) => sum + topic.conversations.length, 0),
    turns: allTurns.length,
    vocabularyItems,
    vocabularyAnnotations: vocabularyAnnotations.length,
    uniqueLearningObjectives: new Set(allConversations.map((conversation) => normalizeSentence(conversation.goal))).size,
    conversationLength: distributionStats(allConversations.map((conversation) => conversation.turns.length)),
    conversationsPerTopic: distributionStats(dataset.map((topic) => topic.conversations.length)),
    speakerAverageWords: {
      A: speakerTurns.A ? speakerWords.A / speakerTurns.A : 0,
      B: speakerTurns.B ? speakerWords.B / speakerTurns.B : 0,
    },
    averageAcceptedAnswers: allTurns.length ? allTurns.reduce((sum, turn) => sum + turn.acceptedAnswers.length, 0) / allTurns.length : 0,
    acceptedAnswerDistribution,
    flexibleAcceptedDepth: {
      turns:flexibleTurns.length,
      average:flexibleTurns.length ? flexibleTurns.reduce((sum,turn) => sum + turn.acceptedAnswers.length,0) / flexibleTurns.length : 0,
      canonicalOnly:flexibleTurns.filter((turn) => turn.acceptedAnswers.length === 1).length,
    },
    evaluator: {
      canonicalCorrect: allTurns.filter((turn) => evaluatorAccepts(turn.canonicalAnswer, turn)).length,
      canonicalTotal: allTurns.length,
      acceptedCorrect: accepted.filter(({ turn, answer }) => evaluatorAccepts(answer, turn)).length,
      acceptedTotal: accepted.length,
    },
    levels, categories, grammar,
    categoryLevelMatrix:matrixByCategoryAndLevel(dataset),
    grammarLevelMatrix:matrixByGrammarAndLevel(dataset),
    intents,
    relationships,
    intentCoverage:allConversations.length ? allConversations.filter((conversation) => conversation.intent).length/allConversations.length : 0,
    relationshipCoverage:allConversations.length ? allConversations.filter((conversation) => conversation.relationship).length/allConversations.length : 0,
    roleBalance:analyzeRoleBalance(dataset),
    exactCanonicalDuplicates: issues.filter((issue) => issue.message.startsWith('Exact canonical duplicate')).length,
    normalizedCanonicalDuplicates: issues.filter((issue) => issue.message.startsWith('Normalized canonical duplicate')).length,
    exactVietnameseDuplicates: issues.filter((issue) => issue.message.startsWith('Exact Vietnamese duplicate')).length,
    sequenceDuplicates: issues.filter((issue) => issue.message.startsWith('Duplicate conversation sequence')).length,
    nearDuplicateWarnings: issues.filter((issue) => issue.message.startsWith('Near-duplicate')).length,
    levelSentenceWords: { A1:distributionStats(levelWords.A1), A2:distributionStats(levelWords.A2), B1:distributionStats(levelWords.B1), B2:distributionStats(levelWords.B2) },
    vocabularyByLevel,
    vocabularyFrequency: {
      once:Object.values(vocabularyCounts).filter((count) => count === 1).length,
      twoToFour:Object.values(vocabularyCounts).filter((count) => count >= 2 && count <= 4).length,
      fivePlus:Object.values(vocabularyCounts).filter((count) => count >= 5).length,
    },
    topOpenings,
    topTrigrams,
    semanticConstraintCoverage:allTurns.length ? allTurns.filter((turn) => turn.semanticConstraints).length / allTurns.length : 0,
    explanationCoverage:allTurns.length ? allTurns.filter((turn) => turn.explanation?.trim()).length / allTurns.length : 0,
    structuralWarnings:structuralSignatures.length,
    structuralSignatures,
    objectiveWarnings:issues.filter((issue) => issue.message.startsWith('Learning objective')).length,
    repeatedFillerPhrases,
    vocabularyPhraseRatio:vocabularyItems ? new Set(vocabularyAnnotations.filter((item) => /[ -]/.test(item.word.trim())).map((item) => vocabularyKey(item.word))).size/vocabularyItems : 0,
  };
}

export function printReport(report: ContentReport) {
  console.log('SpringEnglishDaily — Content Report V4');
  console.log('\nSUMMARY');
  console.log(`Topics: ${report.topics}\nConversations: ${report.conversations}\nTurns: ${report.turns}\nUnique vocabulary: ${report.vocabularyItems}\nVocabulary annotations: ${report.vocabularyAnnotations}\nUnique learning objectives: ${report.uniqueLearningObjectives}`);
  console.log('\nLevels');
  for (const [level, count] of Object.entries(report.levels)) console.log(`${level}: ${count}`);
  console.log('\nCategories');
  for (const [category, count] of Object.entries(report.categories).sort()) console.log(`${category}: ${count}`);
  console.log('\nCONVERSATION LENGTH');
  console.log(`Min: ${report.conversationLength.min}\nMax: ${report.conversationLength.max}\nAverage: ${report.conversationLength.average.toFixed(2)}\nMedian: ${report.conversationLength.median}`);
  console.log(`Distribution: ${Object.entries(report.conversationLength.distribution).map(([length,count]) => `${length}:${count}`).join(', ')}`);
  console.log('\nCONVERSATIONS PER TOPIC');
  console.log(`Min: ${report.conversationsPerTopic.min}\nMax: ${report.conversationsPerTopic.max}\nAverage: ${report.conversationsPerTopic.average.toFixed(2)}\nMedian: ${report.conversationsPerTopic.median}`);
  console.log('\nSPEAKER BALANCE');
  console.log(`A average words: ${report.roleBalance.averageWords.A.toFixed(2)} across ${report.roleBalance.turns.A} turns\nB average words: ${report.roleBalance.averageWords.B.toFixed(2)} across ${report.roleBalance.turns.B} turns`);
  console.log(`Imbalance warnings: ${report.roleBalance.warnings.length}`);
  console.log(`Average accepted answers/turn: ${report.averageAcceptedAnswers.toFixed(2)}`);
  console.log(`Accepted answers/turn — 1:${report.acceptedAnswerDistribution['1']}, 2:${report.acceptedAnswerDistribution['2']}, 3:${report.acceptedAnswerDistribution['3']}, 4+:${report.acceptedAnswerDistribution['4+']}`);
  console.log(`Flexible-turn accepted depth: ${report.flexibleAcceptedDepth.average.toFixed(2)} across ${report.flexibleAcceptedDepth.turns} turns (${report.flexibleAcceptedDepth.canonicalOnly} canonical-only)`);
  console.log('\nLEVEL SENTENCE LENGTH (WORDS)');
  for (const [level,stats] of Object.entries(report.levelSentenceWords)) console.log(`${level}: avg ${stats.average.toFixed(2)}, median ${stats.median}, range ${stats.min}–${stats.max}`);
  console.log('\nVOCABULARY COVERAGE');
  for (const [level,count] of Object.entries(report.vocabularyByLevel)) console.log(`${level}: ${count} unique items`);
  console.log(`Frequency buckets — once: ${report.vocabularyFrequency.once}, 2–4: ${report.vocabularyFrequency.twoToFour}, 5+: ${report.vocabularyFrequency.fivePlus}`);
  console.log(`Phrase/collocation ratio: ${(report.vocabularyPhraseRatio * 100).toFixed(1)}%`);
  console.log(`Explanation coverage: ${(report.explanationCoverage * 100).toFixed(1)}%`);
  console.log(`Semantic constraint coverage: ${(report.semanticConstraintCoverage * 100).toFixed(1)}%`);
  console.log('\nREPETITION SIGNALS');
  console.log(`Top openings: ${report.topOpenings.map((item) => `${item.phrase} (${item.count})`).join(', ') || 'none'}`);
  console.log(`Top trigrams: ${report.topTrigrams.map((item) => `${item.phrase} (${item.count})`).join(', ') || 'none'}`);
  console.log(`Structural warnings: ${report.structuralWarnings}`);
  console.log(`Top structural signatures: ${report.structuralSignatures.map((item) => `${item.signature} (${item.count})`).join(', ') || 'none'}`);
  console.log(`Objective warnings: ${report.objectiveWarnings}`);
  console.log(`Repeated filler: ${report.repeatedFillerPhrases.map((item) => `${item.phrase} (${item.count})`).join(', ') || 'none'}`);
  console.log('\nINTENTS & REGISTER');
  console.log(`Intent metadata coverage: ${(report.intentCoverage*100).toFixed(1)}%`);
  for (const [intent,count] of Object.entries(report.intents).sort()) console.log(`${intent}: ${count}`);
  console.log(`Relationship metadata coverage: ${(report.relationshipCoverage*100).toFixed(1)}%`);
  for (const [relationship,count] of Object.entries(report.relationships).sort()) console.log(`${relationship}: ${count}`);
  console.log('\nCATEGORY × LEVEL');
  console.log('Category\tA1\tA2\tB1\tB2');
  for (const [category,row] of Object.entries(report.categoryLevelMatrix)) console.log(`${category}\t${row.A1}\t${row.A2}\t${row.B1}\t${row.B2}`);
  console.log('\nGrammar coverage');
  for (const [grammar, count] of Object.entries(report.grammar).sort()) console.log(`${grammar}: ${count}`);
  console.log('\nContent quality');
  console.log(`Exact canonical duplicates: ${report.exactCanonicalDuplicates}`);
  console.log(`Normalized canonical duplicates: ${report.normalizedCanonicalDuplicates}`);
  console.log(`Exact Vietnamese duplicates: ${report.exactVietnameseDuplicates}`);
  console.log(`Duplicate sequences: ${report.sequenceDuplicates}`);
  console.log(`Near-duplicate warnings: ${report.nearDuplicateWarnings}`);
  console.log('\nEVALUATOR');
  console.log(`Canonical correct: ${report.evaluator.canonicalCorrect}/${report.evaluator.canonicalTotal}`);
  console.log(`Accepted variants correct: ${report.evaluator.acceptedCorrect}/${report.evaluator.acceptedTotal}`);
}

function runValidation() {
  const issues = validateTopics(topics);
  for (const issue of issues) console[issue.severity === 'error' ? 'error' : 'warn'](`[${issue.severity}] ${issue.path}: ${issue.message}`);
  printReport(createContentReport(topics, issues));
  if (issues.some((issue) => issue.severity === 'error')) process.exit(1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) runValidation();

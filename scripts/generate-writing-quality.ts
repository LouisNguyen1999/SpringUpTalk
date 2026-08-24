import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { writingLearningUnits } from '../src/engine/writing-learning-path/units.ts';
import { WRITING_MASTERY_SKILLS } from '../src/engine/writing-mastery/index.ts';
import type {
  Difficulty,
  WritingMasterySkill,
  WritingPedagogicalFingerprint,
  WritingPracticeTopic,
} from '../src/types/domain.ts';
import { loadWritingData } from './writing-utils.ts';

const projectRoot = new URL('../', import.meta.url);
const fingerprintOutput = new URL('src/data/writing/generated/writing-pedagogical-fingerprints.generated.json', projectRoot);
const feedbackIndexOutput = new URL('src/data/writing/generated/writing-feedback-index.generated.json', projectRoot);
const reportOutput = new URL('writing_quality_report.json', projectRoot);
const { manifest, path, topics } = loadWritingData();
const metadataByTopic = new Map(path.map((item) => [item.topicId, item]));
const unitById = new Map(writingLearningUnits.map((item) => [item.id, item]));

function normalized(value: string): string {
  return value.toLocaleLowerCase('en').normalize('NFKD')
    .replace(/[“”‘’]/g, "'")
    .replace(/\b\d+\b/g, '<number>')
    .replace(/[^\p{L}\p{N}<>]+/gu, ' ')
    .trim();
}

function stableHash(value: string): number {
  let result = 2166136261;
  for (const character of value) {
    result ^= character.charCodeAt(0);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function masterySkills(topic: WritingPracticeTopic): WritingMasterySkill[] {
  const skills = new Set<WritingMasterySkill>();
  const structures = new Set(topic.usefulStructures);
  if (structures.has('be')) skills.add('subject-be');
  if (structures.has('present-simple')) skills.add('present-simple');
  if (structures.has('past-simple')) skills.add('past-narration');
  if (structures.has('negation')) skills.add('negation');
  if (structures.has('questions')) skills.add('question-formation');
  if (topic.requiredIdeas.some((item) => item.kind === 'time-details')) skills.add('time-expressions');
  if (topic.requiredIdeas.length > 3) skills.add('sentence-expansion');
  if (topic.writingType === 'story') skills.add('story-sequencing');
  else skills.add('problem-solution-writing');
  skills.add(topic.domain === 'it-work' ? 'it-communication' : 'workplace-writing');
  skills.add('paraphrasing');
  if (topic.level === 'B1' || topic.level === 'B2') {
    skills.add('connectors'); skills.add('natural-expression'); skills.add('collocations');
  }
  return [...skills];
}

function signatureParts(topic: WritingPracticeTopic) {
  const metadata = metadataByTopic.get(topic.id);
  const stages = topic.requiredIdeas.map((idea) => idea.arcStage ?? idea.kind ?? 'idea').join('>');
  const kinds = topic.requiredIdeas.map((idea) => idea.kind ?? 'action').join('>');
  const grammar = [...new Set(topic.usefulStructures)].sort().join('+');
  const writing = `${topic.writingType}:${topic.requiredIdeas.length}:${stages}`;
  const reasoning = `${topic.writingType}:${kinds}:${topic.criticalFacts.map((item) => item.type).sort().join('+') || 'no-facts'}`;
  const context = `${topic.domain}:${normalized(topic.category)}:${normalized(topic.context)}`;
  const concepts = topic.requiredIdeas.map((idea) => normalized(idea.concepts[0] ?? '')
    .split(' ').filter((word) => word.length > 3).slice(-3).join('-')).join('|');
  const semantic = `${topic.domain}:${topic.writingType}:${kinds}:${concepts}`;
  const pedagogical = `${metadata?.skills.slice().sort().join('+')}:${grammar}:${reasoning}`;
  return { stages, kinds, grammar, writing, reasoning, context, semantic, pedagogical };
}

const fingerprints: WritingPedagogicalFingerprint[] = topics.map((topic) => {
  const metadata = metadataByTopic.get(topic.id);
  if (!metadata) throw new Error(`Missing path metadata for ${topic.id}`);
  const unit = unitById.get(metadata.unitId);
  if (!unit) throw new Error(`Missing unit ${metadata.unitId}`);
  const patterns = signatureParts(topic);
  return {
    stableId: topic.id,
    unitId: metadata.unitId,
    cefr: topic.level,
    writingSkill: metadata.skills,
    writingGoal: unit.goal,
    grammarTargets: topic.usefulStructures,
    vocabularyFocus: topic.usefulVocabulary,
    sentencePatterns: topic.sampleAnswers.map((answer) => normalized(answer)),
    communicationFunction: metadata.skills[0] ?? 'describe-situation',
    contextType: `${topic.domain}:${normalized(topic.category).replaceAll(' ', '-')}`,
    cognitiveLevel: topic.level === 'A1' ? 'recall' : topic.level === 'A2' ? 'apply' : topic.level === 'B1' ? 'organize' : 'analyze',
    difficulty: metadata.difficultyScore,
    criticalFacts: topic.criticalFacts,
    requiredIdeas: topic.requiredIdeas,
    optionalIdeas: [],
    acceptableVariations: [...new Set([
      ...topic.sampleAnswers,
      ...topic.requiredIdeas.flatMap((idea) => idea.concepts),
    ])],
    commonMistakes: topic.commonMistakes,
    reasoningPattern: patterns.reasoning,
    writingPattern: patterns.writing,
    grammarPattern: patterns.grammar,
    contextPattern: patterns.context,
    semanticPattern: patterns.semantic,
    masterySkills: masterySkills(topic),
  };
});

function groupsBy(values: Array<{ id: string; signature: string }>) {
  const groups = new Map<string, string[]>();
  for (const item of values) groups.set(item.signature, [...(groups.get(item.signature) ?? []), item.id]);
  return [...groups.entries()]
    .filter(([, ids]) => ids.length > 1)
    .map(([signature, topicIds]) => ({ signature, topicIds, pairCount: topicIds.length * (topicIds.length - 1) / 2 }))
    .sort((left, right) => right.topicIds.length - left.topicIds.length || left.signature.localeCompare(right.signature));
}

const semanticClusters = groupsBy(fingerprints.map((item) => ({ id: item.stableId, signature: item.semanticPattern })));
const writingPatternClusters = groupsBy(fingerprints.map((item) => ({ id: item.stableId, signature: item.writingPattern })));
const reasoningClusters = groupsBy(fingerprints.map((item) => ({ id: item.stableId, signature: item.reasoningPattern })));
const grammarClusters = groupsBy(fingerprints.map((item) => ({ id: item.stableId, signature: item.grammarPattern })));
const contextClusters = groupsBy(fingerprints.map((item) => ({ id: item.stableId, signature: item.contextPattern })));
const pedagogicalClusters = groupsBy(topics.map((topic) => ({ id: topic.id, signature: signatureParts(topic).pedagogical })));

function semanticTokens(topic: WritingPracticeTopic): Set<string> {
  return new Set(topic.requiredIdeas.flatMap((idea) => idea.concepts)
    .flatMap((value) => normalized(value).split(' '))
    .filter((value) => value.length > 3 && !['this', 'that', 'with', 'from', 'have', 'will', 'would', 'could', 'should'].includes(value)));
}

const semanticSets = new Map(topics.map((topic) => [topic.id, semanticTokens(topic)]));
const semanticNearPairs: Array<{ left: string; right: string; similarity: number }> = [];
for (let leftIndex = 0; leftIndex < topics.length; leftIndex += 1) {
  const left = topics[leftIndex]!;
  const leftSet = semanticSets.get(left.id)!;
  for (let rightIndex = leftIndex + 1; rightIndex < topics.length; rightIndex += 1) {
    const right = topics[rightIndex]!;
    if (left.writingType !== right.writingType || left.requiredIdeas.length !== right.requiredIdeas.length) continue;
    const rightSet = semanticSets.get(right.id)!;
    const intersection = [...leftSet].filter((value) => rightSet.has(value)).length;
    const union = new Set([...leftSet, ...rightSet]).size;
    const similarity = union ? intersection / union : 0;
    if (similarity >= 0.72) semanticNearPairs.push({ left: left.id, right: right.id, similarity: Math.round(similarity * 100) });
  }
}
const pedagogicalClusterSize = new Map(pedagogicalClusters.flatMap((cluster) => cluster.topicIds.map((id) => [id, cluster.topicIds.length] as const)));

const LEVEL_RANGE: Record<Difficulty, [number, number]> = { A1: [0, 45], A2: [18, 65], B1: [35, 82], B2: [52, 100] };
const topicScores = topics.map((topic) => {
  const metadata = metadataByTopic.get(topic.id)!;
  const allSamplesWellFormed = topic.sampleAnswers.every((answer) => /^[A-Z“"'I]/.test(answer) && /[.!?][”"']?$/.test(answer.trim()));
  const averageAlternatives = topic.requiredIdeas.reduce((sum, idea) => sum + idea.concepts.length, 0) / Math.max(1, topic.requiredIdeas.length);
  const uniquenessCluster = pedagogicalClusterSize.get(topic.id) ?? 1;
  const [minimum, maximum] = LEVEL_RANGE[topic.level];
  const scores = {
    englishNaturalness: allSamplesWellFormed && topic.sampleAnswers.every((answer) => answer.split(/\s+/).length >= 8) ? 96 : 78,
    vietnameseClarity: topic.vietnameseSourceText.length >= 60 && /[.!?…”]/.test(topic.vietnameseSourceText) ? 98 : 82,
    targetAlignment: metadata.skills.length && topic.usefulStructures.length && topic.usefulVocabulary.length ? 98 : 70,
    answerFlexibility: Math.min(100, 64 + topic.sampleAnswers.length * 6 + Math.round(averageAlternatives * 5)),
    grammarValidity: topic.commonMistakes.length >= 3 && allSamplesWellFormed ? 97 : 82,
    vocabularyAppropriateness: topic.usefulVocabulary.length >= 4 && topic.usefulVocabulary.length <= 16 ? 96 : 84,
    contextQuality: topic.context.length >= 25 && topic.category.length >= 2 ? 96 : 78,
    pedagogicalUniqueness: Math.max(72, 100 - (uniquenessCluster - 1) * 4),
    difficultyAccuracy: metadata.difficultyScore >= minimum && metadata.difficultyScore <= maximum ? 96 : 76,
  };
  const overall = Math.round(Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.values(scores).length);
  return { topicId: topic.id, ...scores, overall, status: overall >= 85 ? 'PASS' : 'REVIEW' };
});

const pairCount = (clusters: Array<{ pairCount: number }>) => clusters.reduce((sum, item) => sum + item.pairCount, 0);
const average = (values: number[]) => Math.round(values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length) * 100) / 100;
const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  method: 'Deterministic offline audit of content shape, accepted alternatives, path targets and pedagogical fingerprints. Similarity clusters are candidate-review signals, not automatic proof that two topics are interchangeable.',
  totals: {
    topics: topics.length,
    manifest: manifest.length,
    learningPathMappings: path.length,
    units: writingLearningUnits.length,
    fingerprints: fingerprints.length,
    topicsModified: 0,
    pass: topicScores.filter((item) => item.status === 'PASS').length,
    review: topicScores.filter((item) => item.status === 'REVIEW').length,
  },
  coverage: {
    topicsWithAtLeastThreeSamples: topics.filter((topic) => topic.sampleAnswers.length >= 3).length,
    topicsWithAlternativeForEveryIdea: topics.filter((topic) => topic.requiredIdeas.every((idea) => idea.concepts.length >= 2)).length,
    averageAcceptedVariationsPerTopic: average(fingerprints.map((item) => item.acceptableVariations.length)),
    topicsWithGrammarTargets: topics.filter((topic) => topic.usefulStructures.length > 0).length,
    topicsWithVocabularyTargets: topics.filter((topic) => topic.usefulVocabulary.length > 0).length,
    topicsWithCriticalFacts: topics.filter((topic) => topic.criticalFacts.length > 0).length,
  },
  averages: Object.fromEntries([
    'englishNaturalness', 'vietnameseClarity', 'targetAlignment', 'answerFlexibility', 'grammarValidity',
    'vocabularyAppropriateness', 'contextQuality', 'pedagogicalUniqueness', 'difficultyAccuracy', 'overall',
  ].map((key) => [key, average(topicScores.map((item) => Number(item[key as keyof typeof item])))])),
  duplicateAudit: {
    semantic: { exactClusters: semanticClusters.length, exactPairs: pairCount(semanticClusters), nearPairs: semanticNearPairs.length, threshold: 0.72, largestExactCluster: semanticClusters[0]?.topicIds.length ?? 1 },
    writingPattern: { clusters: writingPatternClusters.length, pairs: pairCount(writingPatternClusters), largestCluster: writingPatternClusters[0]?.topicIds.length ?? 1 },
    reasoning: { clusters: reasoningClusters.length, pairs: pairCount(reasoningClusters), largestCluster: reasoningClusters[0]?.topicIds.length ?? 1 },
    grammarTarget: { clusters: grammarClusters.length, pairs: pairCount(grammarClusters), largestCluster: grammarClusters[0]?.topicIds.length ?? 1 },
    context: { clusters: contextClusters.length, pairs: pairCount(contextClusters), largestCluster: contextClusters[0]?.topicIds.length ?? 1 },
    pedagogical: { clusters: pedagogicalClusters.length, pairs: pairCount(pedagogicalClusters), largestCluster: pedagogicalClusters[0]?.topicIds.length ?? 1 },
  },
  largestClusters: {
    semantic: semanticClusters.slice(0, 10),
    semanticNearPairs: semanticNearPairs.slice(0, 50),
    writingPattern: writingPatternClusters.slice(0, 10),
    pedagogical: pedagogicalClusters.slice(0, 10),
  },
  topics: topicScores,
};

if (topics.length !== 500 || fingerprints.length !== 500) throw new Error(`Expected 500 topics/fingerprints; found ${topics.length}/${fingerprints.length}`);
mkdirSync(new URL('.', fingerprintOutput), { recursive: true });
writeFileSync(fileURLToPath(fingerprintOutput), `${JSON.stringify(fingerprints, null, 2)}\n`);
writeFileSync(fileURLToPath(feedbackIndexOutput), `${JSON.stringify({
  skills: WRITING_MASTERY_SKILLS,
  topics: fingerprints.map((item) => ({
    topicId: item.stableId,
    skillMask: item.masterySkills.reduce((mask, skill) => mask | (1 << WRITING_MASTERY_SKILLS.indexOf(skill)), 0),
    contextHash: stableHash(item.contextPattern),
  })),
}, null, 2)}\n`);
writeFileSync(fileURLToPath(reportOutput), `${JSON.stringify(report, null, 2)}\n`);
console.log(`Writing quality generated: ${topics.length} topics · ${fingerprints.length} fingerprints · ${report.totals.pass} PASS · ${report.totals.review} REVIEW`);
console.log(`Duplicate candidates: semantic ${report.duplicateAudit.semantic.nearPairs} near pairs · pedagogical ${report.duplicateAudit.pedagogical.pairs} pairs`);

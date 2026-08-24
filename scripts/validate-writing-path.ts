import { isDeepStrictEqual } from 'node:util';
import { buildWritingLearningMetadata } from '../src/engine/writing-learning-path/model.ts';
import { writingLearningUnits } from '../src/engine/writing-learning-path/units.ts';
import type { Difficulty, WritingSkill } from '../src/types/domain.ts';
import { loadWritingData } from './writing-utils.ts';

const { manifest, path, topics } = loadWritingData();
const errors: string[] = [];
const warnings: string[] = [];
const topicById = new Map(topics.map((topic) => [topic.id, topic]));
const summaryById = new Map(manifest.map((topic) => [topic.id, topic]));
const unitById = new Map(writingLearningUnits.map((unit) => [unit.id, unit]));
const metadataByTopic = new Map(path.map((item) => [item.topicId, item]));
const allowedSkills = new Set<WritingSkill>([
  'describe-situation', 'sequence-events', 'explain-reason', 'explain-cause-result',
  'report-problem', 'explain-action-taken', 'explain-result', 'explain-next-step',
  'apologize-explain', 'request-change-plan', 'summarize-event', 'explain-technical-issue',
  'explain-blocker', 'explain-risk', 'explain-tradeoff', 'incident-update',
]);

if (topics.length !== 500 || manifest.length !== 500) errors.push(`Expected 500 topics and summaries; found ${topics.length}/${manifest.length}.`);
if (path.length !== 500) errors.push(`Expected 500 path mappings; found ${path.length}.`);
if (metadataByTopic.size !== path.length) errors.push('Duplicate topic mapping detected.');

for (const topic of topics) {
  const metadata = metadataByTopic.get(topic.id);
  if (!metadata) { errors.push(`Orphan topic: ${topic.id}.`); continue; }
  const unit = unitById.get(metadata.unitId);
  if (!unit) errors.push(`Invalid unit ${metadata.unitId} for ${topic.id}.`);
  else if (unit.level !== topic.level) errors.push(`Level progression violation: ${topic.id} (${topic.level}) mapped to ${unit.id} (${unit.level}).`);
  if (!metadata.skills.length) errors.push(`Missing skill: ${topic.id}.`);
  for (const skill of metadata.skills) if (!allowedSkills.has(skill)) errors.push(`Unknown skill ${skill}: ${topic.id}.`);
  if (metadata.difficultyScore < 0 || metadata.difficultyScore > 100) errors.push(`Bad difficulty score: ${topic.id}.`);
  for (const prerequisite of metadata.prerequisites ?? []) {
    if (!topicById.has(prerequisite)) errors.push(`Bad prerequisite ${prerequisite}: ${topic.id}.`);
    if (prerequisite === topic.id) errors.push(`Self prerequisite: ${topic.id}.`);
  }
}

for (const metadata of path) {
  if (!topicById.has(metadata.topicId) || !summaryById.has(metadata.topicId)) errors.push(`Path references missing topic: ${metadata.topicId}.`);
}

for (const unit of writingLearningUnits) {
  const items = path.filter((item) => item.unitId === unit.id);
  if (!items.length) errors.push(`Empty unit creates impossible unlock chain: ${unit.id}.`);
  const orders = items.map((item) => item.order);
  if (new Set(orders).size !== orders.length) errors.push(`Duplicate order in ${unit.id}.`);
  const expectedOrders = Array.from({ length: items.length }, (_, index) => index + 1);
  if (!isDeepStrictEqual([...orders].sort((a, b) => a - b), expectedOrders)) errors.push(`Non-contiguous order in ${unit.id}.`);
  if (unit.order === 1 && unit.prerequisiteUnitId) errors.push('First unit cannot have a prerequisite.');
  if (unit.order > 1) {
    const expected = writingLearningUnits.find((candidate) => candidate.order === unit.order - 1)?.id;
    if (!unit.prerequisiteUnitId || !unitById.has(unit.prerequisiteUnitId)) errors.push(`Broken prerequisite for ${unit.id}.`);
    else if (unit.prerequisiteUnitId !== expected) errors.push(`Impossible unlock chain for ${unit.id}; expected ${expected}.`);
  }
  const summaries = items.map((item) => summaryById.get(item.topicId)!);
  if (!summaries.some((item) => item.writingType === 'story') || !summaries.some((item) => item.writingType === 'problem-explanation')) {
    warnings.push(`${unit.id} does not mix Story and Problem.`);
  }
}

for (const level of ['A1', 'A2', 'B1', 'B2'] as Difficulty[]) {
  const units = writingLearningUnits.filter((unit) => unit.level === level);
  const averages = units.map((unit) => {
    const scores = path.filter((item) => item.unitId === unit.id).map((item) => item.difficultyScore);
    return scores.reduce((total, score) => total + score, 0) / scores.length;
  });
  for (let index = 1; index < averages.length; index += 1) {
    // Small overlap is expected when a unit deliberately concentrates a scarce advanced skill
    // such as incident reporting; a drop larger than 0.35 indicates a real ordering regression.
    if (averages[index]! + 0.35 < averages[index - 1]!) errors.push(`${level} average difficulty decreases between ${units[index - 1]!.id} and ${units[index]!.id}.`);
  }
}

const regenerated = buildWritingLearningMetadata(topics);
if (!isDeepStrictEqual(regenerated, path)) errors.push('Generated metadata is stale or ordering/difficulty is not deterministic. Run npm run writing:path:generate.');

console.log(`Writing path validation: ${path.length}/500 mapped · ${writingLearningUnits.length} units · ${allowedSkills.size} skills · ${errors.length} errors · ${warnings.length} warnings`);
for (const warning of warnings) console.warn(`WARN ${warning}`);
for (const error of errors) console.error(`ERROR ${error}`);
if (errors.length) process.exitCode = 1;

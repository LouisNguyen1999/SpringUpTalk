import { isDeepStrictEqual } from 'node:util';
import { readFileSync } from 'node:fs';
import type { WritingPedagogicalFingerprint } from '../src/types/domain.ts';
import { loadWritingData } from './writing-utils.ts';

const { topics, path } = loadWritingData();
const fingerprints = JSON.parse(readFileSync(new URL('../src/data/writing/generated/writing-pedagogical-fingerprints.generated.json', import.meta.url), 'utf8')) as WritingPedagogicalFingerprint[];
const feedbackIndex = JSON.parse(readFileSync(new URL('../src/data/writing/generated/writing-feedback-index.generated.json', import.meta.url), 'utf8')) as { skills: string[]; topics: Array<{ topicId: string; skillMask: number; contextHash: number }> };
const report = JSON.parse(readFileSync(new URL('../writing_quality_report.json', import.meta.url), 'utf8')) as {
  totals: { topics: number; fingerprints: number };
};
const errors: string[] = [];
const topicIds = topics.map((item) => item.id).sort();
const fingerprintIds = fingerprints.map((item) => item.stableId).sort();

if (topics.length !== 500 || path.length !== 500) errors.push(`Expected 500 topics/path records; found ${topics.length}/${path.length}.`);
if (fingerprints.length !== 500 || new Set(fingerprintIds).size !== 500) errors.push('Fingerprint cardinality or stable IDs are invalid.');
if (!isDeepStrictEqual(topicIds, fingerprintIds)) errors.push('Fingerprint coverage does not match Writing topics.');
if (!isDeepStrictEqual(topicIds, feedbackIndex.topics.map((item) => item.topicId).sort())) errors.push('Compact feedback index coverage does not match Writing topics.');
if (feedbackIndex.skills.length !== 16 || feedbackIndex.topics.some((item) => !item.skillMask)) errors.push('Compact feedback index skill masks are invalid.');
if (report.totals.topics !== 500 || report.totals.fingerprints !== 500) errors.push('Quality report totals are stale.');
for (const item of fingerprints) {
  if (!item.unitId || !item.writingSkill.length || !item.grammarTargets.length || !item.vocabularyFocus.length) errors.push(`Incomplete fingerprint: ${item.stableId}.`);
  if (!item.reasoningPattern || !item.writingPattern || !item.grammarPattern || !item.contextPattern || !item.semanticPattern) errors.push(`Missing diversity pattern: ${item.stableId}.`);
  if (!item.acceptableVariations.length || !item.masterySkills.length) errors.push(`Missing accepted variations/mastery skills: ${item.stableId}.`);
}

console.log(`Writing quality validation: ${topics.length} topics · ${fingerprints.length} fingerprints · ${errors.length} errors`);
for (const error of errors) console.error(`ERROR ${error}`);
if (errors.length) process.exitCode = 1;

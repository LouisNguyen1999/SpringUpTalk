import { writingLearningUnits, WRITING_SKILL_LABELS } from '../src/engine/writing-learning-path/units.ts';
import type { WritingSkill } from '../src/types/domain.ts';
import { loadWritingData } from './writing-utils.ts';

const { manifest, path } = loadWritingData();
const summaryById = new Map(manifest.map((item) => [item.id, item]));
const mappedIds = new Set(path.map((item) => item.topicId));
const skills = new Map<WritingSkill, number>();
for (const item of path) for (const skill of item.skills) skills.set(skill, (skills.get(skill) ?? 0) + 1);
const brokenPrerequisites = writingLearningUnits.filter((unit) => unit.prerequisiteUnitId && !writingLearningUnits.some((item) => item.id === unit.prerequisiteUnitId)).length + path.flatMap((item) => item.prerequisites ?? []).filter((id) => !mappedIds.has(id)).length;

console.log('WRITING LEARNING PATH\n');
console.log(`Topics: ${manifest.length}`);
console.log(`Mapped: ${mappedIds.size}/${manifest.length}`);
console.log(`Units: ${writingLearningUnits.length}`);
for (const level of ['A1', 'A2', 'B1', 'B2'] as const) console.log(`${level}: ${manifest.filter((item) => item.level === level).length}`);
console.log(`Daily: ${manifest.filter((item) => item.domain === 'daily-life').length}`);
console.log(`IT: ${manifest.filter((item) => item.domain === 'it-work').length}`);
console.log(`Story: ${manifest.filter((item) => item.writingType === 'story').length}`);
console.log(`Problem: ${manifest.filter((item) => item.writingType === 'problem-explanation').length}`);
console.log(`Skills: ${skills.size}`);
for (const [skill, count] of [...skills].sort(([left], [right]) => left.localeCompare(right))) console.log(`  ${WRITING_SKILL_LABELS[skill]}: ${count}`);
console.log('\nUNITS');
for (const unit of writingLearningUnits) {
  const items = path.filter((item) => item.unitId === unit.id);
  const summaries = items.map((item) => summaryById.get(item.topicId)!);
  const average = items.reduce((total, item) => total + item.difficultyScore, 0) / items.length;
  console.log(`${unit.order}. ${unit.level} ${unit.title}: ${items.length} · Daily ${summaries.filter((item) => item.domain === 'daily-life').length} · IT ${summaries.filter((item) => item.domain === 'it-work').length} · Story ${summaries.filter((item) => item.writingType === 'story').length} · Problem ${summaries.filter((item) => item.writingType === 'problem-explanation').length} · difficulty ${average.toFixed(1)}`);
}
console.log(`\nOrphan topics: ${manifest.filter((item) => !mappedIds.has(item.id)).length}`);
console.log(`Broken prerequisites: ${brokenPrerequisites}`);

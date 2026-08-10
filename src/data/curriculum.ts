import type { Difficulty, TopicManifestItem } from '../types/domain';

export interface CurriculumUnit {
  id: string;
  level: Difficulty;
  number: number;
  title: string;
  topics: TopicManifestItem[];
}

export interface CurriculumLevel {
  level: Difficulty;
  title: string;
  units: CurriculumUnit[];
}

const LEVEL_TITLES: Record<Difficulty,string> = {
  A1:'Foundation', A2:'Everyday confidence', B1:'Independent communication', B2:'Nuanced communication',
};

export function buildCurriculum(topics: readonly TopicManifestItem[], unitSize = 5): CurriculumLevel[] {
  return (['A1','A2','B1','B2'] as const).map((level) => {
    const levelTopics = topics.filter((topic) => topic.level === level);
    const units: CurriculumUnit[] = [];
    for (let offset = 0; offset < levelTopics.length; offset += unitSize) {
      const unitTopics = levelTopics.slice(offset, offset + unitSize);
      const categories = [...new Set(unitTopics.map((topic) => topic.category))];
      units.push({ id:`${level.toLowerCase()}-unit-${units.length+1}`, level, number:units.length+1, title:categories.slice(0,2).join(' & '), topics:unitTopics });
    }
    return { level, title:LEVEL_TITLES[level], units };
  });
}

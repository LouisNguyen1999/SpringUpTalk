import { describe, expect, it } from 'vitest';
import { buildCurriculum } from '../data/curriculum';
import { recommendTopics } from '../engine/recommendations';
import type { TopicManifestItem } from '../types/domain';

const topic = (id:string, level:'A1'|'A2', grammar:string[]):TopicManifestItem => ({ id,title:id,titleVi:id,description:id,category:'Daily Life',icon:'x',level,grammar,vocabularyTags:[],conversationCount:3 });

describe('data-driven curriculum and recommendations', () => {
  const topics = [topic('greetings','A1',['Present Simple']),topic('past-trip','A2',['Past Simple tense']),topic('shopping','A1',['Countable nouns'])];
  it('chunks every level into stable units', () => {
    const curriculum = buildCurriculum(topics, 1);
    expect(curriculum.find((item) => item.level === 'A1')?.units).toHaveLength(2);
    expect(curriculum.flatMap((level) => level.units).flatMap((unit) => unit.topics)).toHaveLength(3);
  });
  it('prioritizes an incomplete topic that addresses a repeated weakness', () => {
    const recommendations = recommendTopics(topics, { completedTopics:['greetings'], currentLevel:'A2', favorites:[], mistakes:[{ id:'m',turnId:'t',topicId:'x',conversationId:'c',vietnamese:'',userAnswer:'',canonicalAnswer:'',types:['tense'],createdAt:'',reviewCount:0 }] });
    expect(recommendations[0]?.id).toBe('past-trip');
  });
});

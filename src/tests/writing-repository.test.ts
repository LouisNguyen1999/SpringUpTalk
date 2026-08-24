import { describe, expect, it } from 'vitest';
import { loadWritingTopic, writingManifest } from '../data/writing/writing-repository';

describe('writing repository', () => {
  it('keeps an exact lightweight 500-topic manifest with the requested domain split', () => {
    expect(writingManifest).toHaveLength(500);
    expect(writingManifest.filter((topic) => topic.domain === 'daily-life')).toHaveLength(300);
    expect(writingManifest.filter((topic) => topic.domain === 'it-work')).toHaveLength(200);
    expect(new Set(writingManifest.map((topic) => topic.id)).size).toBe(500);
  });

  it('lazy-loads a complete topic with semantic ideas, hints and multiple samples', async () => {
    const topic = await loadWritingTopic('writing:meeting-a-friend');
    expect(topic?.requiredIdeas.length).toBeGreaterThanOrEqual(3);
    expect(topic?.hints.map((hint) => hint.level)).toEqual([1, 2, 3]);
    expect(topic?.sampleAnswers.length).toBeGreaterThanOrEqual(2);
    expect(topic?.sourceTopicId).toBe('meeting-a-friend');
    expect(topic?.context).toBeTruthy();
    expect(topic?.vietnameseSourceText).toContain('Tôi mở đầu cuộc trao đổi');
    expect(topic?.vietnameseSourceText).not.toBe(topic?.context);
    expect(topic?.vietnameseSourceText).not.toMatch(/Hãy (kể|giải thích|viết|mô tả)/i);
  });
});

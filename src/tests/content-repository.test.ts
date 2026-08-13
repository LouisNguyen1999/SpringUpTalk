import { describe, expect, it } from 'vitest';
import { contentRepository, topicManifest } from '../data/content-repository';

describe('lazy content repository', () => {
  it('exposes lightweight summaries without conversation turns', () => {
    expect(topicManifest).toHaveLength(500);
    expect(topicManifest[0]).not.toHaveProperty('conversations');
    expect(topicManifest[0]?.turnCount).toBeGreaterThan(0);
    expect(topicManifest.every((topic) => topic.vocabularyTags.length <= 8)).toBe(true);
  });

  it('loads a topic from its category chunk', async () => {
    const topic = await contentRepository.getTopic('wifi-problem');
    expect(topic?.title).toBe('Wi-Fi Problem');
    expect(topic?.conversations).toHaveLength(3);
  });

  it('returns undefined for an unknown topic without loading content', async () => {
    await expect(contentRepository.getTopic('not-a-real-topic')).resolves.toBeUndefined();
  });

  it.each([
    ['leaving-a-voice-message','Communication'],
    ['buying-concert-tickets','Entertainment'],
    ['managing-conflicting-priorities','Work'],
    ['reporting-a-stolen-item-abroad','Emergencies'],
    ['asking-about-museum-admission','Public Places'],
    ['setting-a-meeting-agenda','Professional Communication'],
  ])('loads Batch C topic %s from its lazy category module', async (id, category) => {
    const topic = await contentRepository.getTopic(id);
    expect(topic?.category).toBe(category);
    expect(topic?.conversations.length).toBeGreaterThanOrEqual(3);
  });
});

import { describe, expect, it } from 'vitest';
import { contentRepository, topicManifest } from '../data/content-repository';

describe('lazy content repository', () => {
  it('exposes lightweight summaries without conversation turns', () => {
    expect(topicManifest.length).toBeGreaterThanOrEqual(100);
    expect(topicManifest[0]).not.toHaveProperty('conversations');
    expect(topicManifest[0]?.turnCount).toBeGreaterThan(0);
  });

  it('loads a topic from its category chunk', async () => {
    const topic = await contentRepository.getTopic('wifi-problem');
    expect(topic?.title).toBe('Wi-Fi Problem');
    expect(topic?.conversations).toHaveLength(3);
  });

  it('returns undefined for an unknown topic without loading content', async () => {
    await expect(contentRepository.getTopic('not-a-real-topic')).resolves.toBeUndefined();
  });
});

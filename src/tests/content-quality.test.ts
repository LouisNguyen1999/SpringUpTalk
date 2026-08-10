import { describe, expect, it } from 'vitest';
import { topics } from '../data';
import { createContentReport, validateTopics } from '../../scripts/validate-content';

describe('content quality report', () => {
  const issues = validateTopics(topics);
  const report = createContentReport(topics, issues);

  it('has no critical validation issues', () => {
    expect(issues.filter((issue) => issue.severity === 'error')).toEqual([]);
  });

  it('has balanced level and category coverage', () => {
    expect(report.levels).toEqual({ A1:65, A2:80, B1:68, B2:37 });
    expect(Object.keys(report.categories).length).toBeGreaterThanOrEqual(19);
  });

  it('meets the 100-to-250 scale gates', () => {
    expect(report.topics).toBeGreaterThanOrEqual(250);
    expect(report.conversations).toBeGreaterThanOrEqual(750);
    expect(report.turns).toBeGreaterThanOrEqual(5000);
    expect(report.vocabularyItems).toBeGreaterThanOrEqual(1800);
    expect(report.uniqueLearningObjectives).toBe(report.conversations);
  });

  it('contains no exact, normalized or sequence duplicates', () => {
    expect(report.exactCanonicalDuplicates).toBe(0);
    expect(report.normalizedCanonicalDuplicates).toBe(0);
    expect(report.exactVietnameseDuplicates).toBe(0);
    expect(report.sequenceDuplicates).toBe(0);
    expect(report.nearDuplicateWarnings).toBe(0);
  });
});

import { describe, expect, it } from 'vitest';
import { evaluateWriting } from '../engine/writing-evaluator';
import type { WritingPracticeTopic } from '../types/domain';

function topic(overrides: Partial<WritingPracticeTopic> = {}): WritingPracticeTopic {
  return {
    id: 'writing:test',
    titleEnglish: 'Being late for work',
    titleVietnamese: 'Đi làm trễ',
    category: 'Work',
    domain: 'daily-life',
    level: 'A2',
    writingType: 'problem-explanation',
    context: 'Explain why you were late.',
    vietnameseSourceText:
      'Sáng nay tôi đến công ty trễ 20 phút vì kẹt xe. Tôi đã báo cho quản lý và sẽ bù thời gian.',
    requiredIdeas: [
      { id: 'late', labelVietnamese: 'đến làm trễ', concepts: ['arrived at work late', 'was late for work'] },
      { id: 'traffic', labelVietnamese: 'kẹt xe', concepts: ['traffic jam', 'heavy traffic', 'stuck in traffic'] },
      { id: 'manager', labelVietnamese: 'báo quản lý', concepts: ['informed my manager', 'told my boss', 'messaged my supervisor'] },
      { id: 'make-up', labelVietnamese: 'bù thời gian', concepts: ['make up the time', 'work longer', 'stay later'] },
    ],
    criticalFacts: [
      { id: 'duration', labelVietnamese: '20 phút', type: 'number', expected: ['20 minutes', 'twenty minutes'] },
    ],
    usefulVocabulary: ['be late', 'traffic jam'],
    usefulStructures: ['because of ...'],
    sampleAnswers: [
      'I was 20 minutes late for work because I got stuck in traffic. I told my manager and will make up the time.',
      'Heavy traffic made me arrive at work twenty minutes late. I informed my boss and will stay later.',
    ],
    hints: [],
    commonMistakes: [],
    expectedWordRange: [30, 60],
    ...overrides,
  };
}

describe('writing evaluator', () => {
  it('accepts reordered ideas and alternative expressions', () => {
    const result = evaluateWriting(
      'I told my boss that I would stay later. Heavy traffic made me arrive at work twenty minutes late.',
      topic(),
    );
    expect(result.status).toBe('communicates-well');
    expect(result.communicatedIdeas).toBe(4);
    expect(result.facts.every((fact) => fact.correct)).toBe(true);
  });

  it('reports a missing idea without failing an understandable paragraph', () => {
    const result = evaluateWriting(
      'I was 20 minutes late for work because of a traffic jam. I informed my manager.',
      topic(),
    );
    expect(result.status).toBe('mostly-correct');
    expect(result.ideas.find((idea) => idea.id === 'make-up')?.communicated).toBe(false);
  });

  it('protects critical numbers', () => {
    const result = evaluateWriting(
      'I was two hours late for work because of heavy traffic. I told my boss and stayed later.',
      topic(),
    );
    expect(result.status).toBe('needs-improvement');
    expect(result.facts[0]?.correct).toBe(false);
  });

  it('does not fail the whole paragraph for a minor tense error', () => {
    const result = evaluateWriting(
      'Yesterday I go to work late because of heavy traffic. I was 20 minutes late, informed my manager, and stayed later.',
      topic(),
    );
    expect(result.status).toBe('mostly-correct');
    expect(result.languageIssues.some((issue) => issue.type === 'tense')).toBe(true);
  });

  it('detects reversed negative meaning', () => {
    const disagreement = topic({
      requiredIdeas: [
        { id: 'disagree', labelVietnamese: 'không đồng ý', concepts: ['do not agree', 'disagree'] },
      ],
      criticalFacts: [
        { id: 'negative', labelVietnamese: 'không đồng ý', type: 'polarity', expected: ['negative'] },
      ],
      sampleAnswers: ['I do not agree with this solution.', 'I disagree with this solution.'],
    });
    expect(evaluateWriting('I agree with this solution.', disagreement).status).toBe(
      'needs-improvement',
    );
  });

  it('accepts service recovery paraphrases and rejects the opposite state', () => {
    const recovery = topic({
      requiredIdeas: [
        { id: 'recovered', labelVietnamese: 'server hoạt động trở lại', concepts: ['server is back up', 'server is working again', 'service recovered'] },
      ],
      criticalFacts: [
        { id: 'state', labelVietnamese: 'đã hoạt động trở lại', type: 'state', expected: ['back up', 'working again', 'recovered'], forbidden: ['still down'] },
      ],
      sampleAnswers: ['The server is back up.', 'The server is working again.'],
    });
    expect(evaluateWriting('The server is working again.', recovery).status).toBe(
      'communicates-well',
    );
    expect(evaluateWriting('The server is still down.', recovery).status).toBe(
      'needs-improvement',
    );
  });

  it('matches active and passive voice without sentence-position mapping', () => {
    const fixed = topic({
      requiredIdeas: [{ id: 'fixed', labelVietnamese: 'team sửa bug', concepts: ['the team fixed the bug'] }],
      criticalFacts: [], sampleAnswers: ['The team fixed the bug.', 'The bug was fixed by the team.'],
    });
    expect(evaluateWriting('The bug was fixed by the team.', fixed).status).toBe('communicates-well');
  });

  it('matches safe noun-to-verb and phrase-to-clause transformations', () => {
    const decision = topic({
      requiredIdeas: [
        { id: 'decision', labelVietnamese: 'quyết định dời release', concepts: ['we decided to delay the release'] },
        { id: 'reason', labelVietnamese: 'vì kẹt xe nên trễ', concepts: ['because of heavy traffic I was late'] },
      ],
      criticalFacts: [], sampleAnswers: ['We decided to delay the release. Because of heavy traffic, I was late.', 'We made a decision to postpone the release. I was late because traffic was heavy.'],
    });
    expect(evaluateWriting('I was late because the traffic was heavy. We made a decision to postpone the release.', decision).status).toBe('communicates-well');
  });

  it('marks an incomplete idea as partial rather than fully covered', () => {
    const detailed = topic({
      requiredIdeas: [{
        id: 'notice', labelVietnamese: 'báo manager trước rằng sẽ trễ 20 phút',
        concepts: ['told my manager I would be late'], criticalConcepts: ['20 minutes'],
      }],
      criticalFacts: [], sampleAnswers: ['I told my manager I would be 20 minutes late.', 'My manager knows about my twenty-minute delay.'],
    });
    const result = evaluateWriting('I told my manager I would be late.', detailed);
    expect(result.ideas[0]?.status).toBe('partial');
    expect(result.status).toBe('mostly-correct');
  });

  it('reports an explicit opposite as a contradiction', () => {
    const rollback = topic({
      requiredIdeas: [{ id: 'rollback', labelVietnamese: 'rollback hoàn tất', concepts: ['we completed the rollback'] }],
      criticalFacts: [], sampleAnswers: ['We completed the rollback.', 'The rollback is complete.'],
    });
    const result = evaluateWriting('We decided not to roll back.', rollback);
    expect(result.ideas[0]?.status).toBe('contradicted');
    expect(result.status).toBe('needs-improvement');
  });

  it('rejects cause/result inversion even with the same vocabulary', () => {
    const timeout = topic({
      requiredIdeas: [{ id: 'cause', labelVietnamese: 'database chậm làm API timeout', concepts: ['the slow database caused API timeouts'] }],
      criticalFacts: [{ id: 'relation', labelVietnamese: 'database gây timeout', type: 'cause-result', expected: ['database caused timeout'], cause: ['slow database'], result: ['API timeout'] }],
      sampleAnswers: ['The slow database caused API timeouts.', 'API requests timed out because the database was slow.'],
    });
    expect(evaluateWriting('API timeouts caused the database to become slow.', timeout).status).toBe('needs-improvement');
  });

  it('protects before/after temporal relationships', () => {
    const sequence = topic({
      requiredIdeas: [{ id: 'found', labelVietnamese: 'tìm bug trước deploy', concepts: ['we found the bug before deployment'] }],
      criticalFacts: [{ id: 'sequence', labelVietnamese: 'trước deploy', type: 'sequence', expected: ['before deployment'], forbidden: ['after deployment'] }],
      sampleAnswers: ['We found the bug before deployment.', 'The bug was discovered prior to deployment.'],
    });
    expect(evaluateWriting('We found the bug after deployment.', sequence).status).toBe('needs-improvement');
  });

  it('scopes critical values to their units instead of any number in the paragraph', () => {
    const values = topic({
      requiredIdeas: [{ id: 'delay', labelVietnamese: 'trễ 20 phút', concepts: ['the train was 20 minutes late'] }],
      criticalFacts: [{ id: 'delay', labelVietnamese: '20 phút', type: 'time', expected: ['20 minutes'], anchors: ['train', 'late'] }],
      sampleAnswers: ['The train was 20 minutes late from platform 2.', 'Platform 2 has a twenty-minute delay.'],
    });
    expect(evaluateWriting('The train was 30 minutes late from platform 20.', values).facts[0]?.status).toBe('contradicted');
  });

  it('accepts a register change when the request meaning is unchanged', () => {
    const clarify = topic({
      requiredIdeas: [{ id: 'clarify', labelVietnamese: 'xin làm rõ yêu cầu', concepts: ['could you clarify the requirement'] }],
      criticalFacts: [], sampleAnswers: ['Could you clarify the requirement?', 'Can you explain the requirement more clearly?'],
    });
    expect(evaluateWriting('Can you explain the requirement more clearly?', clarify).status).toBe('communicates-well');
  });
});

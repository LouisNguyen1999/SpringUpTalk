import { describe, expect, it } from 'vitest';
import { topics } from '../data';
import { createContentReport, validateTopics } from '../../scripts/validate-content';
import { batchCCommunicationPublicTopics } from '../data/scale/batch-c-communication-public';
import { batchCEventsFitnessTopics } from '../data/scale/batch-c-events-fitness';
import { batchCProfessionalTopics } from '../data/scale/batch-c-professional';
import { batchCTravelEmergencyTopics } from '../data/scale/batch-c-travel-emergency';
import { BASELINE_FLEXIBLE_INTENTS, D0_BASELINE_CANONICAL_ONLY, FLEXIBLE_INTENTS_V2 } from '../data/accepted-answer-hardening';
import { normalizeSentence } from '../engine/sentence-normalizer';
import { batchD1EverydayServicesTopics } from '../data/scale/batch-d1-everyday-services';
import { batchD2HomeMoneyTopics } from '../data/scale/batch-d2-home-money';
import { batchD3SupportDiplomacyTopics } from '../data/scale/batch-d3-support-diplomacy';
import { batchD4TravelCommunityTopics } from '../data/scale/batch-d4-travel-community';

describe('content quality report', () => {
  const issues = validateTopics(topics);
  const report = createContentReport(topics, issues);

  it('has no critical validation issues', () => {
    expect(issues.filter((issue) => issue.severity === 'error')).toEqual([]);
  });

  it('has balanced level and category coverage', () => {
    expect(Object.values(report.levels).every((count) => count > 0)).toBe(true);
    expect(Object.values(report.levels).reduce((sum,count) => sum+count,0)).toBe(report.topics);
    expect(Object.keys(report.categories).length).toBeGreaterThanOrEqual(19);
  });

  it('meets the Batch D 500-topic scale gates', () => {
    expect(report.topics).toBe(500);
    expect(report.levels).toEqual({ A1:114,A2:150,B1:147,B2:89 });
    expect(report.conversations).toBeGreaterThanOrEqual(1720);
    expect(report.turns).toBeGreaterThanOrEqual(11800);
    expect(report.vocabularyItems).toBeGreaterThanOrEqual(5500);
    expect(report.conversationLength.average).toBeGreaterThanOrEqual(6.9);
    expect(report.uniqueLearningObjectives).toBe(report.conversations);
    expect(report.roleBalance.turns.A).toBe(report.roleBalance.turns.B);
    expect(report.vocabularyPhraseRatio).toBeGreaterThan(.9);
    expect(report.roleBalance.warnings).toEqual([]);
    expect(report.structuralWarnings).toBe(0);
    expect(report.objectiveWarnings).toBe(0);
  });

  it('keeps the frozen Batch D set and conversation distribution', () => {
    const sets=[batchD1EverydayServicesTopics,batchD2HomeMoneyTopics,batchD3SupportDiplomacyTopics,batchD4TravelCommunityTopics];
    expect(sets.map((set) => set.length)).toEqual([16,16,16,17]);
    const batchD=sets.flat();
    const levels=batchD.reduce<Record<string,number>>((result,topic) => ({...result,[topic.level]:(result[topic.level] ?? 0)+1}),{});
    const distribution=batchD.reduce<Record<number,number>>((result,topic) => ({...result,[topic.conversations.length]:(result[topic.conversations.length] ?? 0)+1}),{});
    expect(levels).toEqual({A1:13,A2:19,B1:20,B2:13});
    expect(distribution).toEqual({3:20,4:32,5:13});
    expect(batchD.reduce((sum,topic) => sum+topic.conversations.length,0)).toBe(253);
    expect(batchD.every((topic) => topic.conversations.every((conversation) => conversation.turns.length === ({A1:6,A2:8,B1:8,B2:10}[topic.level])))).toBe(true);
  });

  it('keeps the frozen Batch C topic and conversation distribution', () => {
    const batchC=[...batchCCommunicationPublicTopics,...batchCEventsFitnessTopics,...batchCProfessionalTopics,...batchCTravelEmergencyTopics];
    const distribution=batchC.reduce<Record<number,number>>((result,topic) => ({...result,[topic.conversations.length]:(result[topic.conversations.length] ?? 0)+1}),{});
    expect(batchC).toHaveLength(65);
    expect(distribution).toEqual({3:20,4:32,5:13});
    expect(batchC.reduce((sum,topic) => sum+topic.conversations.length,0)).toBe(253);
    expect(batchC.every((topic) => topic.conversations.every((conversation) => conversation.turns.filter((turn) => turn.speaker === 'A').every((turn) => turn.acceptedAnswers.length === 3)))).toBe(true);
  });

  it('contains no exact, normalized or sequence duplicates', () => {
    expect(report.exactCanonicalDuplicates).toBe(0);
    expect(report.normalizedCanonicalDuplicates).toBe(0);
    expect(report.exactVietnameseDuplicates).toBe(0);
    expect(report.sequenceDuplicates).toBe(0);
    expect(report.nearDuplicateWarnings).toBe(0);
  });

  it('locks the Batch D0 accepted-answer audit', () => {
    const conversations=topics.flatMap((topic) => topic.conversations);
    const flexibleTurns=conversations
      .filter((conversation) => conversation.intent && FLEXIBLE_INTENTS_V2.has(conversation.intent))
      .flatMap((conversation) => conversation.turns);
    const baselineAudited=flexibleTurns.filter((turn) => turn.acceptedAnswerAudit?.baselineCanonicalOnly);
    const fixed=flexibleTurns.filter((turn) => turn.acceptedAnswerAudit?.status === 'justified-fixed');
    expect(baselineAudited).toHaveLength(D0_BASELINE_CANONICAL_ONLY);
    expect(baselineAudited.every((turn) => Boolean(turn.acceptedAnswerAudit?.status))).toBe(true);
    expect(fixed.every((turn) => Boolean(turn.acceptedAnswerAudit?.reason.trim()))).toBe(true);
    expect(flexibleTurns.filter((turn) => turn.acceptedAnswers.length >= 3 || turn.acceptedAnswerAudit?.status === 'justified-fixed').length / flexibleTurns.length).toBeGreaterThanOrEqual(.75);
    expect(flexibleTurns.reduce((sum,turn) => sum+turn.acceptedAnswers.length,0)/flexibleTurns.length).toBeGreaterThanOrEqual(2.4);
    expect(flexibleTurns.every((turn) => new Set(turn.acceptedAnswers.map(normalizeSentence)).size === turn.acceptedAnswers.length)).toBe(true);
    expect(BASELINE_FLEXIBLE_INTENTS.size).toBe(13);
  });
});

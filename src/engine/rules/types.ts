import type { Mistake, MistakeType } from '../../types/domain';

export type RuleSeverity = 'meaning' | 'grammar' | 'minor';

export interface RuleResult {
  passed: boolean;
  severity: RuleSeverity;
  priority: number;
  mistake?: Mistake;
}

export function failure(type: MistakeType, explanation: string, correction: string, severity: RuleSeverity, priority: number, original = ''): RuleResult {
  return { passed: false, severity, priority, mistake: { type, original, correction, explanation } };
}

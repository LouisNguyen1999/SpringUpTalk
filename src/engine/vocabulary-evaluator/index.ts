import type { EvaluationResult, VocabularyPracticeItem } from '../../types/domain';
import { evaluateAnswer } from '../answer-evaluator';
import { normalizeSearchText } from '../../utils/search';

export type VocabularyEvaluationStatus =
  'correct-target' | 'acceptable-meaning' | 'almost' | 'incorrect';
export interface VocabularyEvaluation {
  status: VocabularyEvaluationStatus;
  targetUsed: boolean;
  result: EvaluationResult;
  targetExpressions: string[];
}

export function usesTargetExpression(answer: string, targets: string[]): boolean {
  const normalized = ` ${normalizeSearchText(answer)} `;
  return targets.some((target) => normalized.includes(` ${normalizeSearchText(target)} `));
}

export function evaluateVocabularyAnswer(
  answer: string,
  item: VocabularyPracticeItem,
  attempt = 1,
  showAnswer = false,
): VocabularyEvaluation {
  const result = evaluateAnswer(
    answer,
    {
      id: item.id,
      speaker: 'A',
      vietnamese: item.vietnamese,
      canonicalAnswer: item.canonicalAnswer,
      acceptedAnswers: item.acceptedAnswers,
      naturalAlternatives: item.naturalAlternatives,
      requiredKeywords: [],
      grammarPoints: item.grammarFocus,
      vocabulary: [],
      commonMistakes: item.commonMistakes ?? [],
      explanation: item.explanation,
      hint: item.hint,
      semanticConstraints: item.semanticConstraints,
      difficulty: item.level,
    },
    { attempt, showAnswer },
  );
  const targetUsed = usesTargetExpression(answer, item.targetExpressions);
  const successful = result.status === 'correct' || result.status === 'acceptable';
  return {
    status: successful
      ? targetUsed
        ? 'correct-target'
        : 'acceptable-meaning'
      : result.status === 'almost-correct'
        ? 'almost'
        : 'incorrect',
    targetUsed,
    result,
    targetExpressions: item.targetExpressions,
  };
}

import type { ConversationTurn, EvaluationResult, Mistake } from '../../types/domain';
import { detectCommonMistakes, detectTokenMistakes } from '../mistake-detector';
import { normalizeForEvaluation } from '../sentence-normalizer';
import { keywordCoverage, tokenSimilarity } from '../similarity';
import { checkSingleTypo, runSemanticRules, semanticConstraintsSatisfied } from '../rules';

export interface EvaluationOptions {
  attempt?: number;
  showAnswer?: boolean;
}

const PRIORITY: Record<string, number> = {
  tense:90, grammar:88, auxiliary:86, 'word-order':84, modal:82, vocabulary:75,
  collocation:70, preposition:60, article:50, spelling:20, 'missing-word':40, 'unnecessary-word':30,
};

function prioritize(mistakes: Mistake[], turn: ConversationTurn): Mistake[] {
  const limit = turn.difficulty === 'A1' || turn.difficulty === 'A2' ? 2 : 4;
  return [...mistakes]
    .sort((left,right) => (PRIORITY[right.type] ?? 65) - (PRIORITY[left.type] ?? 65))
    .filter((mistake,index,array) => array.findIndex((item) => item.type === mistake.type && item.explanation === mistake.explanation) === index)
    .slice(0,limit);
}

export function evaluateAnswer(userAnswer: string, turn: ConversationTurn, options: EvaluationOptions = {}): EvaluationResult {
  const trimmed = userAnswer.trim();
  const candidates = Array.from(new Set([turn.canonicalAnswer, ...turn.acceptedAnswers]));
  const normalizedUser = normalizeForEvaluation(trimmed);
  const exactMatch = candidates.find((answer) => normalizeForEvaluation(answer) === normalizedUser);
  const ranked = candidates.map((answer) => ({ answer, score:tokenSimilarity(trimmed,answer) })).sort((a,b) => b.score-a.score);
  const closest = ranked[0] ?? { answer:turn.canonicalAnswer, score:0 };
  const coverage = keywordCoverage(trimmed, turn.requiredKeywords ?? []);
  const similarityScore = Math.round(closest.score * 100);
  const score = Math.round(similarityScore * 0.85 + coverage * 15);
  const commonMistakes = detectCommonMistakes(trimmed, turn.commonMistakes);
  const semanticFailures = runSemanticRules(trimmed, turn).filter((result) => !result.passed);
  const criticalFailure = semanticFailures.some((result) => result.severity === 'meaning' || result.severity === 'grammar');
  const typo = checkSingleTypo(trimmed, turn);
  const semanticMatch = !exactMatch && !criticalFailure && commonMistakes.length === 0 && semanticConstraintsSatisfied(trimmed, turn);

  const status = exactMatch
    ? 'correct'
    : criticalFailure || commonMistakes.length > 0
      ? 'incorrect'
      : semanticMatch
        ? 'acceptable'
        : typo
          ? 'almost-correct'
          : score >= 82 && coverage === 1
            ? 'almost-correct'
            : 'incorrect';

  const ruleMistakes = semanticFailures.sort((a,b) => b.priority-a.priority).flatMap((result) => result.mistake ? [result.mistake] : []);
  const mistakes = status === 'correct' || status === 'acceptable'
    ? []
    : prioritize([...ruleMistakes, ...commonMistakes, ...(typo?.mistake ? [typo.mistake] : []), ...detectTokenMistakes(trimmed,closest.answer)],turn);
  const revealCanonical = options.showAnswer === true || (options.attempt ?? 1) >= 3;

  const explanation = status === 'correct'
    ? ['Câu của bạn khớp một đáp án đã được biên soạn và đúng ngữ cảnh.']
    : status === 'acceptable'
      ? ['Cách viết khác đáp án mẫu nhưng thỏa các ý nghĩa và ràng buộc ngữ pháp đã được biên soạn cho tình huống này.']
      : status === 'almost-correct'
        ? ['Câu truyền đạt gần đúng. Hãy sửa chi tiết được ưu tiên bên dưới rồi thử lại.']
        : mistakes.length
          ? [mistakes[0]?.explanation ?? 'Hãy sửa lỗi chính rồi thử lại.']
          : [turn.explanation ?? 'Câu chưa truyền đạt đủ ý bắt buộc của tình huống.'];
  if (coverage < 1 && !explanation.some((item) => item.includes('thiếu ý'))) explanation.push('Câu đang thiếu một hoặc nhiều ý chính bắt buộc.');

  return {
    status,
    score: exactMatch ? 100 : semanticMatch ? Math.max(85,score) : score,
    userAnswer:trimmed,
    canonicalAnswer:turn.canonicalAnswer,
    matchedAnswer:exactMatch ?? (semanticMatch || status === 'almost-correct' ? closest.answer : undefined),
    matchedBy: exactMatch ? (normalizeForEvaluation(exactMatch) === normalizeForEvaluation(turn.canonicalAnswer) ? 'canonical' : 'accepted') : semanticMatch ? 'semantic' : status === 'almost-correct' ? 'similarity' : undefined,
    mistakes,
    explanation,
    suggestions:mistakes.map((mistake) => mistake.explanation),
    naturalAlternatives:turn.naturalAlternatives,
    revealCanonical,
  };
}

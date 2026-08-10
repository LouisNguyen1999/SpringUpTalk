import type { ConversationTurn } from '../../types/domain';
import { evaluationTokens, normalizeForEvaluation } from '../sentence-normalizer';
import { failure, type RuleResult } from './types';

const QUESTION_STARTERS = new Set(['am','is','are','was','were','do','does','did','have','has','had','can','could','will','would','should','may','might','must','who','what','when','where','why','how','which']);
const QUESTION_WORDS = new Set(['who','what','when','where','why','how','which']);
const AUXILIARIES = new Set(['am','is','are','was','were','do','does','did','have','has','had','can','could','will','would','should','may','might','must']);
const NEGATIONS = new Set(['not','never','no','nobody','nothing','neither']);

function containsPhrase(answer: string, phrase: string): boolean {
  const normalized = normalizeForEvaluation(answer);
  const option = normalizeForEvaluation(phrase);
  return normalized === option || normalized.includes(` ${option} `) || normalized.startsWith(`${option} `) || normalized.endsWith(` ${option}`);
}

function matchesGroup(answer: string, alternatives: string[]): boolean {
  return alternatives.some((alternative) => containsPhrase(answer, alternative));
}

export function runSemanticRules(answer: string, turn: ConversationTurn): RuleResult[] {
  const constraints = turn.semanticConstraints;
  if (!constraints) return [];
  const normalized = normalizeForEvaluation(answer);
  const tokens = evaluationTokens(answer);
  const results: RuleResult[] = [];

  if (constraints.polarity) {
    const hasNegation = tokens.some((token) => NEGATIONS.has(token));
    const first = tokens[0] ?? '';
    const question = QUESTION_STARTERS.has(first) && (!QUESTION_WORDS.has(first) || tokens.slice(1, 6).some((token) => AUXILIARIES.has(token)));
    if (constraints.polarity === 'negative' && !hasNegation) results.push(failure('grammar','Câu này cần ý phủ định; thiếu “not/no/never” sẽ làm nghĩa bị đảo ngược.','Thêm cấu trúc phủ định phù hợp.','meaning',100));
    if (constraints.polarity === 'positive' && hasNegation) results.push(failure('grammar','Câu gợi ý mang nghĩa khẳng định, nhưng câu của bạn đang phủ định ý chính.','Bỏ phủ định làm thay đổi nghĩa.','meaning',100));
    if (constraints.polarity === 'question' && !question) results.push(failure('word-order','Đây phải là câu hỏi. Hãy đưa trợ động từ hoặc từ để hỏi lên trước chủ ngữ.','Dùng cấu trúc câu hỏi.','meaning',95));
  }

  for (const group of constraints.requiredConcepts ?? []) {
    if (!matchesGroup(normalized, group)) results.push(failure('vocabulary',`Câu còn thiếu ý bắt buộc: ${group.join(' / ')}.`,group[0] ?? 'Bổ sung ý chính.','meaning',90));
  }
  for (const forbidden of constraints.forbiddenConcepts ?? []) {
    if (containsPhrase(normalized, forbidden)) results.push(failure('vocabulary',`“${forbidden}” làm câu mang ý trái với tình huống.`, 'Diễn đạt lại đúng ý của prompt.','meaning',92,forbidden));
  }
  for (const group of constraints.criticalValues ?? []) {
    if (!matchesGroup(normalized, group)) results.push(failure('vocabulary',`Giá trị quan trọng trong tình huống phải là ${group.join(' / ')}.`,group[0] ?? 'Giữ đúng giá trị.','meaning',98));
  }
  for (const group of constraints.criticalTokens ?? []) {
    if (!matchesGroup(normalized, group)) results.push(failure('grammar',`Cấu trúc này cần một trong các dấu hiệu: ${group.join(' / ')}.`,group[0] ?? 'Bổ sung từ khóa ngữ pháp.','grammar',85));
  }

  const expectation = constraints.tenseExpectation;
  const questionAuxiliary = QUESTION_WORDS.has(tokens[0] ?? '')
    ? tokens.slice(1, 6).find((token) => AUXILIARIES.has(token))
    : tokens[0];
  if (expectation === 'past-simple-question' && questionAuxiliary !== 'did' && !['was','were'].includes(questionAuxiliary ?? '')) results.push(failure('tense','Câu hỏi này nói về quá khứ; Present Simple không phù hợp.','Dùng “Did + subject + base verb ...?”','meaning',97));
  if (expectation === 'past-simple' && !tokens.some((token) => ['did','was','were'].includes(token)) && !/\b\w+(ed|went|came|saw|had|made|took|got|left)\b/.test(normalized)) results.push(failure('tense','Tình huống đã xảy ra trong quá khứ, nhưng câu chưa có dấu hiệu Past Simple.','Dùng động từ quá khứ phù hợp.','grammar',88));
  if (expectation === 'present-simple-question' && !['do','does','am','is','are','can','have','has'].includes(questionAuxiliary ?? '')) results.push(failure('auxiliary','Câu hỏi Present Simple cần trợ động từ trước chủ ngữ.','Dùng “Do/Does + subject + base verb ...?”','grammar',86));
  if (expectation === 'present-perfect' && !tokens.some((token) => ['have','has'].includes(token))) results.push(failure('tense','Câu này cần Present Perfect để nối hành động với hiện tại.','Dùng “have/has + past participle”.','meaning',96));
  if (expectation === 'present-perfect-duration') {
    if (!tokens.some((token) => ['have','has'].includes(token))) results.push(failure('tense','Khoảng thời gian kéo dài đến hiện tại cần Present Perfect.','Dùng “have/has + past participle”.','meaning',96));
    if (!tokens.some((token) => ['since','for'].includes(token))) results.push(failure('preposition','Hãy dùng “since” cho mốc bắt đầu hoặc “for” cho khoảng thời gian.','Dùng since/for đúng với giá trị thời gian.','grammar',87));
  }
  if (expectation === 'first-conditional' && !(tokens.includes('if') && tokens.includes('will'))) results.push(failure('tense','First Conditional cần nối điều kiện có thể xảy ra với kết quả tương lai.','Dùng “If + Present Simple, ... will + verb”.','meaning',96));
  if (expectation === 'third-conditional' && !(tokens.includes('if') && tokens.includes('had') && tokens.includes('would') && tokens.includes('have'))) results.push(failure('tense','Đây là giả định trái với quá khứ, nên cần Third Conditional.','Dùng “If + had + V3, ... would have + V3”.','meaning',99));
  return results;
}

export function semanticConstraintsSatisfied(answer: string, turn: ConversationTurn): boolean {
  const constraints = turn.semanticConstraints;
  if (!constraints?.requiredConcepts?.length && !constraints?.intent) return false;
  return runSemanticRules(answer, turn).every((result) => result.passed);
}

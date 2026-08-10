import type { ConversationTurn } from '../../types/domain';
import { evaluationTokens } from '../sentence-normalizer';
import { failure, type RuleResult } from './types';

const CRITICAL = new Set(['do','did','have','had','is','was','will','would','can','could','if','not','before','after','since','for','already','yet','much','many','go','got']);

function distance(left: string, right: string): number {
  const row = Array.from({ length:right.length + 1 },(_,index) => index);
  for (let i=1;i<=left.length;i+=1) {
    let previous=row[0] ?? 0; row[0]=i;
    for (let j=1;j<=right.length;j+=1) {
      const stored=row[j] ?? 0;
      row[j]=Math.min((row[j] ?? 0)+1,(row[j-1] ?? 0)+1,previous+(left[i-1]===right[j-1]?0:1));
      previous=stored;
    }
  }
  return row[right.length] ?? 0;
}

export function checkSingleTypo(answer: string, turn: ConversationTurn): RuleResult | undefined {
  const actual=evaluationTokens(answer);
  const expected=evaluationTokens(turn.canonicalAnswer);
  if (actual.length !== expected.length) return undefined;
  const differences=actual.map((token,index) => ({ token, expected:expected[index] ?? '' })).filter(({token,expected:target}) => token !== target);
  if (differences.length !== 1) return undefined;
  const item=differences[0];
  if (!item || item.token.length < 5 || item.expected.length < 5 || CRITICAL.has(item.token) || CRITICAL.has(item.expected) || distance(item.token,item.expected) !== 1) return undefined;
  return failure('spelling',`“${item.token}” có vẻ là lỗi chính tả nhỏ; cách viết đúng là “${item.expected}”.`,item.expected,'minor',20,item.token);
}

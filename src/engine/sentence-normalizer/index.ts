const SMART_APOSTROPHES = /[‘’`´]/g;
const PUNCTUATION = /[.!?,;:\-–—"“”()[\]{}]/g;

export function normalizeSentence(value: string): string {
  return value
    .normalize('NFKC')
    .replace(SMART_APOSTROPHES, "'")
    .replace(PUNCTUATION, ' ')
    .toLocaleLowerCase('en')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenize(value: string): string[] {
  const normalized = normalizeSentence(value);
  return normalized ? normalized.split(' ') : [];
}

const UNAMBIGUOUS_CONTRACTIONS: Array<[RegExp, string]> = [
  [/\b(can't|cannot)\b/g, 'can not'], [/\bwon't\b/g, 'will not'], [/\bshan't\b/g, 'shall not'],
  [/\b(i'm)\b/g, 'i am'], [/\b(you're)\b/g, 'you are'], [/\b(we're)\b/g, 'we are'], [/\b(they're)\b/g, 'they are'],
  [/\b(he's)\b/g, 'he is'], [/\b(she's)\b/g, 'she is'], [/\b(it's)\b/g, 'it is'],
  [/\b(i've)\b/g, 'i have'], [/\b(you've)\b/g, 'you have'], [/\b(we've)\b/g, 'we have'], [/\b(they've)\b/g, 'they have'],
  [/\b(i'll)\b/g, 'i will'], [/\b(you'll)\b/g, 'you will'], [/\b(we'll)\b/g, 'we will'], [/\b(they'll)\b/g, 'they will'],
  [/\b(don't)\b/g, 'do not'], [/\b(doesn't)\b/g, 'does not'], [/\b(didn't)\b/g, 'did not'],
  [/\b(isn't)\b/g, 'is not'], [/\b(aren't)\b/g, 'are not'], [/\b(wasn't)\b/g, 'was not'], [/\b(weren't)\b/g, 'were not'],
  [/\b(haven't)\b/g, 'have not'], [/\b(hasn't)\b/g, 'has not'], [/\b(hadn't)\b/g, 'had not'],
  [/\b(wouldn't)\b/g, 'would not'], [/\b(couldn't)\b/g, 'could not'], [/\b(shouldn't)\b/g, 'should not'],
];

export function normalizeForEvaluation(value: string): string {
  let normalized = normalizeSentence(value);
  for (const [pattern, replacement] of UNAMBIGUOUS_CONTRACTIONS) normalized = normalized.replace(pattern, replacement);
  normalized = normalized
    .replace(/\bi'd\s+(like|love|prefer|rather|be|go|call|take|want|need)\b/g, 'i would $1')
    .replace(/\bi'd\s+(already|just|never|been|seen|done|finished|known|left|called)\b/g, 'i had $1');
  return normalized.replace(/\s+/g, ' ').trim();
}

export function evaluationTokens(value: string): string[] {
  const normalized = normalizeForEvaluation(value);
  return normalized ? normalized.split(' ') : [];
}

export function firstLetterHint(answer: string): string {
  return answer
    .split(/(\s+)/)
    .map((part) =>
      /^\s+$/.test(part)
        ? part
        : part.replace(/[A-Za-z]/g, (letter, index) => (index === 0 ? letter : '_')),
    )
    .join('');
}

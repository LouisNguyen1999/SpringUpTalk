import { describe, expect, it } from 'vitest';
import { firstLetterHint, normalizeSentence, tokenize } from '../engine/sentence-normalizer';

describe('normalizeSentence', () => {
  it('normalizes case, punctuation, apostrophes and whitespace', () => expect(normalizeSentence('  I’m   READY! ')).toBe("i'm ready"));
  it('tokenizes normalized text', () => expect(tokenize('Hello,  friend!')).toEqual(['hello','friend']));
  it('builds a first-letter hint and preserves punctuation', () => expect(firstLetterHint('How are you?')).toBe('H__ a__ y__?'));
});

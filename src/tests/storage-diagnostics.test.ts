import { describe, expect, it } from 'vitest';
import { storageDiagnostics } from '../utils/storage-diagnostics';

describe('progress storage diagnostics', () => {
  it('measures UTF-8 bytes without counting actions', () => {
    const result = storageDiagnostics({ word:'xin chào', action:() => undefined });
    expect(result.bytes).toBeGreaterThan('xin chào'.length);
    expect(result.warning).toBe(false);
  });
  it('warns before local persistence becomes unsafe', () => expect(storageDiagnostics({ value:'x'.repeat(2_100_000) }).warning).toBe(true));
});

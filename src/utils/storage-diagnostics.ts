export interface StorageDiagnostics { bytes:number; kilobytes:number; warning:boolean }

export function storageDiagnostics(value: unknown): StorageDiagnostics {
  const serialized = JSON.stringify(value, (_key, item) => typeof item === 'function' ? undefined : item);
  const bytes = new TextEncoder().encode(serialized).byteLength;
  return { bytes, kilobytes:bytes / 1024, warning:bytes > 2 * 1024 * 1024 };
}

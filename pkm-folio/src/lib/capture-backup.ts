import type { CaptureItem } from '../domain/capture-item';
import type { CaptureState } from '../features/capture/capture-state';

/** Same as IndexedDB snapshot `v` — bump both when the shape changes. */
export const CAPTURE_EXPORT_V = 1 as const;

export type CaptureExportFileV1 = {
  /** Schema for backup files (may gain fields in later versions). */
  v: typeof CAPTURE_EXPORT_V;
  /** ISO-8601 and unix ms for humans and tooling. */
  exportedAt: string;
  exportedAtMs: number;
  items: CaptureItem[];
  selectedId: string | null;
};

export function buildCaptureExportJson(state: CaptureState): string {
  const now = Date.now();
  const payload: CaptureExportFileV1 = {
    v: CAPTURE_EXPORT_V,
    exportedAt: new Date(now).toISOString(),
    exportedAtMs: now,
    items: state.items,
    selectedId: state.selectedId,
  };
  return JSON.stringify(payload, null, 2);
}

function isCaptureItem(x: unknown): x is CaptureItem {
  if (!x || typeof x !== 'object') {
    return false;
  }
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.body === 'string' &&
    typeof o.createdAt === 'number'
  );
}

/**
 * Parse a backup JSON file. Rejects files that are not v1 or malformed.
 */
export function parseCaptureImportJson(
  text: string,
): Pick<CaptureState, 'items' | 'selectedId'> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text) as unknown;
  } catch {
    throw new Error('File is not valid JSON.');
  }
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid backup: expected an object.');
  }
  const p = parsed as Record<string, unknown>;
  if (p.v !== CAPTURE_EXPORT_V) {
    throw new Error(
      `Unsupported backup version (got ${String(p.v)}, need ${String(CAPTURE_EXPORT_V)}).`,
    );
  }
  if (!Array.isArray(p.items)) {
    throw new Error('Invalid backup: items must be an array.');
  }
  if (!p.items.every(isCaptureItem)) {
    throw new Error('Invalid backup: one or more items are malformed.');
  }
  const items = p.items as CaptureItem[];
  const selectedId =
    p.selectedId === null
      ? null
      : typeof p.selectedId === 'string'
        ? p.selectedId
        : null;
  const selectedValid =
    selectedId === null || items.some((i) => i.id === selectedId);
  return {
    items,
    selectedId: selectedValid ? selectedId : null,
  };
}

export function downloadCaptureJsonFile(state: CaptureState, filename: string) {
  const json = buildCaptureExportJson(state);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

import type { CaptureItem } from '../domain/capture-item';

/**
 * Client-side search: case-insensitive substring on body text.
 * Newest-first when listing.
 */
export function filterCapturesByQuery(
  items: CaptureItem[],
  query: string,
): CaptureItem[] {
  const q = query.trim().toLowerCase();
  const sorted = [...items].sort((a, b) => b.createdAt - a.createdAt);
  if (!q) {
    return sorted;
  }
  return sorted.filter((i) => i.body.toLowerCase().includes(q));
}

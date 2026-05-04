/** A single quick capture in the inbox (Phase 2 — in-memory only). */
export type CaptureItem = {
  id: string;
  body: string;
  createdAt: number;
};

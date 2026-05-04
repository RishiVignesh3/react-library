import { openDB, type IDBPDatabase } from 'idb';

import type { CaptureItem } from '../domain/capture-item';
import type { CaptureState } from '../features/capture/capture-state';

const DB_NAME = 'pkm-folio';
const DB_VERSION = 1;
const STORE = 'keyval';
const KEY = 'capture-state';

export const CAPTURE_SNAPSHOT_V = 1 as const;

type CaptureSnapshotV1 = {
  v: typeof CAPTURE_SNAPSHOT_V;
  items: CaptureItem[];
  selectedId: string | null;
};

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDb(): Promise<IDBPDatabase> {
  if (typeof indexedDB === 'undefined') {
    return Promise.reject(
      new Error('IndexedDB is not available in this environment.'),
    );
  }
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE);
        }
      },
    });
  }
  return dbPromise;
}

export async function readCaptureState(): Promise<CaptureState | null> {
  if (typeof indexedDB === 'undefined') {
    return null;
  }
  try {
    const db = await getDb();
    const raw = (await db.get(STORE, KEY)) as unknown;
    if (!raw || typeof raw !== 'object') {
      return null;
    }
    const snap = raw as Partial<CaptureSnapshotV1>;
    if (snap.v !== 1) {
      return null;
    }
    if (!Array.isArray(snap.items)) {
      return null;
    }
    const selectedId =
      snap.selectedId === null
        ? null
        : typeof snap.selectedId === 'string'
          ? snap.selectedId
          : null;
    return {
      items: snap.items as CaptureItem[],
      selectedId,
    };
  } catch {
    return null;
  }
}

export async function writeCaptureState(state: CaptureState): Promise<void> {
  if (typeof indexedDB === 'undefined') {
    return;
  }
  const db = await getDb();
  const payload: CaptureSnapshotV1 = {
    v: CAPTURE_SNAPSHOT_V,
    items: state.items,
    selectedId: state.selectedId,
  };
  await db.put(STORE, payload, KEY);
}

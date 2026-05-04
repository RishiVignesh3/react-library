import type { CaptureItem } from '../../domain/capture-item';

export type CaptureState = {
  items: CaptureItem[];
  /** Which item is shown in the detail panel (list + detail). */
  selectedId: string | null;
};

export type CaptureAction =
  | { type: 'ADD'; body: string }
  | { type: 'UPDATE'; id: string; body: string }
  | { type: 'DELETE'; id: string }
  | { type: 'SELECT'; id: string | null }
  /** Restore from IndexedDB or imported JSON backup. */
  | {
      type: 'HYDRATE';
      items: CaptureItem[];
      selectedId: string | null;
    };

function newId(): string {
  return crypto.randomUUID();
}

export function captureReducer(
  state: CaptureState,
  action: CaptureAction,
): CaptureState {
  switch (action.type) {
    case 'ADD': {
      const trimmed = action.body.trim();
      if (!trimmed) {
        return state;
      }
      const item: CaptureItem = {
        id: newId(),
        body: trimmed,
        createdAt: Date.now(),
      };
      return {
        items: [item, ...state.items],
        selectedId: item.id,
      };
    }
    case 'UPDATE': {
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, body: action.body.trim() } : i,
        ),
      };
    }
    case 'DELETE': {
      const items = state.items.filter((i) => i.id !== action.id);
      return {
        items,
        selectedId:
          state.selectedId === action.id ? null : state.selectedId,
      };
    }
    case 'SELECT':
      return { ...state, selectedId: action.id };
    case 'HYDRATE': {
      const selectedId =
        action.selectedId === null
          ? null
          : action.items.some((i) => i.id === action.selectedId)
            ? action.selectedId
            : null;
      return { items: action.items, selectedId };
    }
    default:
      return state;
  }
}

export const initialCaptureState: CaptureState = {
  items: [],
  selectedId: null,
};

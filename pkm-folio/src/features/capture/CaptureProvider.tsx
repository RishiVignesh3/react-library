import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type Dispatch,
  type ReactNode,
} from 'react';

import {
  captureReducer,
  initialCaptureState,
  type CaptureAction,
  type CaptureState,
} from './capture-state';
import { readCaptureState, writeCaptureState } from '../../storage/capture-db';

const PERSIST_DEBOUNCE_MS = 400;

type CaptureContextValue = {
  state: CaptureState;
  dispatch: Dispatch<CaptureAction>;
  /** False until first IndexedDB read finishes (success or error). */
  persistenceReady: boolean;
  persistenceError: string | null;
  clearPersistenceError: () => void;
};

const CaptureContext = createContext<CaptureContextValue | null>(null);

export function CaptureProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(captureReducer, initialCaptureState);
  const [persistenceReady, setPersistenceReady] = useState(false);
  const [persistenceError, setPersistenceError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    readCaptureState()
      .then((loaded) => {
        if (cancelled || !loaded) {
          return;
        }
        dispatch({
          type: 'HYDRATE',
          items: loaded.items,
          selectedId: loaded.selectedId,
        });
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setPersistenceError(
            e instanceof Error ? e.message : 'Failed to load saved captures.',
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setPersistenceReady(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!persistenceReady) {
      return;
    }
    const id = window.setTimeout(() => {
      writeCaptureState(state).catch((e: unknown) => {
        setPersistenceError(
          e instanceof Error ? e.message : 'Failed to save captures.',
        );
      });
    }, PERSIST_DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [state, persistenceReady]);

  const clearPersistenceError = () => setPersistenceError(null);

  const value: CaptureContextValue = {
    state,
    dispatch,
    persistenceReady,
    persistenceError,
    clearPersistenceError,
  };

  return (
    <CaptureContext.Provider value={value}>{children}</CaptureContext.Provider>
  );
}

export function useCapture(): CaptureContextValue {
  const ctx = useContext(CaptureContext);
  if (!ctx) {
    throw new Error('useCapture must be used within CaptureProvider');
  }
  return ctx;
}

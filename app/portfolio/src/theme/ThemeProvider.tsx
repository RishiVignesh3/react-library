import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { THEME_PREFERENCE_OPTIONS, THEME_STORAGE_KEY } from './constants';
import { applyThemeToDocument } from './dom';
import { resolveTheme } from './resolveTheme';
import { readStoredThemePreference, writeStoredThemePreference } from './storage';
import type { ResolvedTheme, ThemePreference } from './types';
import { useSystemPrefersDark } from './useSystemPrefersDark';

export interface ThemeContextValue {
  readonly preference: ThemePreference;
  readonly resolvedTheme: ResolvedTheme;
  readonly setPreference: (next: ThemePreference) => void;
  readonly cyclePreference: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function nextPreference(current: ThemePreference): ThemePreference {
  const i = THEME_PREFERENCE_OPTIONS.indexOf(current);
  const next = (i + 1) % THEME_PREFERENCE_OPTIONS.length;
  return THEME_PREFERENCE_OPTIONS[next] ?? 'system';
}

function useThemeState() {
  const [preference, setPreferenceState] = useState<ThemePreference>(() => {
    return readStoredThemePreference() ?? 'system';
  });

  const systemPrefersDark = useSystemPrefersDark();

  const resolvedTheme = useMemo(
    () => resolveTheme(preference, systemPrefersDark),
    [preference, systemPrefersDark],
  );

  useEffect(() => {
    writeStoredThemePreference(preference);
    applyThemeToDocument(resolvedTheme, preference);
  }, [preference, resolvedTheme]);

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== THEME_STORAGE_KEY || event.newValue === null) {
        return;
      }
      const next = event.newValue;
      if (
        next === 'light' ||
        next === 'dark' ||
        next === 'system'
      ) {
        setPreferenceState(next);
      }
    }

    globalThis.addEventListener('storage', onStorage);
    return () => globalThis.removeEventListener('storage', onStorage);
  }, []);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
  }, []);

  const cyclePreference = useCallback(() => {
    setPreferenceState((prev) => nextPreference(prev));
  }, []);

  return useMemo(
    (): ThemeContextValue =>
      ({
        preference,
        resolvedTheme,
        setPreference,
        cyclePreference,
      }) satisfies ThemeContextValue,
    [preference, resolvedTheme, setPreference, cyclePreference],
  );
}

export function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const value = useThemeState();

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}

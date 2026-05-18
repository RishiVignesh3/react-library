import { THEME_PREFERENCE_OPTIONS, THEME_STORAGE_KEY } from './constants';
import type { ThemePreference } from './types';

const valid = new Set<string>(THEME_PREFERENCE_OPTIONS);

function isThemePreference(value: string): value is ThemePreference {
  return valid.has(value);
}

export function readStoredThemePreference(): ThemePreference | null {
  try {
    const raw = globalThis.localStorage?.getItem(THEME_STORAGE_KEY);
    if (raw !== null && isThemePreference(raw)) {
      return raw;
    }
  } catch {
    /* private mode / SSR */
  }
  return null;
}

export function writeStoredThemePreference(preference: ThemePreference): void {
  try {
    globalThis.localStorage?.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    /* ignore */
  }
}

import { LOCALE_STORAGE_KEY, SUPPORTED_LOCALES } from './constants';
import type { Locale } from './types';

const valid = new Set<string>(SUPPORTED_LOCALES);

function isLocale(value: string): value is Locale {
  return valid.has(value);
}

export function readStoredLocale(): Locale | null {
  try {
    const raw = globalThis.localStorage?.getItem(LOCALE_STORAGE_KEY);
    if (raw !== null && isLocale(raw)) {
      return raw;
    }
  } catch {
    /* private mode / SSR */
  }
  return null;
}

export function writeStoredLocale(locale: Locale): void {
  try {
    globalThis.localStorage?.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
}

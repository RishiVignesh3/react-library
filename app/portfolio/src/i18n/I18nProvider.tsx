import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  SUPPORTED_LOCALES,
} from './constants';
import type { MessageKey } from './messageKey';
import { translate } from './lookup';
import { readStoredLocale, writeStoredLocale } from './storage';
import type { Locale } from './types';

export interface I18nContextValue {
  readonly locale: Locale;
  readonly setLocale: (next: Locale) => void;
  readonly t: (key: MessageKey) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

function useI18nState() {
  const [locale, setLocaleState] = useState<Locale>(() => {
    return readStoredLocale() ?? DEFAULT_LOCALE;
  });

  useEffect(() => {
    writeStoredLocale(locale);
    document.documentElement.lang = locale;

    const title = translate(locale, 'meta.documentTitle');
    document.title = title;

    const desc = translate(locale, 'meta.documentDescription');
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);
  }, [locale]);

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== LOCALE_STORAGE_KEY || event.newValue === null) {
        return;
      }
      const next = event.newValue;
      if ((SUPPORTED_LOCALES as readonly string[]).includes(next)) {
        setLocaleState(next as Locale);
      }
    }

    globalThis.addEventListener('storage', onStorage);
    return () => globalThis.removeEventListener('storage', onStorage);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const t = useCallback(
    (key: MessageKey) => translate(locale, key),
    [locale],
  );

  return useMemo(
    (): I18nContextValue => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );
}

export function I18nProvider({ children }: Readonly<{ children: ReactNode }>) {
  const value = useI18nState();

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (ctx === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}

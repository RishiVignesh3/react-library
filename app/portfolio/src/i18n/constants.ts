/**
 * Keep in sync with the inline `locale` bootstrap script in `index.html`.
 */
export const LOCALE_STORAGE_KEY = '@org/portfolio/locale' as const;

/** Supported UI locales (BCP 47). Default: English. */
export const SUPPORTED_LOCALES = ['en', 'de', 'es', 'fr', 'ja'] as const;

export const DEFAULT_LOCALE = 'en' as const;

import type { ThemePreference } from './types';

/**
 * Keep in sync with the inline bootstrap script in `index.html`.
 */
export const THEME_STORAGE_KEY = '@org/portfolio/theme-preference' as const;

export const THEME_PREFERENCE_OPTIONS = ['system', 'light', 'dark'] as const satisfies readonly ThemePreference[];

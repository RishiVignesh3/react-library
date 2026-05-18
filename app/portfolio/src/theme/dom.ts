import type { ResolvedTheme, ThemePreference } from './types';

const DATA_ATTR = 'data-theme';

const THEME_COLOR: Record<ResolvedTheme, string> = {
  dark: '#0c0a09',
  light: '#f0efec',
};

let metaThemeColor: HTMLMetaElement | null = null;

function getMetaThemeColor(): HTMLMetaElement {
  if (!metaThemeColor) {
    metaThemeColor = document.querySelector('meta[name="theme-color"]');
  }
  if (!metaThemeColor) {
    metaThemeColor = document.createElement('meta');
    metaThemeColor.setAttribute('name', 'theme-color');
    document.head.appendChild(metaThemeColor);
  }
  return metaThemeColor;
}

export function applyThemeToDocument(
  resolved: ResolvedTheme,
  preference: ThemePreference,
): void {
  const root = document.documentElement;
  root.setAttribute(DATA_ATTR, resolved);
  root.style.colorScheme = resolved;

  /* Hint for devtools / debugging; not used by styles. */
  root.setAttribute('data-theme-preference', preference);

  getMetaThemeColor().setAttribute('content', THEME_COLOR[resolved]);
}

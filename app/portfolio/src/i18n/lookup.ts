import type { MessageKey } from './messageKey';
import type { Messages } from './messages/en';
import { bundles } from './messages/bundles';
import { DEFAULT_LOCALE } from './constants';
import type { Locale } from './types';

function getFromTree(
  tree: Messages,
  key: MessageKey,
): string | undefined {
  const segments = key.split('.');
  let node: unknown = tree;
  for (const seg of segments) {
    if (node === null || typeof node !== 'object' || !(seg in node)) {
      return undefined;
    }
    node = (node as Record<string, unknown>)[seg];
  }
  return typeof node === 'string' ? node : undefined;
}

/**
 * Resolves a message for the active locale, falling back to English, then key.
 */
export function translate(locale: Locale, key: MessageKey): string {
  return (
    getFromTree(bundles[locale], key) ??
    getFromTree(bundles[DEFAULT_LOCALE], key) ??
    key
  );
}

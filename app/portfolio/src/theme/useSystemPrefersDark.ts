import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-color-scheme: dark)';

function subscribe(onChange: () => void) {
  const mq = globalThis.matchMedia(QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

function getServerSnapshot() {
  return false;
}

function getSnapshot() {
  return globalThis.matchMedia(QUERY).matches;
}

/**
 * Subscribes to OS color scheme. Uses `useSyncExternalStore` to avoid tearing
 * and unnecessary re-renders beyond media-query updates.
 */
export function useSystemPrefersDark(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

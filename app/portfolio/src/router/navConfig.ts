import type { MessageKey } from '../i18n/messageKey';
import { PATHS, type AppPath } from './paths';

export interface NavRouteConfig {
  readonly path: AppPath;
  readonly messageKey: MessageKey;
}

export const NAV_ROUTES: readonly NavRouteConfig[] = [
  { path: PATHS.ABOUT, messageKey: 'nav.about' },
  { path: PATHS.COMPANIES, messageKey: 'nav.companies' },
  { path: PATHS.CONTACT, messageKey: 'nav.contact' },
  { path: PATHS.RANDOM, messageKey: 'nav.random' },
] as const;

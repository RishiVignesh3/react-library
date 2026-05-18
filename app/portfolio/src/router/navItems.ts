import { PATHS, type AppPath } from './paths';

export interface NavItem {
  readonly path: AppPath;
  readonly label: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { path: PATHS.ABOUT, label: 'About Me' },
  { path: PATHS.COMPANIES, label: 'Companies & Work' },
  { path: PATHS.CONTACT, label: 'Contact' },
  { path: PATHS.RANDOM, label: 'Random Stuff' },
];

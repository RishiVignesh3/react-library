export const PATHS = {
  ROOT: '/',
  ABOUT: '/about',
  COMPANIES: '/companies',
  CONTACT: '/contact',
  RANDOM: '/random',
} as const;

export type AppPath = (typeof PATHS)[keyof typeof PATHS];

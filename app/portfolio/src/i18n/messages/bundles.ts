import type { Locale } from '../types';
import type { Messages } from './en';
import { messagesDe } from './de';
import { messagesEn } from './en';
import { messagesEs } from './es';
import { messagesFr } from './fr';
import { messagesJa } from './ja';

export const bundles: Record<Locale, Messages> = {
  en: messagesEn,
  de: messagesDe,
  es: messagesEs,
  fr: messagesFr,
  ja: messagesJa,
};

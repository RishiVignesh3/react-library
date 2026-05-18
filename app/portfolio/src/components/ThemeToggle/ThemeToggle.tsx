import type { KeyboardEvent } from 'react';
import { useCallback, useId } from 'react';
import { THEME_PREFERENCE_OPTIONS } from '../../theme/constants';
import { useTheme } from '../../theme/ThemeProvider';
import type { ThemePreference } from '../../theme/types';
import { useI18n } from '../../i18n/I18nProvider';
import type { MessageKey } from '../../i18n/messageKey';
import styles from './ThemeToggle.module.css';

const THEME_LABEL: Record<ThemePreference, MessageKey> = {
  system: 'theme.system',
  light: 'theme.light',
  dark: 'theme.dark',
};

function IconSystem({ className }: Readonly<{ className?: string }>) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm5.657 3.343a1 1 0 0 1 0 1.414l-.707.708a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0ZM18 11a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1Zm-6 8a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm-6-2.657a1 1 0 0 1 1.414 0l.707.707a1 1 0 1 1-1.414 1.414l-.707-.708a1 1 0 0 1 0-1.414ZM6 11a1 1 0 0 1-1-1 1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H6Zm2.343-7.657a1 1 0 0 1 0 1.414l-.707.707A1 1 0 1 1 6.222 5.05l.707-.707a1 1 0 0 1 1.414 0ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
      />
    </svg>
  );
}

function IconSun({ className }: Readonly<{ className?: string }>) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.76 4.84 5.34 3.42a1 1 0 1 1 1.42-1.41l1.41 1.41a1 1 0 0 1-1.41 1.42Zm10.48 0a1 1 0 0 1-1.41-1.42l1.41-1.41a1 1 0 1 1 1.42 1.41l-1.42 1.42ZM12 4a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2h-1a1 1 0 0 1-1-1Zm-7 8a1 1 0 1 1-2 0v-1a1 1 0 0 1 2 0v1Zm15 0a1 1 0 0 1-2 0v-1a1 1 0 0 1 2 0v1ZM12 18a1 1 0 0 1-1 1h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1Zm5.66-3.16 1.41 1.41a1 1 0 1 1-1.41 1.42l-1.42-1.41a1 1 0 0 1 1.42-1.42ZM7.05 16.25a1 1 0 0 1 1.42 1.42l-1.41 1.41a1 1 0 1 1-1.42-1.41l1.41-1.42ZM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
      />
    </svg>
  );
}

function IconMoon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.64 13a9 9 0 0 1-11.04-11 7 7 0 1 0 11.04 11ZM10 3.26a7 7 0 1 1-8.74 8.74 9 9 0 0 0 8.74-8.74Z"
      />
    </svg>
  );
}

const ICONS: Record<ThemePreference, typeof IconSystem> = {
  system: IconSystem,
  light: IconSun,
  dark: IconMoon,
};

export function ThemeToggle() {
  const { preference, setPreference } = useTheme();
  const { t } = useI18n();
  const groupId = useId();
  const labelledBy = `${groupId}-legend`;

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const order = [...THEME_PREFERENCE_OPTIONS];
      const i = order.indexOf(preference);
      const delta = event.key === 'ArrowRight' ? 1 : -1;
      const next = order[(i + delta + order.length) % order.length];
      if (next !== undefined) setPreference(next);
    },
    [preference, setPreference],
  );

  return (
    <div
      className={styles.toggle}
      role="group"
      aria-labelledby={labelledBy}
      onKeyDown={onKeyDown}
    >
      <span id={labelledBy} className={styles.visuallyHidden}>
        {t('a11y.colorTheme')}
      </span>
      {THEME_PREFERENCE_OPTIONS.map((key) => {
        const Icon = ICONS[key];
        const pressed = preference === key;
        const label = t(THEME_LABEL[key]);
        return (
          <button
            key={key}
            type="button"
            className={[styles.btn, pressed ? styles.active : ''].join(' ')}
            aria-pressed={pressed}
            aria-label={label}
            title={label}
            onClick={() => setPreference(key)}
          >
            <Icon className={styles.icon} />
          </button>
        );
      })}
    </div>
  );
}

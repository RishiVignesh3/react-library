import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { SUPPORTED_LOCALES } from '../../i18n/constants';
import { useI18n } from '../../i18n/I18nProvider';
import type { MessageKey } from '../../i18n/messageKey';
import type { Locale } from '../../i18n/types';
import styles from './LanguageSwitcher.module.css';

const OPTION_LABEL: Record<Locale, MessageKey> = {
  en: 'lang.en',
  de: 'lang.de',
  es: 'lang.es',
  fr: 'lang.fr',
  ja: 'lang.ja',
};

function IconGlobe({ className }: Readonly<{ className?: string }>) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm6.93 9h-2.76a15.5 15.5 0 0 0-1.19-5.93A8.03 8.03 0 0 1 18.93 11ZM16.39 13a14.5 14.5 0 0 1-1 5.82 8.12 8.12 0 0 1-6.78 0 14.5 14.5 0 0 1-1-5.82ZM8.6 11H5.07a8.03 8.03 0 0 1 3.95-5.93A15.5 15.5 0 0 0 8.6 11Zm0 2a15.5 15.5 0 0 0 .42 5.93A8.03 8.03 0 0 1 5.07 13H8.6Zm2.61 6.82a14.5 14.5 0 0 0 1.79-6.82h-3.8a14.5 14.5 0 0 0 1.79 6.82ZM10.39 11h3.22a14.5 14.5 0 0 0-1.61 7.36 14.5 14.5 0 0 0-1.61-7.36Zm4.21 0H15a14.5 14.5 0 0 1 1.79 6.82A14.5 14.5 0 0 1 14.6 11Zm2.71-2h2.62a8.03 8.03 0 0 1-3.95 5.93A15.5 15.5 0 0 0 17.31 9Zm-4.9-5.36A14.5 14.5 0 0 1 15.4 9h-3.01a14.5 14.5 0 0 1-1.61-7.36ZM10.21 9H7.2a14.5 14.5 0 0 1 2.98-7.36A14.5 14.5 0 0 0 10.21 9Z"
      />
    </svg>
  );
}

function IconChevron({ className }: Readonly<{ className?: string }>) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M7 10l5 5 5-5H7z" />
    </svg>
  );
}

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const id = useId();
  const labelId = `${id}-lang-label`;
  const listId = `${id}-lang-list`;

  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const localeCount = SUPPORTED_LOCALES.length;

  const highlightedLocale = SUPPORTED_LOCALES[highlight];
  const activeOptionId =
    highlightedLocale !== undefined ? `${id}-opt-${highlightedLocale}` : undefined;

  const syncHighlightToLocale = useCallback(() => {
    const i = SUPPORTED_LOCALES.indexOf(locale);
    setHighlight(i >= 0 ? i : 0);
  }, [locale]);

  useEffect(() => {
    if (open) {
      syncHighlightToLocale();
      queueMicrotask(() => listRef.current?.focus());
    }
  }, [open, syncHighlightToLocale]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(ev: PointerEvent) {
      if (rootRef.current?.contains(ev.target as Node)) return;
      setOpen(false);
    }

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onEscapeKey(ev: globalThis.KeyboardEvent) {
      if (ev.key !== 'Escape') return;
      setOpen(false);
      queueMicrotask(() => triggerRef.current?.focus());
    }

    document.addEventListener('keydown', onEscapeKey);
    return () => document.removeEventListener('keydown', onEscapeKey);
  }, [open]);

  const selectIndex = useCallback(
    (index: number) => {
      const code = SUPPORTED_LOCALES[index];
      if (code !== undefined) {
        setLocale(code);
      }
      setOpen(false);
      queueMicrotask(() => triggerRef.current?.focus());
    },
    [setLocale],
  );

  const onTriggerKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (!open) {
          setOpen(true);
        } else {
          const delta = event.key === 'ArrowDown' ? 1 : -1;
          setHighlight((h) => (h + delta + localeCount) % localeCount);
        }
        return;
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setOpen((o) => !o);
      }
    },
    [open, localeCount],
  );

  const onListKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();
          setHighlight((h) => (h + 1) % localeCount);
          break;
        }
        case 'ArrowUp': {
          event.preventDefault();
          setHighlight((h) => (h - 1 + localeCount) % localeCount);
          break;
        }
        case 'Home': {
          event.preventDefault();
          setHighlight(0);
          break;
        }
        case 'End': {
          event.preventDefault();
          setHighlight(localeCount - 1);
          break;
        }
        case 'Enter':
        case ' ': {
          event.preventDefault();
          selectIndex(highlight);
          break;
        }
        default:
          break;
      }
    },
    [highlight, localeCount, selectIndex],
  );

  useEffect(() => {
    if (!open || activeOptionId === undefined) return;
    document
      .getElementById(activeOptionId)
      ?.scrollIntoView({ block: 'nearest' });
  }, [open, activeOptionId, highlight]);

  const currentLabel = t(OPTION_LABEL[locale]);

  const triggerClass = useMemo(
    () =>
      [styles.trigger, open ? styles.triggerOpen : ''].filter(Boolean).join(' '),
    [open],
  );

  const chevronClass = useMemo(
    () =>
      [styles.chevron, open ? styles.chevronOpen : ''].filter(Boolean).join(' '),
    [open],
  );

  return (
    <div ref={rootRef} className={styles.root}>
      <span id={labelId} className={styles.visuallyHidden}>
        {t('a11y.language')}
      </span>
      <button
        ref={triggerRef}
        type="button"
        className={triggerClass}
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
      >
        <span className={styles.triggerIcon} aria-hidden="true">
          <IconGlobe className={styles.globe} />
        </span>
        <span className={styles.triggerText}>
          <span className={styles.triggerLabel}>{t('a11y.language')}</span>
          <span className={styles.triggerValue}>{currentLabel}</span>
        </span>
        <IconChevron className={chevronClass} />
      </button>

      {open ? (
        <div
          ref={listRef}
          id={listId}
          className={styles.menu}
          role="listbox"
          tabIndex={0}
          aria-labelledby={labelId}
          aria-activedescendant={activeOptionId}
          onKeyDown={onListKeyDown}
        >
          {SUPPORTED_LOCALES.map((code, index) => {
            const selected = locale === code;
            const optionId = `${id}-opt-${code}`;
            const isActive = index === highlight;
            return (
              <div
                key={code}
                id={optionId}
                role="option"
                aria-selected={selected}
                className={[
                  styles.option,
                  selected ? styles.optionSelected : '',
                  isActive && !selected ? styles.optionActive : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => selectIndex(index)}
                onMouseEnter={() => setHighlight(index)}
              >
                <span className={styles.check} aria-hidden="true">
                  {selected ? '✓' : ''}
                </span>
                <span className={styles.optionName}>{t(OPTION_LABEL[code])}</span>
                <span className={styles.code}>{code}</span>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

import type { ReactNode } from 'react';

import styles from './result-callout.module.css';

export type ResultCalloutTone = 'success' | 'warning' | 'danger';

const toneClass: Record<ResultCalloutTone, string> = {
  success: styles.toneSuccess,
  warning: styles.toneWarning,
  danger: styles.toneDanger,
};

export type ResultCalloutProps = {
  title: string;
  summary: string;
  tone: ResultCalloutTone;
  body: ReactNode;
};

export function ResultCallout({
  title,
  summary,
  tone,
  body,
}: ResultCalloutProps) {
  return (
    <div className={styles.root} aria-live="polite">
      <p className={styles.title}>{title}</p>
      <p className={`${styles.summary} ${toneClass[tone]}`}>{summary}</p>
      <pre className={styles.body}>{body}</pre>
    </div>
  );
}

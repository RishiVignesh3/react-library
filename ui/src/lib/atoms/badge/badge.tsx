import type { ComponentPropsWithoutRef } from 'react';

import styles from './badge.module.css';

export type BadgeTone = 'default' | 'accent' | 'success' | 'warn';

const toneClass: Record<BadgeTone, string> = {
  default: styles.default,
  accent: styles.accent,
  success: styles.success,
  warn: styles.warn,
};

export type BadgeProps = ComponentPropsWithoutRef<'span'> & {
  tone?: BadgeTone;
};

export function Badge({
  tone = 'default',
  className,
  ...props
}: BadgeProps) {
  const combined = [styles.root, toneClass[tone], className]
    .filter(Boolean)
    .join(' ');
  return <span className={combined} {...props} />;
}

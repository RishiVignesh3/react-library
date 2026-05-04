import type { ComponentPropsWithoutRef, ElementType } from 'react';

import styles from './text.module.css';

export type TextVariant = 'body' | 'lead' | 'muted' | 'small' | 'label';

export type TextProps<T extends ElementType = 'p'> = {
  as?: T;
  variant?: TextVariant;
  mono?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

export function Text<T extends ElementType = 'p'>({
  as,
  variant = 'body',
  mono = false,
  className,
  ...props
}: TextProps<T>) {
  const Component = as ?? 'p';
  const variantClass = {
    body: styles.body,
    lead: styles.lead,
    muted: styles.muted,
    small: styles.small,
    label: styles.label,
  }[variant];

  const combined = [styles.root, variantClass, mono && styles.mono, className]
    .filter(Boolean)
    .join(' ');

  return <Component className={combined} {...props} />;
}

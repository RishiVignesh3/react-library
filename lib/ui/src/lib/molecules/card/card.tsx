import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import styles from './card.module.css';

export type CardProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode;
  compact?: boolean;
};

export function Card({
  children,
  compact = false,
  className,
  ...props
}: CardProps) {
  const combined = [styles.root, compact && styles.compact, className]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={combined} {...props}>
      {children}
    </div>
  );
}

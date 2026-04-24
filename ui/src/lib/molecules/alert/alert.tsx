import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import styles from './alert.module.css';

export type AlertVariant = 'error' | 'info';

const variantClass: Record<AlertVariant, string> = {
  error: styles.error,
  info: styles.info,
};

export type AlertProps = ComponentPropsWithoutRef<'div'> & {
  variant?: AlertVariant;
  children: ReactNode;
};

export function Alert({
  variant = 'error',
  children,
  className,
  role = 'alert',
  ...props
}: AlertProps) {
  const combined = [styles.root, variantClass[variant], className]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={combined} role={role} {...props}>
      {children}
    </div>
  );
}

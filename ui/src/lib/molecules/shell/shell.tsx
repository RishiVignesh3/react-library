import type { ReactNode } from 'react';

import styles from './shell.module.css';

export type ShellProps = {
  children: ReactNode;
  maxWidth?: string;
};

export function Shell({ children, maxWidth }: ShellProps) {
  return (
    <div className={styles.root}>
      <div
        className={styles.inner}
        style={maxWidth ? { maxWidth } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

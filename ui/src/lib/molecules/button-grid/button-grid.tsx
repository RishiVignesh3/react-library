import type { ReactNode } from 'react';

import styles from './button-grid.module.css';

export type ButtonGridProps = {
  children: ReactNode;
  columns?: 1 | 2;
};

export function ButtonGrid({ children, columns = 2 }: ButtonGridProps) {
  const combined = [styles.root, columns === 2 && styles.two]
    .filter(Boolean)
    .join(' ');
  return <div className={combined}>{children}</div>;
}

export type ButtonGridCellProps = { children: ReactNode };

export function ButtonGridCell({ children }: ButtonGridCellProps) {
  return <div className={styles.cell}>{children}</div>;
}

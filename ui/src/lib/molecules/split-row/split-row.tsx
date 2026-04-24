import type { ReactNode } from 'react';

import styles from './split-row.module.css';

export type SplitRowProps = {
  main: ReactNode;
  actions?: ReactNode;
};

export function SplitRow({ main, actions }: SplitRowProps) {
  return (
    <div className={styles.root}>
      <div className={styles.main}>{main}</div>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>
  );
}

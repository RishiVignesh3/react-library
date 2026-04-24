import type { ReactNode } from 'react';

import { Heading } from '../../atoms/heading/heading';

import styles from './page-header.module.css';

export type PageHeaderProps = {
  title: ReactNode;
  /** Typically a Badge or metadata chip */
  badge?: ReactNode;
  /** Trailing actions (buttons, menus) */
  actions?: ReactNode;
  headingLevel?: 1 | 2 | 3;
};

export function PageHeader({
  title,
  badge,
  actions,
  headingLevel = 1,
}: PageHeaderProps) {
  return (
    <header className={styles.root}>
      <div className={styles.titleBlock}>
        <Heading level={headingLevel}>{title}</Heading>
      </div>
      <div className={styles.actions}>
        {badge}
        {actions}
      </div>
    </header>
  );
}

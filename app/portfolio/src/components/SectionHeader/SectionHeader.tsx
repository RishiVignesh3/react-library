import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

export interface SectionHeaderProps {
  readonly titleId: string;
  readonly title: string;
  readonly eyebrow?: string;
  readonly lead?: string;
  readonly children?: ReactNode;
}

export function SectionHeader({
  titleId,
  title,
  eyebrow,
  lead,
  children,
}: SectionHeaderProps) {
  return (
    <header className={styles.header}>
      {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
      <h1 id={titleId} className={styles.title}>
        {title}
      </h1>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
      {children}
    </header>
  );
}

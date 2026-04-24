import type { ReactNode } from 'react';

import { Heading } from '../../atoms/heading/heading';
import { Text } from '../../atoms/text/text';

import styles from './section.module.css';

export type SectionProps = {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  headingLevel?: 2 | 3 | 4;
};

export function Section({
  title,
  description,
  children,
  headingLevel = 2,
}: SectionProps) {
  return (
    <section className={styles.root}>
      <Heading level={headingLevel} className={styles.title}>
        {title}
      </Heading>
      {description ? (
        <Text variant="muted" className={styles.description}>
          {description}
        </Text>
      ) : null}
      {children}
    </section>
  );
}

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import styles from './heading.module.css';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const levelClass: Record<HeadingLevel, string> = {
  1: styles.h1,
  2: styles.h2,
  3: styles.h3,
  4: styles.h4,
  5: styles.h5,
  6: styles.h6,
};

export type HeadingProps = Omit<ComponentPropsWithoutRef<'h1'>, 'children'> & {
  level?: HeadingLevel;
  children: ReactNode;
};

export function Heading({
  level = 1,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as const;
  const combined = [styles.root, levelClass[level], className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={combined} {...props}>
      {children}
    </Tag>
  );
}

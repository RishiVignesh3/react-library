import type { ComponentPropsWithoutRef } from 'react';

import styles from './divider.module.css';

export type DividerProps = ComponentPropsWithoutRef<'hr'> & {
  spaced?: boolean;
};

export function Divider({ spaced = true, className, ...props }: DividerProps) {
  const combined = [styles.root, spaced && styles.spaced, className]
    .filter(Boolean)
    .join(' ');
  return <hr className={combined} {...props} />;
}

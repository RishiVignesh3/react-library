import type { ComponentPropsWithoutRef } from 'react';

import styles from './code.module.css';

export type CodeProps = ComponentPropsWithoutRef<'code'>;

export function Code({ className, ...props }: CodeProps) {
  const combined = [styles.root, className].filter(Boolean).join(' ');
  return <code className={combined} {...props} />;
}

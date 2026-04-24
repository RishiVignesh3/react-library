import type { ComponentPropsWithoutRef } from 'react';

import styles from './endpoint-block.module.css';

export type EndpointBlockProps = ComponentPropsWithoutRef<'div'> & {
  url: string;
};

export function EndpointBlock({ url, className, ...props }: EndpointBlockProps) {
  const combined = [styles.root, className].filter(Boolean).join(' ');
  return (
    <div className={combined} {...props}>
      {url}
    </div>
  );
}

import { ComponentPropsWithoutRef, forwardRef } from 'react';

import styles from './input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';

export type InputProps = ComponentPropsWithoutRef<'input'> & {
  size?: InputSize;
  invalid?: boolean;
  inline?: boolean;
};

const sizeClass: Record<InputSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { size = 'md', invalid = false, inline = false, className, ...props },
    ref,
  ) {
    const combined = [
      styles.root,
      sizeClass[size],
      invalid && styles.invalid,
      inline && styles.inline,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <input
        ref={ref}
        className={combined}
        aria-invalid={invalid || undefined}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

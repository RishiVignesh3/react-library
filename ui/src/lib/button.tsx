import { ComponentPropsWithoutRef, forwardRef } from 'react';

import styles from './button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  outline: styles.outline,
};

const sizeClass: Record<ButtonSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      className,
      type = 'button',
      children,
      ...props
    },
    ref,
  ) {
    const combined = [
      styles.root,
      variantClass[variant],
      sizeClass[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} type={type} className={combined} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

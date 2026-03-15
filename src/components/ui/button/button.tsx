import React from 'react';
import styles from './button.module.scss';

export type ButtonVariant = 'filled' | 'outline' | 'ghost' | 'subtle';
export type ButtonSize    = 'sm' | 'md' | 'lg';
export type ButtonIntent  = 'default' | 'danger' | 'success' | 'warning';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  intent?:    ButtonIntent;
  loading?:   boolean;
  fullWidth?: boolean;
  iconOnly?:  boolean;
  /** Renders as an <a> tag when provided */
  href?:      string;
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant   = 'filled',
      size      = 'md',
      intent    = 'default',
      loading   = false,
      fullWidth = false,
      iconOnly  = false,
      href,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      styles.button,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      intent !== 'default' && styles[`intent-${intent}`],
      loading   && styles.loading,
      fullWidth && styles.fullWidth,
      iconOnly  && styles.iconOnly,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
        <span className={styles.label}>{children}</span>
        {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </>
    );

    if (href) {
      return (
        <a href={href} className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading}
        {...rest}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = 'Button';

import NextLink from 'next/link';
import type { LinkProps as NextLinkProps } from 'next/link';
import styles from './link.module.scss';

export type LinkVariant  = 'default' | 'subtle' | 'plain' | 'button';
export type LinkSize     = 'sm' | 'md' | 'lg';
export type LinkIntent   = 'default' | 'danger' | 'success';
export type LinkUnderline = 'always' | 'hover' | 'none';

export interface LinkProps
  extends Omit<NextLinkProps, 'className'>,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  variant?:    LinkVariant;
  size?:       LinkSize;
  intent?:     LinkIntent;
  underline?:  LinkUnderline;
  external?:   boolean;
  leftIcon?:   React.ReactNode;
  rightIcon?:  React.ReactNode;
  className?:  string;
  children?:   React.ReactNode;
}

// Inline SVG so there is no client-side icon library dependency
function ExternalIcon() {
  return (
    <svg
      className={styles.externalIcon}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function Link({
  variant   = 'default',
  size      = 'md',
  intent    = 'default',
  underline = 'hover',
  external  = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...rest
}: LinkProps) {
  const classes = [
    styles.link,
    variant !== 'default' && styles[`variant-${variant}`],
    styles[`size-${size}`],
    intent  !== 'default' && styles[`intent-${intent}`],
    styles[`underline-${underline}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <NextLink className={classes} {...externalProps} {...rest}>
      {leftIcon  && <span aria-hidden="true">{leftIcon}</span>}
      {children}
      {external  && <ExternalIcon />}
      {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
    </NextLink>
  );
}

import { forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import { LOGO_MARKUP } from './Logo.constants';

import './Logo.styles.scss';

import type { LogoElement, LogoProps } from './Logo.types';

function LogoBase(
  {
    className,
    appearance = 'clearspace',
    decorative = false,
    label = 'dgbragas',
    ...rest
  }: LogoProps,
  ref: ForwardedRef<LogoElement>
) {
  const styles = clsx('yl-logo', `yl-logo--${appearance}`, className);
  const accessibilityProps = decorative
    ? { 'aria-hidden': true }
    : { 'aria-label': label, role: 'img' };

  return (
    <span
      {...rest}
      {...accessibilityProps}
      className={styles}
      dangerouslySetInnerHTML={{ __html: LOGO_MARKUP[appearance] }}
      ref={ref}
    />
  );
}

/**
 * The dgbragas mark as inline SVG, in the three drawings the brand defines.
 * @example
 * <Logo />
 * @example
 * <Logo appearance="colored" decorative />
 */
export const Logo = forwardRef<LogoElement, LogoProps>(LogoBase);

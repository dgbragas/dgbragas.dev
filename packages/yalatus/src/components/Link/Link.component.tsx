import { forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import { EXTERNAL_LINK_REL } from '@dgbragas/yalatus/constants';

import { Icon } from '..';

import './Link.styles.scss';

import type { LinkElement, LinkProps } from './Link.types';

function LinkBase(
  {
    children,
    className,
    href,
    rel,
    target,
    disabled = false,
    trailingIcon = 'arrow-right',
    ...rest
  }: LinkProps,
  ref: ForwardedRef<LinkElement>
) {
  const styles = clsx('yl-link', disabled && 'yl-link--disabled', className);
  const safeRel = target === '_blank' && !rel ? EXTERNAL_LINK_REL : rel;

  // An anchor has no native disabled state, so it loses the href and announces the state through ARIA
  const conditionalProps = disabled
    ? { 'aria-disabled': true, role: 'link', tabIndex: -1 }
    : { href, rel: safeRel, target };

  return (
    <a {...rest} {...conditionalProps} className={styles} ref={ref}>
      <span className="yl-link__label">{children}</span>
      {trailingIcon && <Icon name={trailingIcon} size="small" />}
    </a>
  );
}

/**
 * Inline navigation link with the thin underline of the brand and an optional trailing icon.
 * @example
 * <Link href="/blog">Dê uma olhada no meu blog</Link>
 * @example
 * <Link href="https://github.com/dgbragas" target="_blank" trailingIcon="external-link">GitHub</Link>
 */
export const Link = forwardRef<LinkElement, LinkProps>(LinkBase);

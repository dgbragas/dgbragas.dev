import { forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import { EXTERNAL_LINK_REL } from '@dgbragas/yalatus/constants';

import { Icon, Stack } from '..';

import './IconButton.styles.scss';

import type { IconButtonElement, IconButtonProps } from './IconButton.types';

function IconButtonBase(
  {
    className,
    href,
    icon,
    label,
    rel,
    target,
    type,
    appearance = 'accent',
    as = 'button',
    disabled = false,
    kind = 'default',
    size = 'medium',
    ...rest
  }: IconButtonProps,
  ref: ForwardedRef<IconButtonElement>
) {
  const styles = clsx(
    'yl-icon-button',
    `yl-icon-button--${appearance}`,
    `yl-icon-button--${kind}`,
    `yl-icon-button--${size}`,
    disabled && 'yl-icon-button--disabled',
    className
  );

  const safeRel = as === 'a' && target === '_blank' && !rel ? EXTERNAL_LINK_REL : rel;

  // An anchor has no native disabled state, so it loses the href and announces the state through ARIA
  const conditionalProps =
    as === 'button'
      ? { disabled, type: type ?? 'button' }
      : {
          'aria-disabled': disabled || undefined,
          href: disabled ? undefined : href,
          rel: safeRel,
          target,
        };

  return (
    <Stack
      {...rest}
      {...conditionalProps}
      aria-label={label}
      as={as}
      center
      className={styles}
      ref={ref}
    >
      <Icon name={icon} size={size === 'large' ? 'large' : 'medium'} />
    </Stack>
  );
}

/**
 * Square button that shows only an icon; the required `label` gives it an accessible name.
 * @example
 * <IconButton icon="search" label="Buscar" />
 * @example
 * <IconButton as="a" href="/rss.xml" icon="rss" label="Feed RSS" kind="ghost" appearance="neutral" />
 */
export const IconButton = forwardRef<IconButtonElement, IconButtonProps>(IconButtonBase);

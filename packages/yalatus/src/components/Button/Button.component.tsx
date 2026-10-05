import { forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import { EXTERNAL_LINK_REL } from '@dgbragas/yalatus/constants';

import { Icon, Stack } from '..';

import './Button.styles.scss';

import type { ButtonElement, ButtonProps } from './Button.types';

function ButtonBase(
  {
    children,
    className,
    href,
    leadIcon,
    rel,
    target,
    trailingIcon,
    type,
    appearance = 'accent',
    as = 'button',
    disabled = false,
    kind = 'default',
    ...rest
  }: ButtonProps,
  ref: ForwardedRef<ButtonElement>
) {
  const styles = clsx(
    'yl-button',
    `yl-button--${appearance}`,
    `yl-button--${kind}`,
    disabled && 'yl-button--disabled',
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
      as={as}
      center
      className={styles}
      gap="space-8"
      orientation="horizontal"
      ref={ref}
    >
      {leadIcon && <Icon name={leadIcon} size="small" />}
      <span className="yl-button__label">{children}</span>
      {trailingIcon && <Icon name={trailingIcon} size="small" />}
    </Stack>
  );
}

/**
 * Primary control for actions and navigation, in three colour roles and a ghost variant.
 *
 * Rendered as an anchor it navigates like a link; disabled anchors drop the `href` and expose `aria-disabled`.
 * @example
 * <Button onClick={save}>Salvar</Button>
 * @example
 * <Button as="a" href="/portfolio" kind="ghost" trailingIcon="arrow-right">Veja meus cases</Button>
 * @example
 * <Button appearance="inverse" leadIcon="mail">Enviar e-mail</Button>
 */
export const Button = forwardRef<ButtonElement, ButtonProps>(ButtonBase);

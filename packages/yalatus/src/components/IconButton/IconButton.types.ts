import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

import type { IconName } from '..';

type IconButtonElement = HTMLButtonElement | HTMLAnchorElement;

type YalatusIconButton = Omit<BaseComponentProps, 'children'> & {
  /** Icon drawn inside the button. */
  icon: IconName;
  /** Accessible name announced in place of a visible label. */
  label: string;
  /**
   * Element rendered: a native button or an anchor for navigation.
   * @default 'button'
   */
  as?: 'button' | 'a';
  /**
   * Colour role of the button.
   * @default 'accent'
   */
  appearance?: 'accent' | 'neutral' | 'inverse';
  /**
   * Solid background or icon only.
   * @default 'default'
   */
  kind?: 'default' | 'ghost';
  /**
   * Square size: small 32px, medium 40px, large 48px.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Blocks pointer and keyboard interaction.
   * @default false
   */
  disabled?: boolean;
  /** Destination when rendered as an anchor. */
  href?: string;
  /** Browsing context when rendered as an anchor. */
  target?: string;
  /** Relationship with the destination when rendered as an anchor; `_blank` targets get the safe default. */
  rel?: string;
};

type IconButtonProps = MergeProps<
  YalatusIconButton,
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-disabled' | 'aria-label' | 'disabled'> &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'aria-disabled' | 'aria-label'>
>;

export type { IconButtonElement, IconButtonProps };

import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

import type { IconName } from '..';

type ButtonElement = HTMLButtonElement | HTMLAnchorElement;

type YalatusButton = BaseComponentProps & {
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
   * Solid background or text only.
   * @default 'default'
   */
  kind?: 'default' | 'ghost';
  /**
   * Blocks pointer and keyboard interaction.
   * @default false
   */
  disabled?: boolean;
  /** Icon drawn before the label. */
  leadIcon?: IconName;
  /** Icon drawn after the label. */
  trailingIcon?: IconName;
  /** Destination when rendered as an anchor. */
  href?: string;
  /** Browsing context when rendered as an anchor. */
  target?: string;
  /** Relationship with the destination when rendered as an anchor; `_blank` targets get the safe default. */
  rel?: string;
};

type ButtonProps = MergeProps<
  YalatusButton,
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-disabled' | 'disabled'> &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'aria-disabled'>
>;

export type { ButtonElement, ButtonProps };

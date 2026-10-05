import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

type ViewMoreElement = HTMLButtonElement | HTMLAnchorElement;

type YalatusViewMore = BaseComponentProps & {
  /**
   * Element rendered: a button that loads more in place or an anchor to the full archive.
   * @default 'button'
   */
  as?: 'button' | 'a';
  /** Destination when rendered as an anchor. */
  href?: string;
  /**
   * Blocks interaction, for instance while more items load.
   * @default false
   */
  disabled?: boolean;
};

type ViewMoreProps = MergeProps<
  YalatusViewMore,
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> &
    AnchorHTMLAttributes<HTMLAnchorElement>
>;

export type { ViewMoreElement, ViewMoreProps };

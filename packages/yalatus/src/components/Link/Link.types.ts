import type { AnchorHTMLAttributes } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

import type { IconName } from '..';

type LinkElement = HTMLAnchorElement;

type YalatusLink = BaseComponentProps & {
  /** Destination of the link. */
  href: string;
  /**
   * Icon drawn after the text; `false` removes it.
   * @default 'arrow-right'
   */
  trailingIcon?: IconName | false;
  /**
   * Removes the destination and interactivity while keeping the text visible.
   * @default false
   */
  disabled?: boolean;
  /** Browsing context of the destination. */
  target?: string;
  /** Relationship with the destination; `_blank` targets get the safe default. */
  rel?: string;
};

type LinkProps = MergeProps<YalatusLink, Omit<AnchorHTMLAttributes<LinkElement>, 'aria-disabled'>>;

export type { LinkElement, LinkProps };

import type { HTMLAttributes } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

type DividerElement = HTMLHRElement | HTMLDivElement;

type YalatusDivider = Omit<BaseComponentProps, 'children'> & {
  /**
   * Element rendered: `hr` between flow content, `div` inside flex rows where `hr` is not allowed.
   * @default 'hr'
   */
  as?: 'hr' | 'div';
  /**
   * Axis of the line.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Hides the divider from assistive technology when it only decorates the layout.
   * @default false
   */
  decorative?: boolean;
};

type DividerProps = MergeProps<YalatusDivider, HTMLAttributes<DividerElement>>;

export type { DividerElement, DividerProps };

import type { HTMLAttributes } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

type LogoElement = HTMLSpanElement;

type YalatusLogo = Omit<BaseComponentProps, 'children'> & {
  /**
   * Drawing of the mark: `clearspace` is the glyph alone taking the text colour, `filled` sits on its own plate, `colored` carries the brand gradient.
   * @default 'clearspace'
   */
  appearance?: 'clearspace' | 'filled' | 'colored';
  /**
   * Accessible name announced for the mark.
   * @default 'dgbragas'
   */
  label?: string;
  /**
   * Hides the mark from assistive technology when a text next to it already names the brand.
   * @default false
   */
  decorative?: boolean;
};

type LogoProps = MergeProps<YalatusLogo, HTMLAttributes<LogoElement>>;

export type { LogoElement, LogoProps };

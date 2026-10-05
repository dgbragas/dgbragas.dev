import type { HTMLAttributes } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

import type { ColorValue } from '..';
import type { IconName } from './Icon.names';

type IconElement = HTMLSpanElement;

type IconSize = 'smallest' | 'small' | 'medium' | 'large';

type YalatusIcon = Omit<BaseComponentProps, 'children'> & {
  /** Icon to draw, by file name in the Yalatus icon set. */
  name: IconName;
  /**
   * Rendered size: smallest 16px, small 20px, medium 24px, large 32px.
   * @default 'medium'
   */
  size?: IconSize;
  /**
   * Colour token; `inherit` takes the text colour of the parent.
   * @default 'inherit'
   */
  color?: ColorValue | 'inherit';
  /** Accessible name announced by assistive technology; without it the icon is decorative and hidden. */
  label?: string;
};

type IconProps = MergeProps<YalatusIcon, HTMLAttributes<IconElement>>;

export type { IconElement, IconProps, IconSize };

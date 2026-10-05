import type { HTMLAttributes } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

import type { ColorValue, IconName } from '..';

/** One entry of the marquee. */
type MarqueeItem = {
  /** Icon drawn inside the coloured plate. */
  icon: IconName;
  /** Text next to the plate. */
  label: string;
  /**
   * Background token of the plate.
   * @default 'surface-accent-subtle'
   */
  color?: ColorValue;
};

type MarqueeElement = HTMLDivElement;

type YalatusMarquee = Omit<BaseComponentProps, 'children'> & {
  /** Entries that scroll across the band. */
  items: MarqueeItem[];
  /**
   * Accessible name of the band.
   * @default 'Tecnologias e temas'
   */
  label?: string;
};

type MarqueeProps = MergeProps<YalatusMarquee, HTMLAttributes<MarqueeElement>>;

export type { MarqueeElement, MarqueeItem, MarqueeProps };

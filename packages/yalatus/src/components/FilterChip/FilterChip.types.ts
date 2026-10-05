import type { ButtonHTMLAttributes } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

import type { IconName } from '..';

type FilterChipElement = HTMLButtonElement;

type YalatusFilterChip = BaseComponentProps & {
  /**
   * Marks the filter as applied.
   * @default false
   */
  active?: boolean;
  /**
   * Blocks pointer and keyboard interaction.
   * @default false
   */
  disabled?: boolean;
  /** Icon drawn before the label while the filter is not active; the active state always shows a check. */
  leadIcon?: IconName;
};

type FilterChipProps = MergeProps<
  YalatusFilterChip,
  Omit<ButtonHTMLAttributes<FilterChipElement>, 'aria-pressed' | 'disabled'>
>;

export type { FilterChipElement, FilterChipProps };

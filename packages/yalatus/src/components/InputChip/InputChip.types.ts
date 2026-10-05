import type { HTMLAttributes } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

import type { IconName } from '..';

type InputChipElement = HTMLSpanElement;

type YalatusInputChip = BaseComponentProps & {
  /** Text of the chip, also used to name the remove control. */
  label: string;
  /** Icon drawn before the label. */
  leadIcon?: IconName;
  /**
   * Blocks the remove control.
   * @default false
   */
  disabled?: boolean;
  /**
   * Verb announced before the label on the remove control.
   * @default 'Remover'
   */
  removeLabel?: string;
  /** Called when the remove control is activated, with the chip label. */
  onRemove?: (label: string) => void;
};

type InputChipProps = MergeProps<
  YalatusInputChip,
  Omit<HTMLAttributes<InputChipElement>, 'children'>
>;

export type { InputChipElement, InputChipProps };

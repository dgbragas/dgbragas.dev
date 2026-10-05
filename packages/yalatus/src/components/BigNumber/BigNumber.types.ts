import type { HTMLAttributes } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

type BigNumberElement = HTMLDivElement;

type YalatusBigNumber = Omit<BaseComponentProps, 'children'> & {
  /** Number the counter animates to. */
  value: number;
  /** What the number measures, shown under it. */
  label: string;
  /** Text drawn before the number, such as `+` or `R$`. */
  prefix?: string;
  /** Text drawn after the number, such as `%` or `M`. */
  suffix?: string;
  /**
   * Decimal places kept while formatting.
   * @default 0
   */
  decimals?: number;
  /**
   * BCP 47 locale used to format the number.
   * @default 'pt-BR'
   */
  locale?: string;
};

type BigNumberProps = MergeProps<YalatusBigNumber, HTMLAttributes<BigNumberElement>>;

export type { BigNumberElement, BigNumberProps };

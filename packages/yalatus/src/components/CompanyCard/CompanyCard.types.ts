import type { HTMLAttributes, ReactNode } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

import type { ColorValue } from '..';

type CompanyCardElement = HTMLLIElement;

type YalatusCompanyCard = Omit<BaseComponentProps, 'children'> & {
  /** Name of the company. */
  name: string;
  /** Position held there. */
  position: string;
  /** Period of the position as people read it, such as `Agosto 2025 → Atualmente`. */
  period: string;
  /** Logo of the company, drawn inside the plate. */
  logo: ReactNode;
  /**
   * Background of the plate; brand colours that are not tokens are accepted as CSS values.
   * @default 'surface-accent-subtle'
   */
  color?: ColorValue;
};

type CompanyCardProps = MergeProps<YalatusCompanyCard, HTMLAttributes<CompanyCardElement>>;

export type { CompanyCardElement, CompanyCardProps };

import type { AnchorHTMLAttributes, ReactNode } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

type PortfolioCardElement = HTMLAnchorElement;

type YalatusPortfolioCard = Omit<BaseComponentProps, 'children'> & {
  /** Destination of the project. */
  href: string;
  /** Title of the project. */
  title: string;
  /** Short description shown under the title. */
  description: string;
  /** Category shown as a tag above the title. */
  tag: string;
  /** Cover image of the project. */
  cover: ReactNode;
  /** Publication date as people read it; omitted when absent. */
  date?: string;
  /** Machine-readable date for the `time` element. */
  dateTime?: string;
};

type PortfolioCardProps = MergeProps<
  YalatusPortfolioCard,
  AnchorHTMLAttributes<PortfolioCardElement>
>;

export type { PortfolioCardElement, PortfolioCardProps };

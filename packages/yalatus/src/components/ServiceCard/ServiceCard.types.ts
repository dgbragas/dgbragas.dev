import type { HTMLAttributes } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

type ServiceCardElement = HTMLElement;

type YalatusServiceCard = Omit<BaseComponentProps, 'children'> & {
  /** Name of the service, in the heading plate. */
  title: string;
  /** What the service delivers. */
  description: string;
  /** Supporting line at the bottom of the card. */
  detail: string;
};

type ServiceCardProps = MergeProps<YalatusServiceCard, HTMLAttributes<ServiceCardElement>>;

export type { ServiceCardElement, ServiceCardProps };

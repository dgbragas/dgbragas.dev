import { forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import { Stack, Text } from '..';

import './ServiceCard.styles.scss';

import type { ServiceCardElement, ServiceCardProps } from './ServiceCard.types';

function ServiceCardBase(
  { className, description, detail, title, ...rest }: ServiceCardProps,
  ref: ForwardedRef<ServiceCardElement>
) {
  const styles = clsx('yl-service-card', className);

  return (
    <Stack {...rest} as="article" className={styles} ref={ref}>
      <Stack className="yl-service-card__heading" px="space-32" py="space-24">
        <Text element="h3" kind="heading-3">
          {title}
        </Text>
      </Stack>
      <Stack
        className="yl-service-card__content"
        gap="space-112"
        justifyContent="space-between"
        p="space-32"
      >
        <Text>{description}</Text>
        <Text className="yl-service-card__detail" kind="label">
          {detail}
        </Text>
      </Stack>
    </Stack>
  );
}

/**
 * Card of the workflow grid that names a service on an inverted plate and describes it below; on hover the two blocks join into one.
 * @example
 * <ServiceCard title="Design" description="Qualidade code-ready na construção das UIs" detail="Tokens organizados, componentes adaptativos e estrutura MCP-ready" />
 */
export const ServiceCard = forwardRef<ServiceCardElement, ServiceCardProps>(ServiceCardBase);

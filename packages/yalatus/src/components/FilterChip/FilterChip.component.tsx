import { forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import { Icon, Stack } from '..';

import './FilterChip.styles.scss';

import type { FilterChipElement, FilterChipProps } from './FilterChip.types';

function FilterChipBase(
  {
    children,
    className,
    leadIcon,
    type,
    active = false,
    disabled = false,
    ...rest
  }: FilterChipProps,
  ref: ForwardedRef<FilterChipElement>
) {
  const styles = clsx(
    'yl-filter-chip',
    active && 'yl-filter-chip--active',
    disabled && 'yl-filter-chip--disabled',
    className
  );
  const icon = active ? 'check' : leadIcon;

  return (
    <Stack
      {...rest}
      aria-pressed={active}
      as="button"
      center
      className={styles}
      disabled={disabled}
      gap="space-4"
      orientation="horizontal"
      ref={ref}
      type={type ?? 'button'}
    >
      {icon && <Icon name={icon} size="smallest" />}
      <span className="yl-filter-chip__label">{children}</span>
    </Stack>
  );
}

/**
 * Toggle that applies or removes a filter on a list; the pressed state is announced through `aria-pressed`.
 * @example
 * <FilterChip active={filter === 'cases'} onClick={() => setFilter('cases')}>Cases</FilterChip>
 * @example
 * <FilterChip leadIcon="filter">Todos</FilterChip>
 */
export const FilterChip = forwardRef<FilterChipElement, FilterChipProps>(FilterChipBase);

import { forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import { Icon, Stack } from '..';

import './InputChip.styles.scss';

import type { InputChipElement, InputChipProps } from './InputChip.types';

function InputChipBase(
  {
    className,
    label,
    leadIcon,
    onRemove,
    disabled = false,
    removeLabel = 'Remover',
    ...rest
  }: InputChipProps,
  ref: ForwardedRef<InputChipElement>
) {
  const styles = clsx('yl-input-chip', disabled && 'yl-input-chip--disabled', className);

  const handleRemove = () => onRemove?.(label);

  return (
    <Stack
      {...rest}
      alignItems="center"
      as="span"
      className={styles}
      gap="space-4"
      orientation="horizontal"
      ref={ref}
    >
      {leadIcon && <Icon name={leadIcon} size="smallest" />}
      <span className="yl-input-chip__label">{label}</span>
      <button
        aria-label={`${removeLabel} ${label}`}
        className="yl-input-chip__remove"
        disabled={disabled}
        onClick={handleRemove}
        type="button"
      >
        <Icon name="close" size="smallest" />
      </button>
    </Stack>
  );
}

/**
 * Chip that represents a value the person entered, with a control to remove it.
 * @example
 * <InputChip label="React" onRemove={removeTag} />
 * @example
 * <InputChip label="Design System" leadIcon="design-system" removeLabel="Remove" />
 */
export const InputChip = forwardRef<InputChipElement, InputChipProps>(InputChipBase);

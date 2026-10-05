import { forwardRef, type ForwardedRef } from 'react';

import { Box } from '..';

import type { StackElement, StackProps } from './Stack.types';

function StackBase(
  { alignItems, justifyContent, center = false, orientation = 'vertical', ...props }: StackProps,
  ref: ForwardedRef<StackElement>
) {
  return (
    <Box
      {...props}
      ref={ref}
      alignItems={center ? 'center' : alignItems}
      display="flex"
      flexDirection={orientation === 'horizontal' ? 'row' : 'column'}
      justifyContent={center ? 'center' : justifyContent}
    />
  );
}

/**
 * Flex container that stacks children on one axis with a token gap; use it instead of writing flex rules in component SCSS.
 * @example
 * <Stack gap="space-16">
 *   <Text kind="heading-3">Title</Text>
 *   <Text>Body</Text>
 * </Stack>
 * @example
 * <Stack orientation="horizontal" gap="space-8" alignItems="center">
 *   <Icon name="check" />
 *   <Text kind="label">Done</Text>
 * </Stack>
 */
export const Stack = forwardRef<StackElement, StackProps>(StackBase);

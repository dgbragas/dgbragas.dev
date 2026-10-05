import { forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import { Stack, Text } from '..';

import './Blockquote.styles.scss';

import type { BlockquoteElement, BlockquoteProps } from './Blockquote.types';

function BlockquoteBase(
  { author, children, cite, className, ...rest }: BlockquoteProps,
  ref: ForwardedRef<BlockquoteElement>
) {
  const styles = clsx('yl-blockquote', className);

  return (
    <Stack
      {...rest}
      as="blockquote"
      cite={cite}
      className={styles}
      gap="space-16"
      py="space-8"
      ref={ref}
    >
      <Text className="yl-blockquote__quote" kind="body-lg" color="fg-subtle">
        {children}
      </Text>
      {author && (
        <Text className="yl-blockquote__author" element="footer" kind="label" color="fg-subtle">
          {author}
        </Text>
      )}
    </Stack>
  );
}

/**
 * Quotation set apart from the text with the brand rule on its left and an optional author line.
 * @example
 * <Blockquote author="Guilherme Camillo">Nessa etapa, buscamos entender…</Blockquote>
 */
export const Blockquote = forwardRef<BlockquoteElement, BlockquoteProps>(BlockquoteBase);

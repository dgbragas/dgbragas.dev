import type { BlockquoteHTMLAttributes } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

type BlockquoteElement = HTMLQuoteElement;

type YalatusBlockquote = BaseComponentProps & {
  /** Who said it, shown under the quote. */
  author?: string;
  /** Source of the quote, read by assistive technology through `cite`. */
  cite?: string;
};

type BlockquoteProps = MergeProps<YalatusBlockquote, BlockquoteHTMLAttributes<BlockquoteElement>>;

export type { BlockquoteElement, BlockquoteProps };

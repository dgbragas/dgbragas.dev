import type { HTMLAttributes } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';
import type { TextKey } from '@dgbragas/yalatus/tokens/names';

import type { ColorValue } from '..';

type TextElement = HTMLElement;

type TextTag =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'small'
  | 'strong'
  | 'em'
  | 'code'
  | 'time'
  | 'label'
  | 'blockquote'
  | 'figcaption'
  | 'footer'
  | 'div';

type YalatusText = BaseComponentProps & {
  /**
   * Typographic style from the Yalatus type scale.
   * @default 'body'
   */
  kind?: TextKey;
  /**
   * HTML element rendered; defaults to the semantic element of the chosen kind.
   */
  element?: TextTag;
  /**
   * Text colour token; `inherit` keeps the parent colour.
   * @default 'inherit'
   */
  color?: ColorValue | 'inherit';
  /** Horizontal alignment of the text. */
  align?: 'start' | 'center' | 'end';
  /**
   * Prevents wrapping and clips the overflow with an ellipsis.
   * @default false
   */
  truncate?: boolean;
  /** Input the label describes, when rendered as `label`. */
  htmlFor?: string;
  /** Machine-readable value, when rendered as `time`. */
  dateTime?: string;
};

type TextProps = MergeProps<YalatusText, HTMLAttributes<TextElement>>;

export type { TextElement, TextProps, TextTag };

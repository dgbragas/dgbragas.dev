import type { HTMLAttributes, ReactNode } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

type CursorHintElement = HTMLSpanElement;

type CursorHintText = {
  /** Hint that shows a short line of text. */
  kind?: 'text';
  /** Text shown next to the pointer. */
  content: string;
};

type CursorHintImage = {
  /** Hint that shows an image. */
  kind: 'image';
  /** Source of the image shown next to the pointer. */
  src: string;
  /** Description of the image, read by assistive technology in place of the picture. */
  alt: string;
};

type YalatusCursorHint = BaseComponentProps &
  (CursorHintText | CursorHintImage) & {
    /** Element the hint belongs to. */
    children: ReactNode;
    /**
     * Puts the wrapper in the tab order so keyboard users reach the hint; turn off when the child is already focusable.
     * @default true
     */
    focusable?: boolean;
  };

type CursorHintProps = MergeProps<
  YalatusCursorHint,
  Omit<HTMLAttributes<CursorHintElement>, 'content'>
>;

export type { CursorHintElement, CursorHintProps };

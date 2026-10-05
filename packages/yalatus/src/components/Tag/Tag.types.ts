import type { HTMLAttributes } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

type TagElement = HTMLSpanElement;

type YalatusTag = BaseComponentProps & {
  /**
   * Colour role of the tag.
   * @default 'brand'
   */
  appearance?: 'brand' | 'neutral' | 'danger' | 'warning' | 'success' | 'informative' | 'inverse';
  /**
   * Outlined or filled background.
   * @default 'outline'
   */
  kind?: 'outline' | 'filled';
};

type TagProps = MergeProps<YalatusTag, HTMLAttributes<TagElement>>;

export type { TagElement, TagProps };

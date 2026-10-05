import type { TextKey } from '@dgbragas/yalatus/tokens/names';

import type { TextTag } from './Text.types';

/** Semantic element each kind renders when `element` is not given. */
export const TEXT_DEFAULT_ELEMENT: Record<TextKey, TextTag> = {
  display: 'h1',
  title: 'h1',
  'heading-1': 'h2',
  'heading-2': 'h3',
  'heading-3': 'h4',
  'heading-4': 'h5',
  'heading-5': 'h6',
  prose: 'p',
  'body-lg': 'p',
  body: 'p',
  'label-uppercase': 'span',
  label: 'span',
  caption: 'small',
  'numeral-lg': 'span',
  numeral: 'span',
  value: 'code',
  code: 'code',
};

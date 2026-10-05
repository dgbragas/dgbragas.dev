import { sanitizeSvg, stripSvgSize } from '@dgbragas/yalatus/helpers';

import clearspace from '../../assets/brand/logo-clearspace.svg?raw';
import colored from '../../assets/brand/logo-colored.svg?raw';
import filled from '../../assets/brand/logo-filled.svg?raw';

/** Inline markup per appearance; only the clearspace glyph inherits the text colour. */
export const LOGO_MARKUP = {
  clearspace: sanitizeSvg(clearspace),
  colored: stripSvgSize(colored),
  filled: stripSvgSize(filled),
} as const;

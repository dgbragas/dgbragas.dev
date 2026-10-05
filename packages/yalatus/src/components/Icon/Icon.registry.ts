import { sanitizeSvg } from '@dgbragas/yalatus/helpers';

import type { IconName } from './Icon.names';

const files = import.meta.glob<string>('../../assets/icons/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/** Inline markup of every icon, keyed by name and already sanitised. */
export const ICONS: Record<IconName, string> = Object.fromEntries(
  Object.entries(files).map(([path, svg]) => [
    path.replace(/^.*\/([^/]+)\.svg$/, '$1'),
    sanitizeSvg(svg),
  ])
) as Record<IconName, string>;

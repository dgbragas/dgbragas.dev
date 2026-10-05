import type { TabItem } from './Tabs.types';

const KEY_STEP: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };

/**
 * Finds the tab that keyboard navigation moves to, skipping disabled tabs and wrapping around the ends.
 * @param items - Tabs in display order
 * @param currentId - Id of the tab that has focus
 * @param key - Key pressed: ArrowLeft, ArrowRight, Home or End
 * @returns The id of the next tab, or `undefined` when the key does not navigate or no tab is enabled
 * @example
 * nextTabId(items, 'cases', 'ArrowRight') // 'landings'
 */
export function nextTabId(items: TabItem[], currentId: string, key: string): string | undefined {
  const enabled = items.filter(item => !item.disabled);
  if (enabled.length === 0) return undefined;
  if (key === 'Home') return enabled[0]?.id;
  if (key === 'End') return enabled[enabled.length - 1]?.id;

  const step = KEY_STEP[key];
  if (step === undefined) return undefined;

  const index = enabled.findIndex(item => item.id === currentId);
  return enabled[(index + step + enabled.length) % enabled.length]?.id;
}

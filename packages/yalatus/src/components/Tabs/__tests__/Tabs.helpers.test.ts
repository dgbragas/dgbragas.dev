import { describe, expect, it } from 'vitest';

import { nextTabId } from '../Tabs.helpers';

import type { TabItem } from '../Tabs.types';

const items: TabItem[] = [
  { id: 'all', label: 'Todos' },
  { id: 'cases', label: 'Cases', disabled: true },
  { id: 'landings', label: 'Landings' },
  { id: 'portfolios', label: 'Portfólios' },
];

describe('Tabs.helpers.ts', () => {
  describe('nextTabId()', () => {
    describe('when moving with the arrows', () => {
      it('should skip disabled tabs and wrap at both ends', () => {
        expect(nextTabId(items, 'all', 'ArrowRight')).toBe('landings');
        expect(nextTabId(items, 'portfolios', 'ArrowRight')).toBe('all');
        expect(nextTabId(items, 'all', 'ArrowLeft')).toBe('portfolios');
      });
    });

    describe('when pressing Home or End', () => {
      it('should jump to the first and last enabled tabs', () => {
        expect(nextTabId(items, 'landings', 'Home')).toBe('all');
        expect(nextTabId(items, 'all', 'End')).toBe('portfolios');
      });
    });

    describe('when the key does not navigate', () => {
      it('should return undefined', () => {
        expect(nextTabId(items, 'all', 'Enter')).toBeUndefined();
      });
    });

    describe('when no tab is enabled', () => {
      it('should return undefined', () => {
        expect(
          nextTabId([{ id: 'x', label: 'X', disabled: true }], 'x', 'ArrowRight')
        ).toBeUndefined();
      });
    });
  });
});

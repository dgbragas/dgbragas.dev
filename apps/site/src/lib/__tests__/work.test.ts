import { describe, expect, it } from 'vitest';

import { byNewest, countWork, filterWork } from '../work';

const items = [
  { kind: 'landing' as const, dateTime: '2025-05-07' },
  { kind: 'portfolio' as const, dateTime: '2026-01-10' },
  { kind: 'landing' as const, dateTime: '2024-12-01' },
];

describe('work.ts', () => {
  describe('filterWork()', () => {
    it('should keep everything for all and only the kind otherwise', () => {
      expect(filterWork(items, 'all')).toHaveLength(3);
      expect(filterWork(items, 'landing')).toHaveLength(2);
      expect(filterWork(items, 'cases')).toHaveLength(0);
    });
  });

  describe('countWork()', () => {
    it('should count each kind and the total', () => {
      expect(countWork(items)).toEqual({ all: 3, cases: 0, landing: 2, portfolio: 1 });
    });
  });

  describe('byNewest()', () => {
    it('should put the newest date first', () => {
      expect([...items].sort(byNewest).map(item => item.dateTime)).toEqual([
        '2026-01-10',
        '2025-05-07',
        '2024-12-01',
      ]);
    });
  });
});

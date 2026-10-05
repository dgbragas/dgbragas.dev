import { describe, expect, it } from 'vitest';

import { formatDate } from '../dates';

describe('dates.ts', () => {
  describe('formatDate()', () => {
    it('should format in Portuguese without the connecting words', () => {
      expect(formatDate(new Date('2026-07-27'), 'pt-BR')).toBe('27 jul 2026');
    });

    it('should format in English with the short month', () => {
      expect(formatDate(new Date('2025-03-30'), 'en')).toBe('Mar 30, 2025');
    });
  });
});

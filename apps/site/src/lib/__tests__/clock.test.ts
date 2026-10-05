import { describe, expect, it } from 'vitest';

import { formatLocalTime } from '../clock';

describe('clock.ts', () => {
  describe('formatLocalTime()', () => {
    const noon = new Date('2026-08-08T12:00:00Z');

    it('should write the São Paulo time in Portuguese', () => {
      expect(formatLocalTime(noon, 'pt-BR')).toBe('[ 8 de agosto / 09:00 BRT / São Paulo ]');
    });

    it('should write the São Paulo time in English', () => {
      expect(formatLocalTime(noon, 'en')).toBe('[ August 8 / 09:00 BRT / São Paulo ]');
    });
  });
});

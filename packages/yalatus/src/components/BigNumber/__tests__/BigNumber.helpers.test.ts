import { describe, expect, it } from 'vitest';

import { formatNumber } from '../BigNumber.helpers';

describe('BigNumber.helpers.ts', () => {
  describe('formatNumber()', () => {
    describe('when formatting integers', () => {
      it('should group thousands with the locale separator', () => {
        expect(formatNumber(4000000, 0, 'pt-BR')).toBe('4.000.000');
        expect(formatNumber(4000000, 0, 'en-US')).toBe('4,000,000');
      });
    });

    describe('when formatting decimals', () => {
      it('should keep exactly the requested places', () => {
        expect(formatNumber(1234.5, 1, 'pt-BR')).toBe('1.234,5');
        expect(formatNumber(7, 2, 'en-US')).toBe('7.00');
      });
    });
  });
});

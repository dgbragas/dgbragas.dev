import { describe, expect, it } from 'vitest';

import { isResponsive, resolveColor, resolveRadius, resolveSpace } from '../Box.resolvers';

describe('Box.resolvers.ts', () => {
  describe('isResponsive()', () => {
    describe('when value is an object', () => {
      it('should return true', () => {
        expect(isResponsive({ base: 'space-8' })).toBe(true);
      });
    });

    describe('when value is a scalar', () => {
      it('should return false for strings, numbers and null', () => {
        expect(isResponsive('space-8')).toBe(false);
        expect(isResponsive(8)).toBe(false);
        expect(isResponsive(null)).toBe(false);
      });
    });
  });

  describe('resolveSpace()', () => {
    describe('when value is undefined', () => {
      it('should return undefined', () => {
        expect(resolveSpace(undefined)).toBeUndefined();
      });
    });

    describe('when value is a number', () => {
      it('should append px', () => {
        expect(resolveSpace(12)).toBe('12px');
      });
    });

    describe('when value is a token', () => {
      it('should return the CSS variable', () => {
        expect(resolveSpace('space-16')).toBe('var(--yl-space-16)');
      });
    });

    describe('when value is arbitrary CSS', () => {
      it('should return it unchanged', () => {
        expect(resolveSpace('50%')).toBe('50%');
      });
    });
  });

  describe('resolveColor()', () => {
    describe('when value is undefined', () => {
      it('should return undefined', () => {
        expect(resolveColor(undefined)).toBeUndefined();
      });
    });

    describe('when value is a token', () => {
      it('should return the CSS variable', () => {
        expect(resolveColor('fg-default')).toBe('var(--yl-color-fg-default)');
      });
    });

    describe('when value is arbitrary CSS', () => {
      it('should return it unchanged', () => {
        expect(resolveColor('transparent')).toBe('transparent');
      });
    });
  });

  describe('resolveRadius()', () => {
    describe('when value is undefined', () => {
      it('should return undefined', () => {
        expect(resolveRadius(undefined)).toBeUndefined();
      });
    });

    describe('when value is a number', () => {
      it('should append px', () => {
        expect(resolveRadius(8)).toBe('8px');
      });
    });

    describe('when value is a token', () => {
      it('should return the CSS variable', () => {
        expect(resolveRadius('radius-4')).toBe('var(--yl-radius-4)');
      });
    });

    describe('when value is arbitrary CSS', () => {
      it('should return it unchanged', () => {
        expect(resolveRadius('50%')).toBe('50%');
      });
    });
  });
});

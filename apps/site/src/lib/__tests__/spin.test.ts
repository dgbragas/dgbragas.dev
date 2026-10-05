import { describe, expect, it } from 'vitest';

import { applyStep, INITIAL_SPIN, nextStep } from '../spin';

describe('spin.ts', () => {
  describe('nextStep()', () => {
    it('should pick from every axis and quarter turn on the first draw', () => {
      expect(nextStep(undefined, () => 0)).toEqual({ axis: 'x', turns: 1 });
      expect(nextStep(undefined, () => 0.999)).toEqual({ axis: 'z', turns: 4 });
    });

    it('should never repeat the previous step', () => {
      const previous = { axis: 'x' as const, turns: 1 };
      expect(nextStep(previous, () => 0)).toEqual({ axis: 'x', turns: 2 });
    });

    it('should use Math.random by default', () => {
      const step = nextStep(undefined);
      expect(['x', 'y', 'z']).toContain(step.axis);
      expect([1, 2, 3, 4]).toContain(step.turns);
    });
  });

  describe('applyStep()', () => {
    it('should accumulate quarter turns on the chosen axis only', () => {
      const once = applyStep(INITIAL_SPIN, { axis: 'y', turns: 3 });
      expect(once).toEqual({ x: 0, y: 270, z: 0 });
      expect(applyStep(once, { axis: 'y', turns: 1 })).toEqual({ x: 0, y: 360, z: 0 });
    });
  });
});

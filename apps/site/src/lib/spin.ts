export type SpinAxis = 'x' | 'y' | 'z';

/** Accumulated rotation of the shapes, in degrees per axis. */
export type Spin = Record<SpinAxis, number>;

export type SpinStep = { axis: SpinAxis; turns: number };

const AXES: SpinAxis[] = ['x', 'y', 'z'];
const TURNS = [1, 2, 3, 4];

export const INITIAL_SPIN: Spin = { x: 0, y: 0, z: 0 };

/**
 * Draws the next step of the easter egg: an axis and a number of quarter turns, never the same pair twice in a row.
 * @param previous - Step drawn before, or undefined on the first click
 * @param random - Source of numbers in `[0, 1)`, injectable for tests
 * @returns The step to apply
 */
export function nextStep(
  previous: SpinStep | undefined,
  random: () => number = Math.random
): SpinStep {
  const options = AXES.flatMap(axis => TURNS.map(turns => ({ axis, turns }))).filter(
    option => option.axis !== previous?.axis || option.turns !== previous.turns
  );
  return options[Math.floor(random() * options.length)] as SpinStep;
}

/**
 * Adds a step to the accumulated rotation.
 * @param spin - Rotation so far
 * @param step - Step to add
 * @returns A new rotation with the axis advanced by `turns` quarter turns
 */
export function applyStep(spin: Spin, step: SpinStep): Spin {
  return { ...spin, [step.axis]: spin[step.axis] + step.turns * 90 };
}

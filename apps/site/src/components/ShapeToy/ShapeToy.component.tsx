import { useId, useState, type CSSProperties } from 'react';

import { Text } from '@dgbragas/yalatus';

import { applyStep, INITIAL_SPIN, nextStep, type Spin, type SpinStep } from '@/lib/spin';

import './ShapeToy.styles.scss';

export type ShapeToyProps = {
  /** Visible text under the shapes, used as the accessible name. */
  label: string;
  /** What a click does, read after the name. */
  hint: string;
  /** Inline SVG of the shapes, already marked as decorative. */
  children: React.ReactNode;
};

/**
 * Easter egg of the portfolio section: each click spins the shapes a random number of quarter turns around a random axis.
 */
export function ShapeToy({ children, hint, label }: ShapeToyProps) {
  const hintId = useId();
  const [spin, setSpin] = useState<Spin>(INITIAL_SPIN);
  const [last, setLast] = useState<SpinStep | undefined>(undefined);

  const handleClick = () => {
    const step = nextStep(last);
    setLast(step);
    setSpin(current => applyStep(current, step));
  };

  const style = {
    '--site-spin-x': `${spin.x}deg`,
    '--site-spin-y': `${spin.y}deg`,
    '--site-spin-z': `${spin.z}deg`,
  } as CSSProperties;

  return (
    <button
      aria-describedby={hintId}
      className="site-shape-toy"
      onClick={handleClick}
      type="button"
    >
      <span aria-hidden className="site-shape-toy__shapes" style={style}>
        {children}
      </span>
      <Text
        className="site-shape-toy__label"
        color="fg-subtle"
        element="span"
        kind="label-uppercase"
      >
        {label}
      </Text>
      <span className="yl-sr-only" id={hintId}>
        {hint}
      </span>
    </button>
  );
}

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ForwardedRef,
  type PointerEvent,
} from 'react';

import { clsx } from 'clsx';

import { CURSOR_HINT_OFFSET } from './CursorHint.constants';

import './CursorHint.styles.scss';

import type { CursorHintElement, CursorHintProps } from './CursorHint.types';

function CursorHintBase(
  { children, className, focusable = true, ...props }: CursorHintProps,
  ref: ForwardedRef<CursorHintElement>
) {
  const hintId = useId();
  const hintRef = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const [mode, setMode] = useState<'closed' | 'pointer' | 'anchored'>('closed');

  const { kind, ...rest } = props;
  const hintProps =
    kind === 'image' ? { alt: props.alt, src: props.src } : { content: props.content };
  const {
    alt: _alt,
    content: _content,
    src: _src,
    ...htmlProps
  } = rest as typeof rest & {
    alt?: string;
    content?: string;
    src?: string;
  };

  const styles = clsx('yl-cursor-hint', `yl-cursor-hint--${mode}`, className);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const follow = (event: PointerEvent<HTMLSpanElement>) => {
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      hintRef.current?.style.setProperty('--yl-hint-x', `${clientX + CURSOR_HINT_OFFSET}px`);
      hintRef.current?.style.setProperty('--yl-hint-y', `${clientY + CURSOR_HINT_OFFSET}px`);
    });
  };

  const handlePointerEnter = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType === 'touch') return;
    setMode('pointer');
    follow(event);
  };

  const handlePointerLeave = () => setMode('closed');
  const handleFocus = () => setMode('anchored');
  const handleBlur = () => setMode('closed');

  const accessibilityProps = focusable ? { 'aria-describedby': hintId, tabIndex: 0 } : {};

  return (
    <span
      {...htmlProps}
      {...accessibilityProps}
      className={styles}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={follow}
      ref={ref}
    >
      {children}
      <span className="yl-cursor-hint__bubble" id={hintId} ref={hintRef} role="tooltip">
        {kind === 'image' ? (
          <img
            alt={hintProps.alt}
            className="yl-cursor-hint__image"
            decoding="async"
            loading="lazy"
            src={hintProps.src}
          />
        ) : (
          <span className="yl-cursor-hint__text">{hintProps.content}</span>
        )}
      </span>
    </span>
  );
}

/**
 * Extra information that follows the pointer while it hovers an element; keyboard focus anchors it below the element instead.
 *
 * The hint is a tooltip linked through `aria-describedby`, so its text, or the image description, is read by assistive technology.
 * @example
 * <CursorHint content="Desenvolvedor & Designer de Interfaces de São Paulo — Grande ABC"><img src={me} alt="o dg do ds" /></CursorHint>
 * @example
 * <CursorHint kind="image" src={horizon} alt="Captura do jogo Horizon">Horizon</CursorHint>
 */
export const CursorHint = forwardRef<CursorHintElement, CursorHintProps>(CursorHintBase);

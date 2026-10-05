import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { CursorHint } from '..';

describe('CursorHint.component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame'] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be defined (no circular dependency)', () => {
    expect(CursorHint).toBeDefined();
  });

  describe('when render', () => {
    it('should wrap the child in a focusable span described by a closed tooltip', () => {
      render(
        <CursorHint content="Desenvolvedor & Designer" data-testid="hint">
          o dg do ds
        </CursorHint>
      );

      const wrapper = screen.getByTestId('hint');
      const tooltip = screen.getByRole('tooltip');
      expect(wrapper).toHaveClass('yl-cursor-hint', 'yl-cursor-hint--closed');
      expect(wrapper).toHaveAttribute('tabindex', '0');
      expect(wrapper).toHaveAttribute('aria-describedby', tooltip.id);
      expect(tooltip).toHaveTextContent('Desenvolvedor & Designer');
      expect(wrapper).toHaveTextContent('o dg do ds');
    });
  });

  describe('when receive props', () => {
    describe('kind prop', () => {
      it('should render an image hint with its alternative text', () => {
        render(
          <CursorHint kind="image" src="/horizon.jpg" alt="Captura do jogo Horizon">
            Horizon
          </CursorHint>
        );

        const image = screen.getByRole('img', { name: 'Captura do jogo Horizon' });
        expect(image).toHaveAttribute('src', '/horizon.jpg');
        expect(image).toHaveAttribute('loading', 'lazy');
      });
    });

    describe('focusable prop', () => {
      it('should leave the wrapper out of the tab order when false', () => {
        render(
          <CursorHint content="Dica" data-testid="hint" focusable={false}>
            <a href="/x">Link</a>
          </CursorHint>
        );

        const wrapper = screen.getByTestId('hint');
        expect(wrapper).not.toHaveAttribute('tabindex');
        expect(wrapper).not.toHaveAttribute('aria-describedby');
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(
          <CursorHint content="Dica" data-testid="hint" className="custom">
            x
          </CursorHint>
        );

        expect(screen.getByTestId('hint')).toHaveClass('yl-cursor-hint', 'custom');
      });
    });
  });

  describe('when handling actions', () => {
    it('should follow the pointer with an offset and close on leave', () => {
      render(
        <CursorHint content="Dica" data-testid="hint">
          x
        </CursorHint>
      );
      const wrapper = screen.getByTestId('hint');
      const tooltip = screen.getByRole('tooltip');

      fireEvent.pointerEnter(wrapper, { clientX: 100, clientY: 50, pointerType: 'mouse' });
      act(() => {
        vi.advanceTimersToNextFrame();
      });

      expect(wrapper).toHaveClass('yl-cursor-hint--pointer');
      expect(tooltip.style.getPropertyValue('--yl-hint-x')).toBe('108px');
      expect(tooltip.style.getPropertyValue('--yl-hint-y')).toBe('58px');

      fireEvent.pointerMove(wrapper, { clientX: 10, clientY: 20 });
      fireEvent.pointerMove(wrapper, { clientX: 200, clientY: 300 });
      act(() => {
        vi.advanceTimersToNextFrame();
      });
      expect(tooltip.style.getPropertyValue('--yl-hint-x')).toBe('208px');

      fireEvent.pointerLeave(wrapper);
      expect(wrapper).toHaveClass('yl-cursor-hint--closed');
    });

    it('should ignore touch pointers', () => {
      render(
        <CursorHint content="Dica" data-testid="hint">
          x
        </CursorHint>
      );

      fireEvent.pointerEnter(screen.getByTestId('hint'), { pointerType: 'touch' });

      expect(screen.getByTestId('hint')).toHaveClass('yl-cursor-hint--closed');
    });

    it('should anchor the hint on keyboard focus and close on blur', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(
        <CursorHint content="Dica" data-testid="hint">
          x
        </CursorHint>
      );

      await user.tab();
      expect(screen.getByTestId('hint')).toHaveClass('yl-cursor-hint--anchored');

      await user.tab();
      expect(screen.getByTestId('hint')).toHaveClass('yl-cursor-hint--closed');
    });

    it('should cancel a pending frame on unmount', () => {
      const cancel = vi.spyOn(globalThis, 'cancelAnimationFrame');
      const { unmount } = render(
        <CursorHint content="Dica" data-testid="hint">
          x
        </CursorHint>
      );

      fireEvent.pointerMove(screen.getByTestId('hint'), { clientX: 1, clientY: 1 });
      unmount();

      expect(cancel).toHaveBeenCalled();
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations for text and image hints', async () => {
      vi.useRealTimers();
      const { container } = render(
        <>
          <CursorHint content="Desenvolvedor & Designer">o dg do ds</CursorHint>
          <CursorHint kind="image" src="/horizon.jpg" alt="Captura do jogo Horizon">
            Horizon
          </CursorHint>
        </>
      );

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

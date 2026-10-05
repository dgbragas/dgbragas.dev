import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { BigNumber } from '..';

type Callback = (entries: { isIntersecting: boolean }[]) => void;

describe('BigNumber.component', () => {
  let reveal: Callback | undefined;
  let reducedMotion = false;

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance'] });
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe = vi.fn();
        disconnect = vi.fn();
        constructor(callback: Callback) {
          reveal = callback;
        }
      }
    );
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({
        get matches() {
          return reducedMotion;
        },
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))
    );
  });

  afterEach(() => {
    reveal = undefined;
    reducedMotion = false;
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('should be defined (no circular dependency)', () => {
    expect(BigNumber).toBeDefined();
  });

  describe('when render', () => {
    it('should show zero until revealed and expose the final value to assistive technology', () => {
      render(<BigNumber value={92} suffix="%" label="de adoção" />);

      expect(screen.getByText('92%')).toHaveClass('yl-big-number__final');
      expect(screen.getByText('0%')).toHaveAttribute('aria-hidden', 'true');
      expect(screen.getByText('de adoção')).toBeInTheDocument();
    });
  });

  describe('when receive props', () => {
    describe('prefix, decimals and locale props', () => {
      it('should format the final value with every part', () => {
        render(<BigNumber value={1234.5} prefix="+" decimals={1} locale="en-US" label="users" />);

        expect(screen.getByText('+1,234.5')).toHaveClass('yl-big-number__final');
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<BigNumber data-testid="stat" value={1} label="x" className="custom" />);

        expect(screen.getByTestId('stat')).toHaveClass('yl-big-number', 'custom');
      });
    });
  });

  describe('when handling actions', () => {
    it('should count up to the value after entering the viewport', () => {
      render(<BigNumber value={16} prefix="+" label="marcas" />);

      act(() => reveal?.([{ isIntersecting: true }]));
      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(screen.getAllByText('+16')).toHaveLength(2);
    });

    it('should show the final value at once when motion is reduced', () => {
      reducedMotion = true;
      render(<BigNumber value={8} prefix="+" label="anos" />);

      act(() => reveal?.([{ isIntersecting: true }]));

      expect(screen.getAllByText('+8')).toHaveLength(2);
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      vi.useRealTimers();
      const { container } = render(<BigNumber value={92} suffix="%" label="de adoção" />);

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

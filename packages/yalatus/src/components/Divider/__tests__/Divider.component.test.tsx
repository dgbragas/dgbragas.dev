import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { Divider } from '..';

describe('Divider.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(Divider).toBeDefined();
  });

  describe('when render', () => {
    it('should render a horizontal hr with the block class', () => {
      render(<Divider />);

      const divider = screen.getByRole('separator');
      expect(divider.tagName).toBe('HR');
      expect(divider).toHaveClass('yl-divider', 'yl-divider--horizontal');
      expect(divider).not.toHaveAttribute('aria-orientation');
    });
  });

  describe('when receive props', () => {
    describe('as prop', () => {
      it('should give a div the separator role', () => {
        render(<Divider as="div" />);

        expect(screen.getByRole('separator').tagName).toBe('DIV');
      });
    });

    describe('orientation prop', () => {
      it('should announce the vertical orientation', () => {
        render(<Divider orientation="vertical" />);

        const divider = screen.getByRole('separator');
        expect(divider).toHaveClass('yl-divider--vertical');
        expect(divider).toHaveAttribute('aria-orientation', 'vertical');
      });
    });

    describe('decorative prop', () => {
      it('should hide the divider from assistive technology', () => {
        render(<Divider data-testid="divider" decorative />);

        const divider = screen.getByTestId('divider');
        expect(divider).toHaveAttribute('aria-hidden', 'true');
        expect(divider).toHaveAttribute('role', 'none');
        expect(screen.queryByRole('separator')).not.toBeInTheDocument();
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<Divider className="custom" />);

        expect(screen.getByRole('separator')).toHaveClass('yl-divider', 'custom');
      });
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations in both orientations', async () => {
      const { container } = render(
        <>
          <Divider />
          <Divider as="div" orientation="vertical" />
        </>
      );

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

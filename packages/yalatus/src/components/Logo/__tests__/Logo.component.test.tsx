import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { Logo } from '..';

describe('Logo.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(Logo).toBeDefined();
  });

  describe('when render', () => {
    it('should render the clearspace mark as an image named dgbragas', () => {
      render(<Logo />);

      const logo = screen.getByRole('img', { name: 'dgbragas' });
      expect(logo).toHaveClass('yl-logo', 'yl-logo--clearspace');
      expect(logo.querySelector('svg')).not.toHaveAttribute('width');
      expect(logo.innerHTML).toContain('currentColor');
    });
  });

  describe('when receive props', () => {
    describe('appearance prop', () => {
      it.each(['filled', 'colored'] as const)(
        'should keep the original paints of the %s mark',
        appearance => {
          render(<Logo appearance={appearance} />);

          const logo = screen.getByRole('img');
          expect(logo).toHaveClass(`yl-logo--${appearance}`);
          expect(logo.innerHTML).not.toContain('currentColor');
          expect(logo.querySelector('svg')).not.toHaveAttribute('height');
        }
      );
    });

    describe('label prop', () => {
      it('should change the accessible name', () => {
        render(<Logo label="Diego Braga" />);

        expect(screen.getByRole('img', { name: 'Diego Braga' })).toBeInTheDocument();
      });
    });

    describe('decorative prop', () => {
      it('should hide the mark from assistive technology', () => {
        render(<Logo data-testid="logo" decorative />);

        expect(screen.getByTestId('logo')).toHaveAttribute('aria-hidden', 'true');
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<Logo className="custom" />);

        expect(screen.getByRole('img')).toHaveClass('yl-logo', 'custom');
      });
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<Logo />);

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

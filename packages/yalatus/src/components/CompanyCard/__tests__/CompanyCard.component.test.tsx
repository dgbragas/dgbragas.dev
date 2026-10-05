import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { CompanyCard } from '..';

const props = {
  name: 'Caju Benefícios',
  position: 'Senior Front-end Developer',
  period: 'Agosto 2025 → Atualmente',
  logo: <svg aria-hidden="true" data-testid="logo" />,
};

describe('CompanyCard.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(CompanyCard).toBeDefined();
  });

  describe('when render', () => {
    it('should render a list item with plate, name, role, period and a decorative rule', () => {
      render(
        <ul>
          <CompanyCard {...props} />
        </ul>
      );

      const item = screen.getByRole('listitem');
      expect(item).toHaveClass('yl-company-card');
      expect(
        screen.getByRole('heading', { level: 3, name: 'Caju Benefícios' })
      ).toBeInTheDocument();
      expect(screen.getByText('Senior Front-end Developer')).toBeInTheDocument();
      expect(screen.getByText('Agosto 2025 → Atualmente')).toBeInTheDocument();
      expect(screen.getByTestId('logo').closest('.yl-company-card__plate')).toHaveStyle({
        backgroundColor: 'var(--yl-color-surface-accent-subtle)',
      });
      expect(item.querySelector('.yl-divider')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('when receive props', () => {
    describe('color prop', () => {
      it('should accept a brand colour outside the tokens', () => {
        render(
          <ul>
            <CompanyCard {...props} color="#e80837" />
          </ul>
        );

        expect(screen.getByTestId('logo').closest('.yl-company-card__plate')).toHaveStyle({
          backgroundColor: '#e80837',
        });
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(
          <ul>
            <CompanyCard {...props} className="custom" />
          </ul>
        );

        expect(screen.getByRole('listitem')).toHaveClass('yl-company-card', 'custom');
      });
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(
        <ul>
          <CompanyCard {...props} />
        </ul>
      );

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

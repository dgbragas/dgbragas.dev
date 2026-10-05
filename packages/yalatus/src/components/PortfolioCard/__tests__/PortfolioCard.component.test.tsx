import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { PortfolioCard } from '..';

const props = {
  href: '/portfolio/casa1',
  cover: <img alt="" src="/cover.png" />,
  tag: 'Landing',
  title: 'Casa1',
  description: 'Proposta de redesign.',
};

describe('PortfolioCard.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(PortfolioCard).toBeDefined();
  });

  describe('when render', () => {
    it('should render a link with cover, tag, title and description and no date', () => {
      render(<PortfolioCard {...props} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/portfolio/casa1');
      expect(link).toHaveClass('yl-portfolio-card');
      expect(link.querySelector('.yl-portfolio-card__cover img')).toHaveAttribute(
        'src',
        '/cover.png'
      );
      expect(screen.getByText('Landing')).toHaveClass('yl-tag');
      expect(screen.getByRole('heading', { level: 3, name: 'Casa1' })).toBeInTheDocument();
      expect(link.querySelector('time')).not.toBeInTheDocument();
    });
  });

  describe('when receive props', () => {
    describe('date props', () => {
      it('should render the time element', () => {
        render(<PortfolioCard {...props} date="26 mar 2025" dateTime="2025-03-26" />);

        expect(screen.getByText('26 mar 2025')).toHaveAttribute('datetime', '2025-03-26');
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<PortfolioCard {...props} className="custom" />);

        expect(screen.getByRole('link')).toHaveClass('yl-portfolio-card', 'custom');
      });
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(
        <PortfolioCard {...props} date="26 mar 2025" dateTime="2025-03-26" />
      );

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

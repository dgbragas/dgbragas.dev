import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { ServiceCard } from '..';

const props = {
  title: 'Design',
  description: 'Qualidade code-ready na construção das UIs',
  detail: 'Tokens organizados, componentes adaptativos e estrutura MCP-ready',
};

describe('ServiceCard.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(ServiceCard).toBeDefined();
  });

  describe('when render', () => {
    it('should render an article with heading, description and detail', () => {
      render(<ServiceCard {...props} />);

      const card = screen.getByRole('article');
      expect(card).toHaveClass('yl-service-card');
      expect(screen.getByRole('heading', { level: 3, name: 'Design' })).toBeInTheDocument();
      expect(screen.getByText(props.description)).toBeInTheDocument();
      expect(screen.getByText(props.detail)).toHaveClass('yl-service-card__detail');
    });
  });

  describe('when receive props', () => {
    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<ServiceCard {...props} className="custom" />);

        expect(screen.getByRole('article')).toHaveClass('yl-service-card', 'custom');
      });
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<ServiceCard {...props} />);

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

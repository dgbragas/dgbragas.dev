import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { Container } from '..';

describe('Container.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(Container).toBeDefined();
  });

  describe('when render', () => {
    it('should render a content-sized div with its children', () => {
      render(<Container data-testid="container">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container.tagName).toBe('DIV');
      expect(container).toHaveClass('yl-container', 'yl-container--content');
      expect(container).toHaveTextContent('Content');
    });
  });

  describe('when receive props', () => {
    describe('size prop', () => {
      it('should apply the full modifier', () => {
        render(<Container data-testid="container" size="full" />);

        expect(screen.getByTestId('container')).toHaveClass('yl-container--full');
      });
    });

    describe('as prop', () => {
      it('should render the given element', () => {
        render(<Container as="section" aria-label="Hero" />);

        expect(screen.getByRole('region', { name: 'Hero' })).toHaveClass('yl-container');
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<Container data-testid="container" className="custom" />);

        expect(screen.getByTestId('container')).toHaveClass('yl-container', 'custom');
      });
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(
        <Container as="main">
          <p>Content</p>
        </Container>
      );

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

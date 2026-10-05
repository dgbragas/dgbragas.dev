import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { Blockquote } from '..';

describe('Blockquote.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(Blockquote).toBeDefined();
  });

  describe('when render', () => {
    it('should render a blockquote with the quote and no author line', () => {
      render(<Blockquote>Uma frase marcante.</Blockquote>);

      const quote = screen.getByText('Uma frase marcante.').closest('blockquote');
      expect(quote).toHaveClass('yl-blockquote');
      expect(quote?.querySelector('.yl-blockquote__author')).not.toBeInTheDocument();
    });
  });

  describe('when receive props', () => {
    describe('author and cite props', () => {
      it('should render the author line and the cite attribute', () => {
        render(
          <Blockquote author="Guilherme Camillo" cite="https://x.y/post">
            Uma frase.
          </Blockquote>
        );

        expect(screen.getByText('Guilherme Camillo')).toHaveClass('yl-blockquote__author');
        expect(screen.getByText('Uma frase.').closest('blockquote')).toHaveAttribute(
          'cite',
          'https://x.y/post'
        );
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<Blockquote className="custom">Frase</Blockquote>);

        expect(screen.getByText('Frase').closest('blockquote')).toHaveClass(
          'yl-blockquote',
          'custom'
        );
      });
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<Blockquote author="Alguém">Frase</Blockquote>);

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { ViewMore } from '..';

describe('ViewMore.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(ViewMore).toBeDefined();
  });

  describe('when render', () => {
    it('should render a button with the label and a decorative plus icon', () => {
      render(<ViewMore>Ver acervo completo</ViewMore>);

      const button = screen.getByRole('button', { name: 'Ver acervo completo' });
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveClass('yl-view-more');
      expect(button.querySelector('.yl-icon')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('when receive props', () => {
    describe('as prop', () => {
      it('should render an anchor with the href', () => {
        render(
          <ViewMore as="a" href="/blog">
            Ver todos
          </ViewMore>
        );

        expect(screen.getByRole('link', { name: 'Ver todos' })).toHaveAttribute('href', '/blog');
      });
    });

    describe('disabled prop', () => {
      it('should disable the button', () => {
        render(<ViewMore disabled>Carregando</ViewMore>);

        expect(screen.getByRole('button')).toBeDisabled();
        expect(screen.getByRole('button')).toHaveClass('yl-view-more--disabled');
      });

      it('should drop the href and expose aria-disabled on anchors', () => {
        render(
          <ViewMore as="a" href="/blog" disabled>
            Ver todos
          </ViewMore>
        );

        const anchor = screen.getByText('Ver todos').closest('a');
        expect(anchor).not.toHaveAttribute('href');
        expect(anchor).toHaveAttribute('aria-disabled', 'true');
      });
    });

    describe('type prop', () => {
      it('should pass the submit type through', () => {
        render(<ViewMore type="submit">Enviar</ViewMore>);

        expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<ViewMore className="custom">Mais</ViewMore>);

        expect(screen.getByRole('button')).toHaveClass('yl-view-more', 'custom');
      });
    });
  });

  describe('when handling actions', () => {
    it('should call onClick on click, Enter and Space', async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(<ViewMore onClick={onClick}>Mais</ViewMore>);

      await user.click(screen.getByRole('button'));
      await user.keyboard('{Enter}');
      await user.keyboard(' ');

      expect(onClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<ViewMore>Ver acervo completo</ViewMore>);

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

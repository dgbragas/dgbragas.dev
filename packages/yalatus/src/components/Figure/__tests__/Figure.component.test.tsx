import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { Figure } from '..';

describe('Figure.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(Figure).toBeDefined();
  });

  describe('when render', () => {
    it('should render a figure with a lazy image and no caption', () => {
      render(<Figure src="/x.png" alt="Diagrama" width={600} height={400} />);

      const image = screen.getByRole('img', { name: 'Diagrama' });
      expect(image).toHaveAttribute('loading', 'lazy');
      expect(image).toHaveAttribute('width', '600');
      expect(image.closest('figure')).toHaveClass('yl-figure');
      expect(image.closest('figure')?.querySelector('figcaption')).not.toBeInTheDocument();
    });
  });

  describe('when receive props', () => {
    describe('caption and captionLabel props', () => {
      it('should render the caption opened by the label', () => {
        render(
          <Figure
            src="/x.png"
            alt=""
            caption="Fluxo em três etapas."
            captionLabel="#ParaTodosVerem"
          />
        );

        const caption = screen.getByText('Fluxo em três etapas.', { exact: false });
        expect(caption.tagName).toBe('FIGCAPTION');
        expect(screen.getByText('#ParaTodosVerem')).toHaveClass('yl-figure__caption-label');
      });
    });

    describe('children prop', () => {
      it('should render the supplied image instead of the default one', () => {
        render(
          <Figure alt="" caption="Foto">
            <picture>
              <img alt="Foto do evento" src="/photo.avif" />
            </picture>
          </Figure>
        );

        expect(screen.getByRole('img', { name: 'Foto do evento' })).toBeInTheDocument();
        expect(
          screen.getByRole('img').closest('figure')?.querySelector('.yl-figure__image')
        ).not.toBeInTheDocument();
      });
    });

    describe('loading prop', () => {
      it('should pass the eager strategy through', () => {
        render(<Figure src="/x.png" alt="Capa" loading="eager" />);

        expect(screen.getByRole('img')).toHaveAttribute('loading', 'eager');
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<Figure src="/x.png" alt="Capa" className="custom" />);

        expect(screen.getByRole('img').closest('figure')).toHaveClass('yl-figure', 'custom');
      });
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(
        <Figure src="/x.png" alt="Capa do post" caption="Capa com o título do post." />
      );

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

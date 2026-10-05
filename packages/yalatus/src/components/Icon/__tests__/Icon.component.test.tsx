import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { Icon, ICON_NAMES } from '..';

describe('Icon.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(Icon).toBeDefined();
  });

  describe('when render', () => {
    it('should inline the SVG of the named icon as a decorative span', () => {
      render(<Icon data-testid="icon" name="search" />);

      const icon = screen.getByTestId('icon');
      expect(icon.tagName).toBe('SPAN');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon).toHaveClass('yl-icon', 'yl-icon--medium');
      expect(icon.querySelector('svg')).toBeInTheDocument();
    });

    it('should expose every exported file as an icon name', () => {
      expect(ICON_NAMES.length).toBeGreaterThan(0);
      expect(ICON_NAMES).toContain('search');
    });
  });

  describe('when receive props', () => {
    describe('label prop', () => {
      it('should announce the icon as an image with the label', () => {
        render(<Icon name="rss" label="Feed RSS" />);

        expect(screen.getByRole('img', { name: 'Feed RSS' })).not.toHaveAttribute('aria-hidden');
      });
    });

    describe('size prop', () => {
      it.each(['smallest', 'small', 'large'] as const)('should apply the %s size class', size => {
        render(<Icon data-testid="icon" name="search" size={size} />);

        expect(screen.getByTestId('icon')).toHaveClass(`yl-icon--${size}`);
      });
    });

    describe('color prop', () => {
      it('should resolve the token into an inline colour', () => {
        render(<Icon data-testid="icon" name="search" color="fg-accent" />);

        expect(screen.getByTestId('icon')).toHaveStyle({ color: 'var(--yl-color-fg-accent)' });
      });

      it('should keep the consumer style when inheriting', () => {
        render(<Icon data-testid="icon" name="search" style={{ opacity: 0.5 }} />);

        const icon = screen.getByTestId('icon');
        expect(icon.style.color).toBe('');
        expect(icon).toHaveStyle({ opacity: '0.5' });
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<Icon data-testid="icon" name="search" className="custom" />);

        expect(screen.getByTestId('icon')).toHaveClass('yl-icon', 'custom');
      });
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations as decorative and as labelled image', async () => {
      const { container } = render(
        <>
          <Icon name="search" />
          <Icon name="rss" label="Feed RSS" />
        </>
      );

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

import { createRef } from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { Box } from '..';

describe('Box.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(Box).toBeDefined();
  });

  describe('when render', () => {
    it('should render a div with the block class and its children', () => {
      render(<Box data-testid="box">Content</Box>);

      const box = screen.getByTestId('box');
      expect(box.tagName).toBe('DIV');
      expect(box).toHaveClass('yl-box');
      expect(box).toHaveTextContent('Content');
    });

    it('should forward the ref to the root element', () => {
      const ref = createRef<HTMLElement>();
      render(<Box ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('when receive props', () => {
    describe('as prop', () => {
      it('should render the given element with link attributes', () => {
        render(
          <Box as="a" href="/x" target="_blank" rel="noreferrer">
            Link
          </Box>
        );

        const link = screen.getByRole('link', { name: 'Link' });
        expect(link).toHaveAttribute('href', '/x');
        expect(link).toHaveAttribute('rel', 'noreferrer');
      });
    });

    describe('style props', () => {
      it('should resolve tokens into inline styles and keep the consumer style', () => {
        render(
          <Box data-testid="box" width="space-16" gap={4} bg="bg-canvas" style={{ opacity: 0.5 }} />
        );

        expect(screen.getByTestId('box')).toHaveStyle({
          width: 'var(--yl-space-16)',
          gap: '4px',
          backgroundColor: 'var(--yl-color-bg-canvas)',
          opacity: '0.5',
        });
      });

      it('should add the responsive class for per-breakpoint values', () => {
        render(<Box data-testid="box" display={{ base: 'none', tablet: 'block' }} />);

        expect(screen.getByTestId('box')).toHaveClass('yl-box--r-display');
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<Box data-testid="box" className="custom" />);

        expect(screen.getByTestId('box')).toHaveClass('yl-box', 'custom');
      });
    });
  });

  describe('when handling edge cases', () => {
    it.each([null, false, undefined])('should render without children (%s)', children => {
      render(<Box data-testid="box">{children}</Box>);

      expect(screen.getByTestId('box')).toBeEmptyDOMElement();
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(
        <Box as="section" aria-label="Section">
          Content
        </Box>
      );

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

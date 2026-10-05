import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { Text } from '..';

describe('Text.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(Text).toBeDefined();
  });

  describe('when render', () => {
    it('should render a paragraph with the body kind by default', () => {
      render(<Text>Body</Text>);

      const text = screen.getByText('Body');
      expect(text.tagName).toBe('P');
      expect(text).toHaveClass('yl-text', 'yl-text--body');
    });
  });

  describe('when receive props', () => {
    describe('kind prop', () => {
      it.each([
        ['display', 'H1'],
        ['heading-1', 'H2'],
        ['heading-5', 'H6'],
        ['caption', 'SMALL'],
        ['code', 'CODE'],
        ['label', 'SPAN'],
      ] as const)('should render %s with its semantic element', (kind, tag) => {
        render(<Text kind={kind}>Text</Text>);

        const text = screen.getByText('Text');
        expect(text.tagName).toBe(tag);
        expect(text).toHaveClass(`yl-text--${kind}`);
      });
    });

    describe('element prop', () => {
      it('should override the semantic element', () => {
        render(
          <Text kind="caption" element="time" dateTime="2026-10-04">
            4 out
          </Text>
        );

        const time = screen.getByText('4 out');
        expect(time.tagName).toBe('TIME');
        expect(time).toHaveAttribute('datetime', '2026-10-04');
      });
    });

    describe('color prop', () => {
      it('should resolve the token into an inline colour', () => {
        render(<Text color="fg-subtle">Muted</Text>);

        expect(screen.getByText('Muted')).toHaveStyle({ color: 'var(--yl-color-fg-subtle)' });
      });

      it('should leave colour untouched when inherit', () => {
        render(<Text style={{ opacity: 0.5 }}>Plain</Text>);

        const text = screen.getByText('Plain');
        expect(text.style.color).toBe('');
        expect(text).toHaveStyle({ opacity: '0.5' });
      });
    });

    describe('align and truncate props', () => {
      it('should add the modifier classes', () => {
        render(
          <Text align="center" truncate>
            Centered
          </Text>
        );

        expect(screen.getByText('Centered')).toHaveClass('yl-text--center', 'yl-text--truncate');
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<Text className="custom">Text</Text>);

        expect(screen.getByText('Text')).toHaveClass('yl-text', 'custom');
      });
    });
  });

  describe('when handling edge cases', () => {
    it.each([null, false, undefined])('should render without children (%s)', children => {
      render(<Text data-testid="text">{children}</Text>);

      expect(screen.getByTestId('text')).toBeEmptyDOMElement();
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(
        <>
          <Text kind="title">Title</Text>
          <Text>Body</Text>
        </>
      );

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

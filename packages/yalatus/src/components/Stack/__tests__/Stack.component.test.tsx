import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { Stack } from '..';

describe('Stack.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(Stack).toBeDefined();
  });

  describe('when render', () => {
    it('should render a vertical flex container by default', () => {
      render(<Stack data-testid="stack">Content</Stack>);

      expect(screen.getByTestId('stack')).toHaveStyle({ display: 'flex', flexDirection: 'column' });
    });
  });

  describe('when receive props', () => {
    describe('orientation prop', () => {
      it('should lay children in a row when horizontal', () => {
        render(<Stack data-testid="stack" orientation="horizontal" />);

        expect(screen.getByTestId('stack')).toHaveStyle({ flexDirection: 'row' });
      });
    });

    describe('center prop', () => {
      it('should centre both axes and override the alignment props', () => {
        render(
          <Stack data-testid="stack" center alignItems="flex-end" justifyContent="flex-end" />
        );

        expect(screen.getByTestId('stack')).toHaveStyle({
          alignItems: 'center',
          justifyContent: 'center',
        });
      });

      it('should keep the alignment props when false', () => {
        render(<Stack data-testid="stack" alignItems="flex-end" justifyContent="space-between" />);

        expect(screen.getByTestId('stack')).toHaveStyle({
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        });
      });
    });

    describe('gap prop', () => {
      it('should resolve the space token', () => {
        render(<Stack data-testid="stack" gap="space-8" />);

        expect(screen.getByTestId('stack')).toHaveStyle({ gap: 'var(--yl-space-8)' });
      });
    });
  });

  describe('when handling edge cases', () => {
    it.each([null, false, undefined])('should render without children (%s)', children => {
      render(<Stack data-testid="stack">{children}</Stack>);

      expect(screen.getByTestId('stack')).toBeEmptyDOMElement();
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(
        <Stack as="ul" role="list">
          <li>One</li>
          <li>Two</li>
        </Stack>
      );

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

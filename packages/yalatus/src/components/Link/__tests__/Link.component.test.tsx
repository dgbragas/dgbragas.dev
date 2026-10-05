import type { MouseEvent } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { EXTERNAL_LINK_REL } from '@dgbragas/yalatus/constants';
import { runAxe } from '@dgbragas/yalatus/test-utils';

import { Link } from '..';

describe('Link.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(Link).toBeDefined();
  });

  describe('when render', () => {
    it('should render an anchor with the text and the default trailing icon', () => {
      render(<Link href="/blog">Blog</Link>);

      const link = screen.getByRole('link', { name: 'Blog' });
      expect(link).toHaveAttribute('href', '/blog');
      expect(link).toHaveClass('yl-link');
      expect(link.querySelector('.yl-icon')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('when receive props', () => {
    describe('trailingIcon prop', () => {
      it('should remove the icon when false', () => {
        render(
          <Link href="/blog" trailingIcon={false}>
            Blog
          </Link>
        );

        expect(screen.getByRole('link').querySelector('.yl-icon')).not.toBeInTheDocument();
      });
    });

    describe('target prop', () => {
      it('should add the safe rel to _blank links and keep a given rel', () => {
        const { rerender } = render(
          <Link href="https://x.y" target="_blank">
            Externo
          </Link>
        );
        expect(screen.getByRole('link')).toHaveAttribute('rel', EXTERNAL_LINK_REL);

        rerender(
          <Link href="https://x.y" target="_blank" rel="me">
            Externo
          </Link>
        );
        expect(screen.getByRole('link')).toHaveAttribute('rel', 'me');
      });
    });

    describe('disabled prop', () => {
      it('should drop the href, leave the tab order and announce the state', () => {
        render(
          <Link href="/blog" disabled>
            Blog
          </Link>
        );

        const link = screen.getByRole('link', { name: 'Blog' });
        expect(link).not.toHaveAttribute('href');
        expect(link).toHaveAttribute('aria-disabled', 'true');
        expect(link).toHaveAttribute('tabindex', '-1');
        expect(link).toHaveClass('yl-link--disabled');
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(
          <Link href="/blog" className="custom">
            Blog
          </Link>
        );

        expect(screen.getByRole('link')).toHaveClass('yl-link', 'custom');
      });
    });
  });

  describe('when handling actions', () => {
    it('should call onClick on click and Enter', async () => {
      const onClick = vi.fn((event: MouseEvent<HTMLAnchorElement>) => event.preventDefault());
      const user = userEvent.setup();
      render(
        <Link href="/blog" onClick={onClick}>
          Blog
        </Link>
      );

      await user.click(screen.getByRole('link'));
      await user.keyboard('{Enter}');

      expect(onClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('when handling edge cases', () => {
    it.each([null, false, undefined])('should render an empty label with children %s', children => {
      render(
        <Link href="/x" data-testid="link">
          {children}
        </Link>
      );

      expect(screen.getByTestId('link').querySelector('.yl-link__label')).toBeEmptyDOMElement();
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<Link href="/blog">Blog</Link>);

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

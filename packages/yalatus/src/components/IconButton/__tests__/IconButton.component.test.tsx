import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { EXTERNAL_LINK_REL } from '@dgbragas/yalatus/constants';
import { runAxe } from '@dgbragas/yalatus/test-utils';

import { IconButton } from '..';

describe('IconButton.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(IconButton).toBeDefined();
  });

  describe('when render', () => {
    it('should render a button named by the label with a decorative medium icon', () => {
      render(<IconButton icon="search" label="Buscar" />);

      const button = screen.getByRole('button', { name: 'Buscar' });
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveClass(
        'yl-icon-button',
        'yl-icon-button--accent',
        'yl-icon-button--default',
        'yl-icon-button--medium'
      );
      expect(button.querySelector('.yl-icon')).toHaveClass('yl-icon--medium');
      expect(button.querySelector('.yl-icon')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('when receive props', () => {
    describe('size prop', () => {
      it('should use the large icon only on the large size', () => {
        const { rerender } = render(<IconButton icon="search" label="Buscar" size="large" />);
        expect(screen.getByRole('button').querySelector('.yl-icon')).toHaveClass('yl-icon--large');

        rerender(<IconButton icon="search" label="Buscar" size="small" />);
        expect(screen.getByRole('button')).toHaveClass('yl-icon-button--small');
        expect(screen.getByRole('button').querySelector('.yl-icon')).toHaveClass('yl-icon--medium');
      });
    });

    describe('appearance and kind props', () => {
      it.each([
        ['neutral', 'ghost'],
        ['inverse', 'default'],
      ] as const)('should apply the %s and %s classes', (appearance, kind) => {
        render(<IconButton icon="search" label="Buscar" appearance={appearance} kind={kind} />);

        expect(screen.getByRole('button')).toHaveClass(
          `yl-icon-button--${appearance}`,
          `yl-icon-button--${kind}`
        );
      });
    });

    describe('type prop', () => {
      it('should pass the submit type through', () => {
        render(<IconButton icon="search" label="Buscar" type="submit" />);

        expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
      });
    });

    describe('as prop', () => {
      it('should render an anchor with href and the safe rel for _blank', () => {
        render(<IconButton as="a" href="https://x.y" icon="rss" label="Feed" target="_blank" />);

        const link = screen.getByRole('link', { name: 'Feed' });
        expect(link).toHaveAttribute('href', 'https://x.y');
        expect(link).toHaveAttribute('rel', EXTERNAL_LINK_REL);
        expect(link).not.toHaveAttribute('type');
      });

      it('should keep a given rel', () => {
        render(<IconButton as="a" href="/x" icon="rss" label="Feed" target="_blank" rel="me" />);

        expect(screen.getByRole('link')).toHaveAttribute('rel', 'me');
      });
    });

    describe('disabled prop', () => {
      it('should disable the native button', () => {
        render(<IconButton icon="search" label="Buscar" disabled />);

        expect(screen.getByRole('button')).toBeDisabled();
        expect(screen.getByRole('button')).toHaveClass('yl-icon-button--disabled');
      });

      it('should drop the href and expose aria-disabled on anchors', () => {
        render(<IconButton as="a" href="/x" icon="rss" label="Feed" disabled />);

        const anchor = screen.getByLabelText('Feed');
        expect(anchor).not.toHaveAttribute('href');
        expect(anchor).toHaveAttribute('aria-disabled', 'true');
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<IconButton icon="search" label="Buscar" className="custom" />);

        expect(screen.getByRole('button')).toHaveClass('yl-icon-button', 'custom');
      });
    });
  });

  describe('when handling actions', () => {
    it('should call onClick on click, Enter and Space', async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(<IconButton icon="search" label="Buscar" onClick={onClick} />);

      await user.click(screen.getByRole('button'));
      await user.keyboard('{Enter}');
      await user.keyboard(' ');

      expect(onClick).toHaveBeenCalledTimes(3);
    });

    it('should not call onClick when disabled', async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(<IconButton icon="search" label="Buscar" onClick={onClick} disabled />);

      await user.click(screen.getByRole('button'));

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations as button and as anchor', async () => {
      const { container } = render(
        <>
          <IconButton icon="search" label="Buscar" />
          <IconButton as="a" href="/rss.xml" icon="rss" label="Feed RSS" kind="ghost" />
        </>
      );

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

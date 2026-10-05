import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { EXTERNAL_LINK_REL } from '@dgbragas/yalatus/constants';
import { runAxe } from '@dgbragas/yalatus/test-utils';

import { Button } from '..';

describe('Button.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(Button).toBeDefined();
  });

  describe('when render', () => {
    it('should render a button of type button with the label and default classes', () => {
      render(<Button>Salvar</Button>);

      const button = screen.getByRole('button', { name: 'Salvar' });
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveClass('yl-button', 'yl-button--accent', 'yl-button--default');
    });

    it('should render decorative lead and trailing icons', () => {
      render(
        <Button leadIcon="mail" trailingIcon="arrow-right">
          Enviar
        </Button>
      );

      const button = screen.getByRole('button', { name: 'Enviar' });
      expect(button.querySelectorAll('.yl-icon')).toHaveLength(2);
      expect(button.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
    });
  });

  describe('when receive props', () => {
    describe('appearance prop', () => {
      it.each(['accent', 'neutral', 'inverse'] as const)(
        'should apply the %s class',
        appearance => {
          render(<Button appearance={appearance}>Label</Button>);

          expect(screen.getByRole('button')).toHaveClass(`yl-button--${appearance}`);
        }
      );
    });

    describe('kind prop', () => {
      it('should apply the ghost class', () => {
        render(<Button kind="ghost">Label</Button>);

        expect(screen.getByRole('button')).toHaveClass('yl-button--ghost');
      });
    });

    describe('type prop', () => {
      it('should pass the submit type through', () => {
        render(<Button type="submit">Enviar</Button>);

        expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
      });
    });

    describe('as prop', () => {
      it('should render an anchor with href and no type', () => {
        render(
          <Button as="a" href="/portfolio">
            Portfólio
          </Button>
        );

        const link = screen.getByRole('link', { name: 'Portfólio' });
        expect(link).toHaveAttribute('href', '/portfolio');
        expect(link).not.toHaveAttribute('type');
      });

      it('should add the safe rel to _blank anchors and keep a given rel', () => {
        const { rerender } = render(
          <Button as="a" href="https://x.y" target="_blank">
            Externo
          </Button>
        );
        expect(screen.getByRole('link')).toHaveAttribute('rel', EXTERNAL_LINK_REL);

        rerender(
          <Button as="a" href="https://x.y" target="_blank" rel="me">
            Externo
          </Button>
        );
        expect(screen.getByRole('link')).toHaveAttribute('rel', 'me');
      });
    });

    describe('disabled prop', () => {
      it('should disable the native button and add the modifier', () => {
        render(<Button disabled>Label</Button>);

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toHaveClass('yl-button--disabled');
      });

      it('should drop the href and expose aria-disabled on anchors', () => {
        render(
          <Button as="a" href="/x" disabled>
            Label
          </Button>
        );

        const anchor = screen.getByText('Label').closest('a');
        expect(anchor).not.toHaveAttribute('href');
        expect(anchor).toHaveAttribute('aria-disabled', 'true');
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<Button className="custom">Label</Button>);

        expect(screen.getByRole('button')).toHaveClass('yl-button', 'custom');
      });
    });
  });

  describe('when handling actions', () => {
    it('should call onClick on click, Enter and Space', async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={onClick}>Label</Button>);

      await user.click(screen.getByRole('button'));
      await user.keyboard('{Enter}');
      await user.keyboard(' ');

      expect(onClick).toHaveBeenCalledTimes(3);
    });

    it('should not call onClick when disabled', async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(
        <Button onClick={onClick} disabled>
          Label
        </Button>
      );

      await user.click(screen.getByRole('button'));
      await user.keyboard('{Enter}');

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('when handling edge cases', () => {
    it.each([null, false, undefined])('should render an empty label with children %s', children => {
      render(<Button data-testid="button">{children}</Button>);

      expect(screen.getByTestId('button').querySelector('.yl-button__label')).toBeEmptyDOMElement();
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations as button and as anchor', async () => {
      const { container } = render(
        <>
          <Button leadIcon="mail">Enviar</Button>
          <Button as="a" href="/x" kind="ghost">
            Ver mais
          </Button>
        </>
      );

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

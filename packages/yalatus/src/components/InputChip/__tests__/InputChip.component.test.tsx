import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { InputChip } from '..';

describe('InputChip.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(InputChip).toBeDefined();
  });

  describe('when render', () => {
    it('should render the label and a remove button named after it', () => {
      render(<InputChip label="React" />);

      expect(screen.getByText('React')).toHaveClass('yl-input-chip__label');
      expect(screen.getByRole('button', { name: 'Remover React' })).toHaveAttribute(
        'type',
        'button'
      );
    });
  });

  describe('when receive props', () => {
    describe('leadIcon prop', () => {
      it('should draw the icon before the label', () => {
        render(<InputChip data-testid="chip" label="React" leadIcon="react" />);

        expect(screen.getByTestId('chip').querySelectorAll('.yl-icon')).toHaveLength(2);
      });
    });

    describe('removeLabel prop', () => {
      it('should change the accessible name of the remove control', () => {
        render(<InputChip label="React" removeLabel="Remove" />);

        expect(screen.getByRole('button', { name: 'Remove React' })).toBeInTheDocument();
      });
    });

    describe('disabled prop', () => {
      it('should disable the remove control and add the modifier', () => {
        render(<InputChip data-testid="chip" label="React" disabled />);

        expect(screen.getByRole('button')).toBeDisabled();
        expect(screen.getByTestId('chip')).toHaveClass('yl-input-chip--disabled');
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<InputChip data-testid="chip" label="React" className="custom" />);

        expect(screen.getByTestId('chip')).toHaveClass('yl-input-chip', 'custom');
      });
    });
  });

  describe('when handling actions', () => {
    it('should call onRemove with the label on click, Enter and Space', async () => {
      const onRemove = vi.fn();
      const user = userEvent.setup();
      render(<InputChip label="React" onRemove={onRemove} />);

      await user.click(screen.getByRole('button'));
      await user.keyboard('{Enter}');
      await user.keyboard(' ');

      expect(onRemove).toHaveBeenCalledTimes(3);
      expect(onRemove).toHaveBeenLastCalledWith('React');
    });

    it('should not call onRemove when disabled', async () => {
      const onRemove = vi.fn();
      const user = userEvent.setup();
      render(<InputChip label="React" onRemove={onRemove} disabled />);

      await user.click(screen.getByRole('button'));

      expect(onRemove).not.toHaveBeenCalled();
    });

    it('should not throw without onRemove', async () => {
      const user = userEvent.setup();
      render(<InputChip label="React" />);

      await expect(user.click(screen.getByRole('button'))).resolves.toBeUndefined();
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<InputChip label="React" leadIcon="react" />);

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

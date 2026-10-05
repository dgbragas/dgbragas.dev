import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { FilterChip } from '..';

describe('FilterChip.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(FilterChip).toBeDefined();
  });

  describe('when render', () => {
    it('should render an unpressed button without icon by default', () => {
      render(<FilterChip>Todos</FilterChip>);

      const chip = screen.getByRole('button', { name: 'Todos', pressed: false });
      expect(chip).toHaveAttribute('type', 'button');
      expect(chip).toHaveClass('yl-filter-chip');
      expect(chip.querySelector('.yl-icon')).not.toBeInTheDocument();
    });
  });

  describe('when receive props', () => {
    describe('active prop', () => {
      it('should press the button and show the check icon', () => {
        render(
          <FilterChip active leadIcon="filter">
            Cases
          </FilterChip>
        );

        const chip = screen.getByRole('button', { name: 'Cases', pressed: true });
        expect(chip).toHaveClass('yl-filter-chip--active');
        expect(chip.querySelector('.yl-icon svg')).toBeInTheDocument();
      });
    });

    describe('leadIcon prop', () => {
      it('should draw the icon while not active', () => {
        render(<FilterChip leadIcon="filter">Todos</FilterChip>);

        expect(screen.getByRole('button').querySelector('.yl-icon')).toHaveClass(
          'yl-icon--smallest'
        );
      });
    });

    describe('disabled prop', () => {
      it('should disable the button and add the modifier', () => {
        render(<FilterChip disabled>Todos</FilterChip>);

        expect(screen.getByRole('button')).toBeDisabled();
        expect(screen.getByRole('button')).toHaveClass('yl-filter-chip--disabled');
      });
    });

    describe('type prop', () => {
      it('should pass the submit type through', () => {
        render(<FilterChip type="submit">Todos</FilterChip>);

        expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<FilterChip className="custom">Todos</FilterChip>);

        expect(screen.getByRole('button')).toHaveClass('yl-filter-chip', 'custom');
      });
    });
  });

  describe('when handling actions', () => {
    it('should call onClick on click, Enter and Space', async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(<FilterChip onClick={onClick}>Todos</FilterChip>);

      await user.click(screen.getByRole('button'));
      await user.keyboard('{Enter}');
      await user.keyboard(' ');

      expect(onClick).toHaveBeenCalledTimes(3);
    });

    it('should not call onClick when disabled', async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(
        <FilterChip onClick={onClick} disabled>
          Todos
        </FilterChip>
      );

      await user.click(screen.getByRole('button'));

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations in both states', async () => {
      const { container } = render(
        <>
          <FilterChip active>Todos</FilterChip>
          <FilterChip leadIcon="filter">Cases</FilterChip>
        </>
      );

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

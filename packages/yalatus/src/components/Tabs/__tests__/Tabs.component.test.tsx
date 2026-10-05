import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { runAxe } from '@dgbragas/yalatus/test-utils';

import { Tabs } from '..';

import type { TabItem } from '../Tabs.types';

const items: TabItem[] = [
  { id: 'all', label: 'Todos', count: 10 },
  { id: 'cases', label: 'Cases', count: 4 },
  { id: 'landings', label: 'Landings', disabled: true },
];

describe('Tabs.component', () => {
  it('should be defined (no circular dependency)', () => {
    expect(Tabs).toBeDefined();
  });

  describe('when render', () => {
    it('should render a labelled tablist with the first enabled tab selected', () => {
      render(<Tabs items={items} />);

      expect(screen.getByRole('tablist', { name: 'Seções' })).toHaveClass('yl-tabs');
      const first = screen.getByRole('tab', { name: 'Todos 10', selected: true });
      expect(first).toHaveAttribute('tabindex', '0');
      expect(first).toHaveClass('yl-tabs__tab--active');
      expect(screen.getByRole('tab', { name: 'Cases 4' })).toHaveAttribute('tabindex', '-1');
    });

    it('should disable the tab marked as disabled', () => {
      render(<Tabs items={items} />);

      const tab = screen.getByRole('tab', { name: 'Landings' });
      expect(tab).toBeDisabled();
      expect(tab).toHaveClass('yl-tabs__tab--disabled');
    });
  });

  describe('when receive props', () => {
    describe('defaultValue prop', () => {
      it('should select the given tab at first render', () => {
        render(<Tabs items={items} defaultValue="cases" />);

        expect(screen.getByRole('tab', { name: 'Cases 4' })).toHaveAttribute(
          'aria-selected',
          'true'
        );
      });
    });

    describe('value prop', () => {
      it('should keep the selection under the consumer control', async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();
        render(<Tabs items={items} value="all" onChange={onChange} />);

        await user.click(screen.getByRole('tab', { name: 'Cases 4' }));

        expect(onChange).toHaveBeenCalledWith('cases');
        expect(screen.getByRole('tab', { name: 'Todos 10' })).toHaveAttribute(
          'aria-selected',
          'true'
        );
      });
    });

    describe('label and panelId props', () => {
      it('should name the list and link tabs to panels', () => {
        render(<Tabs items={[{ id: 'a', label: 'A', panelId: 'panel-a' }]} label="Filtrar" />);

        expect(screen.getByRole('tablist', { name: 'Filtrar' })).toBeInTheDocument();
        expect(screen.getByRole('tab')).toHaveAttribute('aria-controls', 'panel-a');
      });
    });

    describe('className prop', () => {
      it('should append the consumer class after the block class', () => {
        render(<Tabs items={items} className="custom" />);

        expect(screen.getByRole('tablist')).toHaveClass('yl-tabs', 'custom');
      });
    });
  });

  describe('when handling actions', () => {
    it('should select on click and report the id', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Tabs items={items} onChange={onChange} />);

      await user.click(screen.getByRole('tab', { name: 'Cases 4' }));

      expect(onChange).toHaveBeenCalledWith('cases');
      expect(screen.getByRole('tab', { name: 'Cases 4' })).toHaveAttribute('aria-selected', 'true');
    });

    it('should move focus and selection with the arrow keys, skipping disabled tabs', async () => {
      const user = userEvent.setup();
      render(<Tabs items={items} />);

      await user.tab();
      expect(screen.getByRole('tab', { name: 'Todos 10' })).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: 'Cases 4' })).toHaveFocus();
      expect(screen.getByRole('tab', { name: 'Cases 4' })).toHaveAttribute('aria-selected', 'true');

      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: 'Todos 10' })).toHaveFocus();

      await user.keyboard('{End}');
      expect(screen.getByRole('tab', { name: 'Cases 4' })).toHaveFocus();
    });

    it('should ignore keys that do not navigate', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Tabs items={items} onChange={onChange} />);

      await user.tab();
      await user.keyboard('{ArrowDown}');

      expect(onChange).not.toHaveBeenCalled();
      expect(screen.getByRole('tab', { name: 'Todos 10' })).toHaveFocus();
    });
  });

  describe('when handling edge cases', () => {
    it('should render an empty list without items', () => {
      render(<Tabs items={[]} />);

      expect(screen.getByRole('tablist')).toBeEmptyDOMElement();
    });

    it('should forget the tab element when an item leaves the list', () => {
      const { rerender } = render(<Tabs items={items} />);

      rerender(<Tabs items={items.slice(0, 1)} />);

      expect(screen.getAllByRole('tab')).toHaveLength(1);
    });
  });

  describe('when validating accessibility', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<Tabs items={items} />);

      expect(await runAxe(container)).toHaveNoViolations();
    });
  });
});

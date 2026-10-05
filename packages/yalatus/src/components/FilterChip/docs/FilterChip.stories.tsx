import { useState } from 'react';

import { action } from 'storybook/actions';

import { ICON_NAMES, Stack } from '@dgbragas/yalatus/components';

import { FilterChip } from '..';

import type { FilterChipProps } from '../FilterChip.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<FilterChipProps> = {
  title: 'Components/FilterChip',
  component: FilterChip,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6164-1920',
    },
  },
  argTypes: {
    active: {
      description: 'Marks the filter as applied.',
      table: {
        category: 'FilterChip',
        subcategory: 'MODIFIERS',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    disabled: {
      description: 'Blocks pointer and keyboard interaction.',
      table: {
        category: 'FilterChip',
        subcategory: 'MODIFIERS',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    leadIcon: {
      description: 'Icon drawn before the label while the filter is not active.',
      table: { category: 'FilterChip', subcategory: 'ATTRIBUTES', type: { summary: 'IconName' } },
      control: 'select',
      options: [undefined, ...ICON_NAMES],
    },
    children: {
      description: 'Label of the filter.',
      table: { category: 'FilterChip', subcategory: 'MESSAGES', type: { summary: 'ReactNode' } },
      control: 'text',
    },
    onClick: {
      description: 'Called when the chip is activated by pointer or keyboard.',
      table: {
        category: 'FilterChip',
        subcategory: 'EVENTS',
        type: { summary: 'MouseEventHandler' },
      },
      control: false,
    },
  },
  args: {
    children: 'Todos',
    leadIcon: 'filter',
    onClick: action('🔥 onClick'),
  },
};

export default meta;

type Story = StoryObj<FilterChipProps>;

/** Default state of the component. */
export const Basic: Story = {};

/** A group of filters where one is active at a time. */
export const Group: Story = {
  render: function Render(args) {
    const [active, setActive] = useState('Todos');
    return (
      <Stack orientation="horizontal" gap="space-8">
        {['Todos', 'Cases', 'Landings', 'Portfólios'].map(label => (
          <FilterChip
            {...args}
            key={label}
            active={active === label}
            onClick={() => setActive(label)}
          >
            {label}
          </FilterChip>
        ))}
      </Stack>
    );
  },
};

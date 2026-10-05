import { useState } from 'react';

import { action } from 'storybook/actions';

import { ICON_NAMES, Stack } from '@dgbragas/yalatus/components';

import { InputChip } from '..';

import type { InputChipProps } from '../InputChip.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<InputChipProps> = {
  title: 'Components/InputChip',
  component: InputChip,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6164-1810',
    },
  },
  argTypes: {
    disabled: {
      description: 'Blocks the remove control.',
      table: {
        category: 'InputChip',
        subcategory: 'MODIFIERS',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    leadIcon: {
      description: 'Icon drawn before the label.',
      table: { category: 'InputChip', subcategory: 'ATTRIBUTES', type: { summary: 'IconName' } },
      control: 'select',
      options: [undefined, ...ICON_NAMES],
    },
    label: {
      description: 'Text of the chip, also used to name the remove control.',
      table: { category: 'InputChip', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
    removeLabel: {
      description: 'Verb announced before the label on the remove control.',
      table: {
        category: 'InputChip',
        subcategory: 'MESSAGES',
        type: { summary: 'string' },
        defaultValue: { summary: "'Remover'" },
      },
      control: 'text',
    },
    onRemove: {
      description: 'Called when the remove control is activated, with the chip label.',
      table: {
        category: 'InputChip',
        subcategory: 'EVENTS',
        type: { summary: '(label: string) => void' },
      },
      control: false,
    },
  },
  args: {
    label: 'React',
    leadIcon: 'react',
    onRemove: action('🔥 onRemove'),
  },
};

export default meta;

type Story = StoryObj<InputChipProps>;

/** Default state of the component. */
export const Basic: Story = {};

/** Chips removed from a list as the person clears them. */
export const Removable: Story = {
  render: function Render(args) {
    const [items, setItems] = useState(['React', 'Figma', 'TypeScript']);
    return (
      <Stack orientation="horizontal" gap="space-8">
        {items.map(item => (
          <InputChip
            {...args}
            key={item}
            label={item}
            leadIcon={undefined}
            onRemove={label => setItems(current => current.filter(entry => entry !== label))}
          />
        ))}
      </Stack>
    );
  },
};

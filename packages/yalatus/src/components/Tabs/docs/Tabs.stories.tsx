import { useState } from 'react';

import { action } from 'storybook/actions';

import { Tabs } from '..';

import type { TabsProps } from '../Tabs.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<TabsProps> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6146-5991',
    },
  },
  argTypes: {
    items: {
      description: 'Tabs in display order.',
      table: { category: 'Tabs', subcategory: 'ATTRIBUTES', type: { summary: 'TabItem[]' } },
      control: 'object',
    },
    value: {
      description: 'Controlled mode: id of the selected tab.',
      table: { category: 'Tabs', subcategory: 'BEHAVIOUR', type: { summary: 'string' } },
      control: false,
    },
    defaultValue: {
      description: 'Uncontrolled mode: id selected at first render.',
      table: { category: 'Tabs', subcategory: 'BEHAVIOUR', type: { summary: 'string' } },
      control: 'text',
    },
    label: {
      description: 'Accessible name of the list.',
      table: {
        category: 'Tabs',
        subcategory: 'MESSAGES',
        type: { summary: 'string' },
        defaultValue: { summary: "'Seções'" },
      },
      control: 'text',
    },
    onChange: {
      description: 'Called when a tab is selected, with its id.',
      table: { category: 'Tabs', subcategory: 'EVENTS', type: { summary: '(id: string) => void' } },
      control: false,
    },
  },
  args: {
    items: [
      { id: 'all', label: 'Todos', count: 10 },
      { id: 'cases', label: 'Cases', count: 4 },
      { id: 'landings', label: 'Landings', count: 4 },
      { id: 'portfolios', label: 'Portfólios', count: 2 },
    ],
    onChange: action('🔥 onChange'),
  },
};

export default meta;

type Story = StoryObj<TabsProps>;

/** Default state of the component. */
export const Basic: Story = {};

/** Selection held by the consumer. */
export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('cases');
    return (
      <Tabs
        {...args}
        value={value}
        onChange={id => {
          setValue(id);
          args.onChange?.(id);
        }}
      />
    );
  },
};

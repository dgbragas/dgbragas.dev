import { Stack, Text } from '@dgbragas/yalatus/components';

import { Divider } from '..';

import type { DividerProps } from '../Divider.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<DividerProps> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6021-335',
    },
  },
  argTypes: {
    orientation: {
      description: 'Axis of the line.',
      table: {
        category: 'Divider',
        subcategory: 'MODIFIERS',
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: "'horizontal'" },
      },
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    decorative: {
      description: 'Hides the divider from assistive technology when it only decorates the layout.',
      table: {
        category: 'Divider',
        subcategory: 'BEHAVIOUR',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    as: {
      description: 'Element rendered: hr between flow content, div inside flex rows.',
      table: {
        category: 'Divider',
        subcategory: 'ATTRIBUTES',
        type: { summary: "'hr' | 'div'" },
        defaultValue: { summary: "'hr'" },
      },
      control: 'select',
      options: ['hr', 'div'],
    },
  },
};

export default meta;

type Story = StoryObj<DividerProps>;

/** Default state of the component. */
export const Basic: Story = {};

/** Vertical line between inline items. */
export const Vertical: Story = {
  render: () => (
    <Stack orientation="horizontal" gap="space-16" alignItems="center">
      <Text kind="label">Design System</Text>
      <Divider as="div" orientation="vertical" decorative />
      <Text kind="label">Buy a Coffee</Text>
    </Stack>
  ),
};

import { Box } from '@dgbragas/yalatus/components';

import { Stack } from '..';

import type { StackProps } from '../Stack.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<StackProps> = {
  title: 'Primitives/Stack',
  component: Stack,
  argTypes: {
    orientation: {
      description: 'Axis the children are laid along.',
      table: {
        category: 'Stack',
        subcategory: 'MODIFIERS',
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: "'vertical'" },
      },
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    center: {
      description: 'Centres children on both axes.',
      table: {
        category: 'Stack',
        subcategory: 'MODIFIERS',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    gap: {
      description: 'Gap between children.',
      table: {
        category: 'Stack',
        subcategory: 'MODIFIERS',
        type: { summary: 'Responsive<SpaceValue>' },
      },
      control: 'text',
    },
  },
  args: {
    gap: 'space-8',
  },
  render: args => (
    <Stack {...args}>
      {[1, 2, 3].map(item => (
        <Box key={item} p="space-16" bg="surface-default" borderRadius="radius-4">
          Item {item}
        </Box>
      ))}
    </Stack>
  ),
};

export default meta;

type Story = StoryObj<StackProps>;

/** Default state of the component. */
export const Basic: Story = {};

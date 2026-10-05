import { Box } from '@dgbragas/yalatus/components';

import { Container } from '..';

import type { ContainerProps } from '../Container.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<ContainerProps> = {
  title: 'Primitives/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6327-3749',
    },
  },
  argTypes: {
    size: {
      description: 'Width the content is allowed to take.',
      table: {
        category: 'Container',
        subcategory: 'MODIFIERS',
        type: { summary: "'content' | 'full'" },
        defaultValue: { summary: "'content'" },
      },
      control: 'select',
      options: ['content', 'full'],
    },
    as: {
      description: 'HTML element rendered as the root.',
      table: {
        category: 'Container',
        subcategory: 'ATTRIBUTES',
        type: { summary: 'keyof JSX.IntrinsicElements' },
        defaultValue: { summary: "'div'" },
      },
      control: 'text',
    },
  },
  render: args => (
    <Container {...args}>
      <Box p="space-24" bg="surface-default" borderRadius="radius-4">
        Resize the viewport to see the gutters change at 744px and 1280px.
      </Box>
    </Container>
  ),
};

export default meta;

type Story = StoryObj<ContainerProps>;

/** Default state of the component. */
export const Basic: Story = {};

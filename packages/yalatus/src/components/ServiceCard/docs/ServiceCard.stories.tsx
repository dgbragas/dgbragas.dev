import { Box } from '@dgbragas/yalatus/components';

import { ServiceCard } from '..';

import type { ServiceCardProps } from '../ServiceCard.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<ServiceCardProps> = {
  title: 'Components/ServiceCard',
  component: ServiceCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6162-1600',
    },
  },
  argTypes: {
    title: {
      description: 'Name of the service, in the heading plate.',
      table: { category: 'ServiceCard', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
    description: {
      description: 'What the service delivers.',
      table: { category: 'ServiceCard', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
    detail: {
      description: 'Supporting line at the bottom of the card.',
      table: { category: 'ServiceCard', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
  },
  args: {
    title: 'Design',
    description: 'Qualidade code-ready na construção das UIs',
    detail: 'Tokens organizados, componentes adaptativos e estrutura MCP-ready',
  },
  render: args => (
    <Box maxWidth="301px">
      <ServiceCard {...args} />
    </Box>
  ),
};

export default meta;

type Story = StoryObj<ServiceCardProps>;

/** Default state of the component. */
export const Basic: Story = {};

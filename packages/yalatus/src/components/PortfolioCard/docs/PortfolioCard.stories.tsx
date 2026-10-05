import { Box } from '@dgbragas/yalatus/components';

import { PortfolioCard } from '..';

import type { PortfolioCardProps } from '../PortfolioCard.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<PortfolioCardProps> = {
  title: 'Components/PortfolioCard',
  component: PortfolioCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6254-3154',
    },
  },
  argTypes: {
    href: {
      description: 'Destination of the project.',
      table: { category: 'PortfolioCard', subcategory: 'ATTRIBUTES', type: { summary: 'string' } },
      control: 'text',
    },
    cover: {
      description: 'Cover image of the project.',
      table: {
        category: 'PortfolioCard',
        subcategory: 'ATTRIBUTES',
        type: { summary: 'ReactNode' },
      },
      control: false,
    },
    dateTime: {
      description: 'Machine-readable date for the time element.',
      table: { category: 'PortfolioCard', subcategory: 'ATTRIBUTES', type: { summary: 'string' } },
      control: 'text',
    },
    tag: {
      description: 'Category shown as a tag above the title.',
      table: { category: 'PortfolioCard', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
    title: {
      description: 'Title of the project.',
      table: { category: 'PortfolioCard', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
    description: {
      description: 'Short description shown under the title.',
      table: { category: 'PortfolioCard', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
    date: {
      description: 'Publication date as people read it.',
      table: { category: 'PortfolioCard', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
  },
  args: {
    href: '#',
    cover: <img alt="" src="https://placehold.co/640x560/332d3c/332d3c.png" />,
    tag: 'Label',
    title: 'Introducing Loops',
    description:
      'Describe a recurring job in plain language and Linear Agent will run it on a schedule.',
    date: '20 jul 2026',
    dateTime: '2026-07-20',
  },
  render: args => (
    <Box maxWidth="320px">
      <PortfolioCard {...args} />
    </Box>
  ),
};

export default meta;

type Story = StoryObj<PortfolioCardProps>;

/** Default state of the component. */
export const Basic: Story = {};

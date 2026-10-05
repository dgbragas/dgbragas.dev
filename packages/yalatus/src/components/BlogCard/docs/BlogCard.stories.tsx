import { BlogCard } from '..';

import type { BlogCardProps } from '../BlogCard.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<BlogCardProps> = {
  title: 'Components/BlogCard',
  component: BlogCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6168-1306',
    },
  },
  argTypes: {
    expanded: {
      description: 'Wide layout with the cover on the left, used for the highlighted post.',
      table: {
        category: 'BlogCard',
        subcategory: 'MODIFIERS',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    href: {
      description: 'Destination of the post.',
      table: { category: 'BlogCard', subcategory: 'ATTRIBUTES', type: { summary: 'string' } },
      control: 'text',
    },
    dateTime: {
      description: 'Machine-readable date for the time element.',
      table: { category: 'BlogCard', subcategory: 'ATTRIBUTES', type: { summary: 'string' } },
      control: 'text',
    },
    cover: {
      description: 'Cover image, rendered only when expanded.',
      table: { category: 'BlogCard', subcategory: 'ATTRIBUTES', type: { summary: 'ReactNode' } },
      control: false,
    },
    title: {
      description: 'Title of the post.',
      table: { category: 'BlogCard', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
    description: {
      description: 'Summary shown under the title.',
      table: { category: 'BlogCard', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
    date: {
      description: 'Publication date as people read it.',
      table: { category: 'BlogCard', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
    category: {
      description: 'Section or tag of the post, shown after the date.',
      table: { category: 'BlogCard', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
  },
  args: {
    href: '#',
    title: 'Introducing Loops',
    description:
      'Describe a recurring job in plain language and Linear Agent will run it on a schedule.',
    date: '27 jul 2026',
    dateTime: '2026-07-27',
    category: 'Security',
  },
};

export default meta;

type Story = StoryObj<BlogCardProps>;

/** Default state of the component. */
export const Basic: Story = {};

/** The highlighted post, with the cover beside the brief. */
export const Expanded: Story = {
  args: {
    expanded: true,
    cover: <img alt="" src="https://placehold.co/560x256/332d3c/332d3c.png" />,
  },
};

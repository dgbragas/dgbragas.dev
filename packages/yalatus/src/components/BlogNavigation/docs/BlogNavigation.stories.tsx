import { Stack } from '@dgbragas/yalatus/components';

import { BlogNavigation } from '..';

import type { BlogNavigationProps } from '../BlogNavigation.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<BlogNavigationProps> = {
  title: 'Components/BlogNavigation',
  component: BlogNavigation,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6327-3309',
    },
  },
  argTypes: {
    direction: {
      description: 'Which neighbour the link leads to.',
      table: {
        category: 'BlogNavigation',
        subcategory: 'MODIFIERS',
        type: { summary: "'previous' | 'next'" },
        defaultValue: { summary: "'next'" },
      },
      control: 'select',
      options: ['previous', 'next'],
    },
    href: {
      description: 'Destination of the neighbouring post.',
      table: { category: 'BlogNavigation', subcategory: 'ATTRIBUTES', type: { summary: 'string' } },
      control: 'text',
    },
    dateTime: {
      description: 'Machine-readable date for the time element.',
      table: { category: 'BlogNavigation', subcategory: 'ATTRIBUTES', type: { summary: 'string' } },
      control: 'text',
    },
    title: {
      description: 'Title of the neighbouring post.',
      table: { category: 'BlogNavigation', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
    date: {
      description: 'Publication date as people read it.',
      table: { category: 'BlogNavigation', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
    previousLabel: {
      description: 'Word announced for the previous post.',
      table: {
        category: 'BlogNavigation',
        subcategory: 'MESSAGES',
        type: { summary: 'string' },
        defaultValue: { summary: "'Anterior'" },
      },
      control: 'text',
    },
    nextLabel: {
      description: 'Word announced for the next post.',
      table: {
        category: 'BlogNavigation',
        subcategory: 'MESSAGES',
        type: { summary: 'string' },
        defaultValue: { summary: "'Próximo'" },
      },
      control: 'text',
    },
  },
  args: {
    href: '#',
    title: 'React Native: nunca vi, nem comi, eu só ouço falar',
    date: '18 set 2019',
    dateTime: '2019-09-18',
  },
};

export default meta;

type Story = StoryObj<BlogNavigationProps>;

/** Default state of the component. */
export const Basic: Story = {};

/** Previous and next posts side by side at the end of an article. */
export const Pair: Story = {
  render: args => (
    <Stack orientation="horizontal" justifyContent="space-between" gap="space-16">
      <BlogNavigation {...args} direction="previous" />
      <BlogNavigation {...args} direction="next" />
    </Stack>
  ),
};

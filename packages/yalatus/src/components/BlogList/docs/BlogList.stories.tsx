import { Box } from '@dgbragas/yalatus/components';

import { BlogList } from '..';

import type { BlogListProps } from '../BlogList.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<BlogListProps> = {
  title: 'Components/BlogList',
  component: BlogList,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6327-3297',
    },
  },
  argTypes: {
    ordered: {
      description: 'Numbers the entries instead of marking them with the brand rule.',
      table: {
        category: 'BlogList',
        subcategory: 'MODIFIERS',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    items: {
      description: 'Entries of the list in reading order.',
      table: { category: 'BlogList', subcategory: 'ATTRIBUTES', type: { summary: 'ReactNode[]' } },
      control: 'object',
    },
  },
  args: {
    items: [
      'Uma série de entrevistas com o pessoal de engenharia e de People & Culture para entender aspectos técnicos e culturais mais específicos;',
      'Levantamento das ferramentas usadas em cada etapa do processo;',
      'Consolidação dos achados em um documento compartilhado.',
    ],
  },
  render: args => (
    <Box pl="space-48" maxWidth="600px">
      <BlogList {...args} />
    </Box>
  ),
};

export default meta;

type Story = StoryObj<BlogListProps>;

/** Default state of the component. */
export const Basic: Story = {};

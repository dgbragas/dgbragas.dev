import { Blockquote } from '..';

import type { BlockquoteProps } from '../Blockquote.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<BlockquoteProps> = {
  title: 'Components/Blockquote',
  component: Blockquote,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6317-3574',
    },
  },
  argTypes: {
    author: {
      description: 'Who said it, shown under the quote.',
      table: { category: 'Blockquote', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
    cite: {
      description: 'Source of the quote, read by assistive technology.',
      table: { category: 'Blockquote', subcategory: 'ATTRIBUTES', type: { summary: 'string' } },
      control: 'text',
    },
    children: {
      description: 'The quoted text.',
      table: { category: 'Blockquote', subcategory: 'MESSAGES', type: { summary: 'ReactNode' } },
      control: 'text',
    },
  },
  args: {
    children:
      'Nessa etapa, buscamos entender se a pessoa já teve contato com tecnologias ou problemas similares com os que estamos trabalhando.',
    author: 'Guilherme Camillo - Feb Hey Jye',
  },
};

export default meta;

type Story = StoryObj<BlockquoteProps>;

/** Default state of the component. */
export const Basic: Story = {};

import { Text } from '@dgbragas/yalatus/components';

import { CursorHint } from '..';

import type { CursorHintProps } from '../CursorHint.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<CursorHintProps> = {
  title: 'Components/CursorHint',
  component: CursorHint,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6255-3339',
    },
  },
  argTypes: {
    kind: {
      description: 'Whether the hint shows text or an image.',
      table: {
        category: 'CursorHint',
        subcategory: 'MODIFIERS',
        type: { summary: "'text' | 'image'" },
        defaultValue: { summary: "'text'" },
      },
      control: 'select',
      options: ['text', 'image'],
    },
    focusable: {
      description: 'Puts the wrapper in the tab order so keyboard users reach the hint.',
      table: {
        category: 'CursorHint',
        subcategory: 'BEHAVIOUR',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      control: 'boolean',
    },
    content: {
      description: 'Text shown next to the pointer.',
      table: { category: 'CursorHint', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
    children: {
      description: 'Element the hint belongs to.',
      table: { category: 'CursorHint', subcategory: 'ATTRIBUTES', type: { summary: 'ReactNode' } },
      control: false,
    },
  },
  args: {
    content: 'Desenvolvedor & Designer de Interfaces de São Paulo — Grande ABC',
    children: <Text kind="heading-4">o dg do ds</Text>,
  },
};

export default meta;

type Story = StoryObj<CursorHintProps>;

/** Default state of the component. */
export const Basic: Story = {};

/** An image follows the pointer over a word of the text. */
export const Image: Story = {
  args: {
    kind: 'image',
    src: 'https://placehold.co/192x128/332d3c/efeef1.png?text=Horizon',
    alt: 'Captura do jogo Horizon',
    children: <Text kind="body-lg">Apaixonado por games, carinho especial por Horizon.</Text>,
  },
};

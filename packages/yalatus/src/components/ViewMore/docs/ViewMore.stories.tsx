import { action } from 'storybook/actions';

import { ViewMore } from '..';

import type { ViewMoreProps } from '../ViewMore.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<ViewMoreProps> = {
  title: 'Components/ViewMore',
  component: ViewMore,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6254-3167',
    },
  },
  argTypes: {
    disabled: {
      description: 'Blocks interaction, for instance while more items load.',
      table: {
        category: 'ViewMore',
        subcategory: 'MODIFIERS',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    as: {
      description:
        'Element rendered: a button that loads more in place or an anchor to the full archive.',
      table: {
        category: 'ViewMore',
        subcategory: 'ATTRIBUTES',
        type: { summary: "'button' | 'a'" },
        defaultValue: { summary: "'button'" },
      },
      control: 'select',
      options: ['button', 'a'],
    },
    href: {
      description: 'Destination when rendered as an anchor.',
      table: { category: 'ViewMore', subcategory: 'ATTRIBUTES', type: { summary: 'string' } },
      control: 'text',
    },
    children: {
      description: 'Label of the control.',
      table: { category: 'ViewMore', subcategory: 'MESSAGES', type: { summary: 'ReactNode' } },
      control: 'text',
    },
    onClick: {
      description: 'Called when the control is activated by pointer or keyboard.',
      table: {
        category: 'ViewMore',
        subcategory: 'EVENTS',
        type: { summary: 'MouseEventHandler' },
      },
      control: false,
    },
  },
  args: {
    children: 'Ver acervo completo',
    onClick: action('🔥 onClick'),
  },
};

export default meta;

type Story = StoryObj<ViewMoreProps>;

/** Default state of the component. */
export const Basic: Story = {};

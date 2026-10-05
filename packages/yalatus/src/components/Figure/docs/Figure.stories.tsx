import { Figure } from '..';

import type { FigureProps } from '../Figure.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<FigureProps> = {
  title: 'Components/Figure',
  component: Figure,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6327-3308',
    },
  },
  argTypes: {
    src: {
      description: 'Image source.',
      table: { category: 'Figure', subcategory: 'ATTRIBUTES', type: { summary: 'string' } },
      control: 'text',
    },
    alt: {
      description: 'Alternative text of the image; empty when decorative.',
      table: { category: 'Figure', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
    caption: {
      description: 'Description shown under the image.',
      table: { category: 'Figure', subcategory: 'MESSAGES', type: { summary: 'ReactNode' } },
      control: 'text',
    },
    captionLabel: {
      description: 'Hashtag that opens the caption.',
      table: {
        category: 'Figure',
        subcategory: 'MESSAGES',
        type: { summary: 'string' },
        defaultValue: { summary: "'#PraCegoVer'" },
      },
      control: 'text',
    },
    loading: {
      description: 'Browser loading strategy of the image.',
      table: {
        category: 'Figure',
        subcategory: 'BEHAVIOUR',
        type: { summary: "'lazy' | 'eager'" },
        defaultValue: { summary: "'lazy'" },
      },
      control: 'select',
      options: ['lazy', 'eager'],
    },
  },
  args: {
    src: 'https://placehold.co/600x692/332d3c/332d3c.png',
    alt: 'Área reservada para a imagem do post',
    caption:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid eveniet repellendus corrupti officia impedit ab voluptates quibusdam aperiam.',
    width: 600,
    height: 692,
  },
};

export default meta;

type Story = StoryObj<FigureProps>;

/** Default state of the component. */
export const Basic: Story = {};

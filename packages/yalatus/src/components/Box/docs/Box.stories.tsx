import { Box } from '..';

import type { BoxProps } from '../Box.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<BoxProps> = {
  title: 'Primitives/Box',
  component: Box,
  argTypes: {
    as: {
      description: 'HTML element rendered as the root.',
      table: {
        category: 'Box',
        subcategory: 'ATTRIBUTES',
        type: { summary: 'keyof JSX.IntrinsicElements' },
        defaultValue: { summary: "'div'" },
      },
      control: 'text',
    },
    p: {
      description: 'Padding on every side, as a space token, number in px or CSS length.',
      table: {
        category: 'Box',
        subcategory: 'MODIFIERS',
        type: { summary: 'Responsive<SpaceValue>' },
      },
      control: 'text',
    },
    gap: {
      description: 'Gap between flex children.',
      table: {
        category: 'Box',
        subcategory: 'MODIFIERS',
        type: { summary: 'Responsive<SpaceValue>' },
      },
      control: 'text',
    },
    bg: {
      description: 'Background colour token.',
      table: { category: 'Box', subcategory: 'MODIFIERS', type: { summary: 'ColorValue' } },
      control: 'text',
    },
    borderRadius: {
      description: 'Corner radius token.',
      table: { category: 'Box', subcategory: 'MODIFIERS', type: { summary: 'RadiusValue' } },
      control: 'text',
    },
    children: {
      description: 'Content rendered inside the box.',
      table: { category: 'Box', subcategory: 'ATTRIBUTES', type: { summary: 'ReactNode' } },
      control: 'text',
    },
  },
  args: {
    p: 'space-24',
    bg: 'surface-default',
    borderRadius: 'radius-4',
    children: 'Box',
  },
};

export default meta;

type Story = StoryObj<BoxProps>;

/** Default state of the component. */
export const Basic: Story = {};

/** Padding that changes per breakpoint through CSS variables. */
export const Responsive: Story = {
  args: {
    p: { base: 'space-16', tablet: 'space-32', web: 'space-64' },
    children: 'Resize the viewport',
  },
};

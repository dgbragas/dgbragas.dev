import { Marquee } from '..';

import type { MarqueeProps } from '../Marquee.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<MarqueeProps> = {
  title: 'Components/Marquee',
  component: Marquee,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6240-1581',
    },
  },
  argTypes: {
    items: {
      description: 'Entries that scroll across the band.',
      table: { category: 'Marquee', subcategory: 'ATTRIBUTES', type: { summary: 'MarqueeItem[]' } },
      control: 'object',
    },
    label: {
      description: 'Accessible name of the band.',
      table: {
        category: 'Marquee',
        subcategory: 'MESSAGES',
        type: { summary: 'string' },
        defaultValue: { summary: "'Tecnologias e temas'" },
      },
      control: 'text',
    },
  },
  args: {
    items: [
      { icon: 'ai', label: 'AI Prompts', color: 'surface-warning' },
      { icon: 'mcp', label: 'MCP', color: 'surface-inverse' },
      { icon: 'code', label: 'Code Connect', color: 'surface-info' },
      { icon: 'figma', label: 'Figma', color: 'surface-accent-subtle' },
      { icon: 'design-system', label: 'Design System', color: 'surface-danger' },
      { icon: 'react', label: 'React', color: 'surface-info' },
      { icon: 'accessibility', label: 'Accessibility', color: 'surface-success' },
    ],
  },
};

export default meta;

type Story = StoryObj<MarqueeProps>;

/** Default state of the component. */
export const Basic: Story = {};

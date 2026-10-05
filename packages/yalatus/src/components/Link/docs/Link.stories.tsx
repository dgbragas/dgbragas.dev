import { action } from 'storybook/actions';

import { ICON_NAMES } from '@dgbragas/yalatus/components';

import { Link } from '..';

import type { LinkProps } from '../Link.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<LinkProps> = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6251-2016',
    },
  },
  argTypes: {
    disabled: {
      description: 'Removes the destination and interactivity while keeping the text visible.',
      table: {
        category: 'Link',
        subcategory: 'MODIFIERS',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    href: {
      description: 'Destination of the link.',
      table: { category: 'Link', subcategory: 'ATTRIBUTES', type: { summary: 'string' } },
      control: 'text',
    },
    trailingIcon: {
      description: 'Icon drawn after the text; false removes it.',
      table: {
        category: 'Link',
        subcategory: 'ATTRIBUTES',
        type: { summary: 'IconName | false' },
        defaultValue: { summary: "'arrow-right'" },
      },
      control: 'select',
      options: [false, ...ICON_NAMES],
    },
    target: {
      description: 'Browsing context of the destination.',
      table: { category: 'Link', subcategory: 'ATTRIBUTES', type: { summary: 'string' } },
      control: 'select',
      options: [undefined, '_self', '_blank'],
    },
    children: {
      description: 'Text of the link.',
      table: { category: 'Link', subcategory: 'MESSAGES', type: { summary: 'ReactNode' } },
      control: 'text',
    },
    onClick: {
      description: 'Called when the link is activated by pointer or keyboard.',
      table: { category: 'Link', subcategory: 'EVENTS', type: { summary: 'MouseEventHandler' } },
      control: false,
    },
  },
  args: {
    href: '#',
    children: 'Dê uma olhada no meu blog',
    onClick: action('🔥 onClick'),
  },
};

export default meta;

type Story = StoryObj<LinkProps>;

/** Default state of the component. */
export const Basic: Story = {};

import { action } from 'storybook/actions';

import { ICON_NAMES, Stack } from '@dgbragas/yalatus/components';

import { Button } from '..';

import type { ButtonProps } from '../Button.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6136-636',
    },
  },
  argTypes: {
    appearance: {
      description: 'Colour role of the button.',
      table: {
        category: 'Button',
        subcategory: 'MODIFIERS',
        type: { summary: "'accent' | 'neutral' | 'inverse'" },
        defaultValue: { summary: "'accent'" },
      },
      control: 'select',
      options: ['accent', 'neutral', 'inverse'],
    },
    kind: {
      description: 'Solid background or text only.',
      table: {
        category: 'Button',
        subcategory: 'MODIFIERS',
        type: { summary: "'default' | 'ghost'" },
        defaultValue: { summary: "'default'" },
      },
      control: 'select',
      options: ['default', 'ghost'],
    },
    disabled: {
      description: 'Blocks pointer and keyboard interaction.',
      table: {
        category: 'Button',
        subcategory: 'MODIFIERS',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    as: {
      description: 'Element rendered: a native button or an anchor for navigation.',
      table: {
        category: 'Button',
        subcategory: 'ATTRIBUTES',
        type: { summary: "'button' | 'a'" },
        defaultValue: { summary: "'button'" },
      },
      control: 'select',
      options: ['button', 'a'],
    },
    leadIcon: {
      description: 'Icon drawn before the label.',
      table: { category: 'Button', subcategory: 'ATTRIBUTES', type: { summary: 'IconName' } },
      control: 'select',
      options: [undefined, ...ICON_NAMES],
    },
    trailingIcon: {
      description: 'Icon drawn after the label.',
      table: { category: 'Button', subcategory: 'ATTRIBUTES', type: { summary: 'IconName' } },
      control: 'select',
      options: [undefined, ...ICON_NAMES],
    },
    href: {
      description: 'Destination when rendered as an anchor.',
      table: { category: 'Button', subcategory: 'ATTRIBUTES', type: { summary: 'string' } },
      control: 'text',
    },
    children: {
      description: 'Label of the button.',
      table: { category: 'Button', subcategory: 'MESSAGES', type: { summary: 'ReactNode' } },
      control: 'text',
    },
    onClick: {
      description: 'Called when the button is activated by pointer or keyboard.',
      table: { category: 'Button', subcategory: 'EVENTS', type: { summary: 'MouseEventHandler' } },
      control: false,
    },
  },
  args: {
    children: 'Veja meus cases',
    onClick: action('🔥 onClick'),
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

/** Default state of the component. */
export const Basic: Story = {};

/** Every appearance and kind side by side, with the inverse variants over an inverted surface. */
export const Matrix: Story = {
  render: args => (
    <Stack gap="space-16">
      {(['default', 'ghost'] as const).map(kind => (
        <Stack key={kind} orientation="horizontal" gap="space-16" alignItems="center">
          <Button {...args} kind={kind} appearance="accent" />
          <Button {...args} kind={kind} appearance="neutral" />
          <Stack className="yl-theme-inverse" p="space-8" borderRadius="radius-4">
            <Button {...args} kind={kind} appearance="inverse" />
          </Stack>
          <Button {...args} kind={kind} disabled />
        </Stack>
      ))}
    </Stack>
  ),
};

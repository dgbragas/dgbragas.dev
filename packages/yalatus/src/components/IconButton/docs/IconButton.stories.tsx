import { action } from 'storybook/actions';

import { ICON_NAMES, Stack } from '@dgbragas/yalatus/components';

import { IconButton } from '..';

import type { IconButtonProps } from '../IconButton.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<IconButtonProps> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6251-2406',
    },
  },
  argTypes: {
    appearance: {
      description: 'Colour role of the button.',
      table: {
        category: 'IconButton',
        subcategory: 'MODIFIERS',
        type: { summary: "'accent' | 'neutral' | 'inverse'" },
        defaultValue: { summary: "'accent'" },
      },
      control: 'select',
      options: ['accent', 'neutral', 'inverse'],
    },
    kind: {
      description: 'Solid background or icon only.',
      table: {
        category: 'IconButton',
        subcategory: 'MODIFIERS',
        type: { summary: "'default' | 'ghost'" },
        defaultValue: { summary: "'default'" },
      },
      control: 'select',
      options: ['default', 'ghost'],
    },
    size: {
      description: 'Square size: small 32px, medium 40px, large 48px.',
      table: {
        category: 'IconButton',
        subcategory: 'MODIFIERS',
        type: { summary: "'small' | 'medium' | 'large'" },
        defaultValue: { summary: "'medium'" },
      },
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      description: 'Blocks pointer and keyboard interaction.',
      table: {
        category: 'IconButton',
        subcategory: 'MODIFIERS',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    icon: {
      description: 'Icon drawn inside the button.',
      table: { category: 'IconButton', subcategory: 'ATTRIBUTES', type: { summary: 'IconName' } },
      control: 'select',
      options: ICON_NAMES,
    },
    as: {
      description: 'Element rendered: a native button or an anchor for navigation.',
      table: {
        category: 'IconButton',
        subcategory: 'ATTRIBUTES',
        type: { summary: "'button' | 'a'" },
        defaultValue: { summary: "'button'" },
      },
      control: 'select',
      options: ['button', 'a'],
    },
    label: {
      description: 'Accessible name announced in place of a visible label.',
      table: { category: 'IconButton', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
    onClick: {
      description: 'Called when the button is activated by pointer or keyboard.',
      table: {
        category: 'IconButton',
        subcategory: 'EVENTS',
        type: { summary: 'MouseEventHandler' },
      },
      control: false,
    },
  },
  args: {
    icon: 'search',
    label: 'Buscar',
    onClick: action('🔥 onClick'),
  },
};

export default meta;

type Story = StoryObj<IconButtonProps>;

/** Default state of the component. */
export const Basic: Story = {};

/** Every appearance, kind and size side by side. */
export const Matrix: Story = {
  render: args => (
    <Stack gap="space-16">
      {(['default', 'ghost'] as const).map(kind => (
        <Stack key={kind} orientation="horizontal" gap="space-16" alignItems="center">
          {(['small', 'medium', 'large'] as const).map(size => (
            <IconButton key={size} {...args} kind={kind} size={size} />
          ))}
          <IconButton {...args} kind={kind} appearance="neutral" />
          <Stack className="yl-theme-inverse" p="space-8" borderRadius="radius-4">
            <IconButton {...args} kind={kind} appearance="inverse" />
          </Stack>
          <IconButton {...args} kind={kind} disabled />
        </Stack>
      ))}
    </Stack>
  ),
};

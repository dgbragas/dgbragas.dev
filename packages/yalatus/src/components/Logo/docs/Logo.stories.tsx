import { Stack } from '@dgbragas/yalatus/components';

import { Logo } from '..';

import type { LogoProps } from '../Logo.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<LogoProps> = {
  title: 'Foundations/Logo',
  component: Logo,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6246-1807',
    },
  },
  argTypes: {
    appearance: {
      description: 'Drawing of the mark.',
      table: {
        category: 'Logo',
        subcategory: 'MODIFIERS',
        type: { summary: "'clearspace' | 'filled' | 'colored'" },
        defaultValue: { summary: "'clearspace'" },
      },
      control: 'select',
      options: ['clearspace', 'filled', 'colored'],
    },
    decorative: {
      description: 'Hides the mark from assistive technology.',
      table: {
        category: 'Logo',
        subcategory: 'BEHAVIOUR',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    label: {
      description: 'Accessible name announced for the mark.',
      table: {
        category: 'Logo',
        subcategory: 'MESSAGES',
        type: { summary: 'string' },
        defaultValue: { summary: "'dgbragas'" },
      },
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<LogoProps>;

/** Default state of the component. */
export const Basic: Story = {};

/** The three drawings side by side. */
export const Appearances: Story = {
  render: () => (
    <Stack orientation="horizontal" gap="space-32" alignItems="center">
      <Logo appearance="clearspace" />
      <Logo appearance="filled" />
      <Logo appearance="colored" />
    </Stack>
  ),
};

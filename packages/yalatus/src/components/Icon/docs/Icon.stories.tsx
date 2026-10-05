import { Box, Stack, Text } from '@dgbragas/yalatus/components';

import { Icon, ICON_NAMES } from '..';

import type { IconProps } from '../Icon.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<IconProps> = {
  title: 'Primitives/Icon',
  component: Icon,
  argTypes: {
    name: {
      description: 'Icon to draw, by file name in the Yalatus icon set.',
      table: { category: 'Icon', subcategory: 'ATTRIBUTES', type: { summary: 'IconName' } },
      control: 'select',
      options: ICON_NAMES,
    },
    size: {
      description: 'Rendered size: smallest 16px, small 20px, medium 24px, large 32px.',
      table: {
        category: 'Icon',
        subcategory: 'MODIFIERS',
        type: { summary: "'smallest' | 'small' | 'medium' | 'large'" },
        defaultValue: { summary: "'medium'" },
      },
      control: 'select',
      options: ['smallest', 'small', 'medium', 'large'],
    },
    color: {
      description: 'Colour token; inherit takes the text colour of the parent.',
      table: {
        category: 'Icon',
        subcategory: 'MODIFIERS',
        type: { summary: "ColorValue | 'inherit'" },
        defaultValue: { summary: "'inherit'" },
      },
      control: 'text',
    },
    label: {
      description: 'Accessible name; without it the icon is decorative and hidden.',
      table: { category: 'Icon', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
  },
  args: {
    name: 'search',
  },
};

export default meta;

type Story = StoryObj<IconProps>;

/** Default state of the component. */
export const Basic: Story = {};

/** Every icon of the set with its name. */
export const Gallery: Story = {
  render: () => (
    <Box
      display="grid"
      gap="space-16"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}
    >
      {ICON_NAMES.map(name => (
        <Stack
          key={name}
          center
          gap="space-8"
          p="space-12"
          bg="surface-default"
          borderRadius="radius-4"
        >
          <Icon name={name} />
          <Text kind="caption" align="center">
            {name}
          </Text>
        </Stack>
      ))}
    </Box>
  ),
};

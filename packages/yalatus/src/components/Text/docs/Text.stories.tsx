import { Stack } from '@dgbragas/yalatus/components';
import { TEXT_KEYS } from '@dgbragas/yalatus/tokens/names';

import { Text } from '..';

import type { TextProps } from '../Text.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<TextProps> = {
  title: 'Primitives/Text',
  component: Text,
  argTypes: {
    kind: {
      description: 'Typographic style from the Yalatus type scale.',
      table: {
        category: 'Text',
        subcategory: 'MODIFIERS',
        type: { summary: 'TextKey' },
        defaultValue: { summary: "'body'" },
      },
      control: 'select',
      options: TEXT_KEYS,
    },
    color: {
      description: 'Text colour token; inherit keeps the parent colour.',
      table: {
        category: 'Text',
        subcategory: 'MODIFIERS',
        type: { summary: "ColorValue | 'inherit'" },
        defaultValue: { summary: "'inherit'" },
      },
      control: 'text',
    },
    align: {
      description: 'Horizontal alignment of the text.',
      table: {
        category: 'Text',
        subcategory: 'MODIFIERS',
        type: { summary: "'start' | 'center' | 'end'" },
      },
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    truncate: {
      description: 'Prevents wrapping and clips the overflow with an ellipsis.',
      table: {
        category: 'Text',
        subcategory: 'MODIFIERS',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    element: {
      description: 'HTML element rendered; defaults to the semantic element of the chosen kind.',
      table: { category: 'Text', subcategory: 'ATTRIBUTES', type: { summary: 'TextTag' } },
      control: 'text',
    },
    children: {
      description: 'Text content.',
      table: { category: 'Text', subcategory: 'ATTRIBUTES', type: { summary: 'ReactNode' } },
      control: 'text',
    },
  },
  args: {
    children: 'Soluciono problemas através de design e código',
  },
};

export default meta;

type Story = StoryObj<TextProps>;

/** Default state of the component. */
export const Basic: Story = {};

/** Every style of the type scale with its default element. */
export const TypeScale: Story = {
  render: () => (
    <Stack gap="space-16">
      {TEXT_KEYS.map(kind => (
        <Text key={kind} kind={kind}>
          {kind}
        </Text>
      ))}
    </Stack>
  ),
};

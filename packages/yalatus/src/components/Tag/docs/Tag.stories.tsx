import { Stack } from '@dgbragas/yalatus/components';

import { Tag } from '..';

import type { TagProps } from '../Tag.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const APPEARANCES = [
  'brand',
  'neutral',
  'danger',
  'warning',
  'success',
  'informative',
  'inverse',
] as const;

const meta: Meta<TagProps> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6140-5060',
    },
  },
  argTypes: {
    appearance: {
      description: 'Colour role of the tag.',
      table: {
        category: 'Tag',
        subcategory: 'MODIFIERS',
        type: { summary: APPEARANCES.map(item => `'${item}'`).join(' | ') },
        defaultValue: { summary: "'brand'" },
      },
      control: 'select',
      options: APPEARANCES,
    },
    kind: {
      description: 'Outlined or filled background.',
      table: {
        category: 'Tag',
        subcategory: 'MODIFIERS',
        type: { summary: "'outline' | 'filled'" },
        defaultValue: { summary: "'outline'" },
      },
      control: 'select',
      options: ['outline', 'filled'],
    },
    children: {
      description: 'Label of the tag.',
      table: { category: 'Tag', subcategory: 'MESSAGES', type: { summary: 'ReactNode' } },
      control: 'text',
    },
  },
  args: {
    children: 'Design System',
  },
};

export default meta;

type Story = StoryObj<TagProps>;

/** Default state of the component. */
export const Basic: Story = {};

/** Every appearance in both kinds. */
export const Matrix: Story = {
  render: args => (
    <Stack gap="space-16">
      {(['outline', 'filled'] as const).map(kind => (
        <Stack key={kind} orientation="horizontal" gap="space-8" flexWrap="wrap">
          {APPEARANCES.map(appearance => (
            <Tag key={appearance} {...args} appearance={appearance} kind={kind}>
              {appearance}
            </Tag>
          ))}
        </Stack>
      ))}
    </Stack>
  ),
};

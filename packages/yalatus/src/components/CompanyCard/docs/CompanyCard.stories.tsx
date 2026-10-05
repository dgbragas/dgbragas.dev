import { Box, Icon, Stack } from '@dgbragas/yalatus/components';

import { CompanyCard } from '..';

import type { CompanyCardProps } from '../CompanyCard.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<CompanyCardProps> = {
  title: 'Components/CompanyCard',
  component: CompanyCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6156-1231',
    },
  },
  argTypes: {
    color: {
      description:
        'Background of the plate; brand colours outside the tokens are accepted as CSS values.',
      table: {
        category: 'CompanyCard',
        subcategory: 'MODIFIERS',
        type: { summary: 'ColorValue' },
        defaultValue: { summary: "'surface-accent-subtle'" },
      },
      control: 'color',
    },
    logo: {
      description: 'Logo of the company, drawn inside the plate.',
      table: { category: 'CompanyCard', subcategory: 'ATTRIBUTES', type: { summary: 'ReactNode' } },
      control: false,
    },
    name: {
      description: 'Name of the company.',
      table: { category: 'CompanyCard', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
    position: {
      description: 'Position held there.',
      table: { category: 'CompanyCard', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
    period: {
      description: 'Period of the position as people read it.',
      table: { category: 'CompanyCard', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
  },
  args: {
    name: 'Caju Benefícios',
    position: 'Senior Front-end Developer',
    period: 'Agosto 2025 → Atualmente',
    color: '#e80837',
    logo: <Icon name="design-system" size="large" />,
  },
  render: args => (
    <Box as="ul" maxWidth="442px" p={0}>
      <CompanyCard {...args} />
    </Box>
  ),
};

export default meta;

type Story = StoryObj<CompanyCardProps>;

/** Default state of the component. */
export const Basic: Story = {};

/** The experience list of the about page. */
export const Experience: Story = {
  render: args => (
    <Stack as="ul" gap="space-32" maxWidth="442px" p={0}>
      <CompanyCard {...args} />
      <CompanyCard
        {...args}
        name="‘Arcotech’ by Arco Educação"
        position="Remote Software Engineer"
        period="Setembro 2021 → Janeiro 2025"
        color="#f05a41"
      />
      <CompanyCard
        {...args}
        name="Studos"
        position="Remote Front-end Engineer"
        period="Janeiro 2021 → Setembro 2021"
        color="#349df7"
      />
    </Stack>
  ),
};

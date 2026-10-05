import { Stack } from '@dgbragas/yalatus/components';

import { BigNumber } from '..';

import type { BigNumberProps } from '../BigNumber.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<BigNumberProps> = {
  title: 'Components/BigNumber',
  component: BigNumber,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WvwTGSsP8wjfW5IBAC0IJq/-dgbragas-ui?node-id=6031-552',
    },
  },
  argTypes: {
    value: {
      description: 'Number the counter animates to.',
      table: { category: 'BigNumber', subcategory: 'ATTRIBUTES', type: { summary: 'number' } },
      control: 'number',
    },
    prefix: {
      description: 'Text drawn before the number.',
      table: { category: 'BigNumber', subcategory: 'ATTRIBUTES', type: { summary: 'string' } },
      control: 'text',
    },
    suffix: {
      description: 'Text drawn after the number.',
      table: { category: 'BigNumber', subcategory: 'ATTRIBUTES', type: { summary: 'string' } },
      control: 'text',
    },
    decimals: {
      description: 'Decimal places kept while formatting.',
      table: {
        category: 'BigNumber',
        subcategory: 'ATTRIBUTES',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
      control: 'number',
    },
    locale: {
      description: 'BCP 47 locale used to format the number.',
      table: {
        category: 'BigNumber',
        subcategory: 'ATTRIBUTES',
        type: { summary: 'string' },
        defaultValue: { summary: "'pt-BR'" },
      },
      control: 'text',
    },
    label: {
      description: 'What the number measures, shown under it.',
      table: { category: 'BigNumber', subcategory: 'MESSAGES', type: { summary: 'string' } },
      control: 'text',
    },
  },
  args: {
    value: 92,
    suffix: '%',
    label: 'de adoção média do design system',
  },
};

export default meta;

type Story = StoryObj<BigNumberProps>;

/** Default state of the component. */
export const Basic: Story = {};

/** The five numbers of the about page counting side by side. */
export const Row: Story = {
  render: () => (
    <Stack orientation="horizontal" gap="space-48" flexWrap="wrap">
      <BigNumber value={92} suffix="%" label="de adoção média do design system" />
      <BigNumber value={4} prefix="+" suffix="M" label="usuários impactados" />
      <BigNumber value={16} prefix="+" label="marcas atendidas nos projetos" />
      <BigNumber value={8} prefix="+" label="anos no mercado de tecnologia" />
      <BigNumber value={6} prefix="+" label="empresas trabalhadas" />
    </Stack>
  ),
};

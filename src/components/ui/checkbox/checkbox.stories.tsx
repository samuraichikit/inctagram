import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '@/components/ui/checkbox'

const meta = {
  argTypes: {
    disabled: {
      control: { type: 'radio' },
      options: [true, false],
    },
  },
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Def: Story = {}

export const WithLabel: Story = {
  args: {
    label: 'checkbox label',
  },
}
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
export const DisabledWithLabel: Story = {
  args: {
    disabled: true,
    label: 'checkbox label',
  },
}

export const WithLabelAndWidthErrorMessage: Story = {
  args: {
    errorMessage: 'Some error',
    label: 'checkbox label',
  },
}

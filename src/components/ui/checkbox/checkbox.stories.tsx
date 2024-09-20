import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox/checkbox'

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

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

export const Controlled: Story = {
  render: args => {
    const [checked, setChecked] = useState(false)

    return (
      <Checkbox
        {...args}
        checked={checked}
        label={'Controlled'}
        onChange={() => setChecked(!checked)}
      />
    )
  },
}

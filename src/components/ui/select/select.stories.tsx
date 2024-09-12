import { Select } from '@/components/ui/select'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Select-box',
    options: [
      { label: 'banana', value: 'banana' },
      { label: 'milk', value: 'milk' },
      { label: 'bread', value: 'bread' },
    ],
  },
}

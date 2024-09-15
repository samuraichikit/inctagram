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
      { label: 'Select-box-1', value: 'Select-box-1' },
      { label: 'Select-box-2', value: 'Select-box-2' },
      { label: 'Select-box-3', value: 'Select-box-3' },
    ],
    placeholder: 'Select-box',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Select-box',
    options: [
      { label: 'Select-box-1', value: 'Select-box-1' },
      { label: 'Select-box-2', value: 'Select-box-2' },
      { label: 'Select-box-3', value: 'Select-box-3' },
    ],
    placeholder: 'Select-box',
  },
}

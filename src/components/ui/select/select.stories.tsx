import { Select } from '@/components/ui/select'
import { Meta, StoryObj } from '@storybook/react'

import { SelectItem } from './selectItem'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <SelectItem value={'Select-box-1'}>Select-box-1</SelectItem>
        <SelectItem value={'Select-box-2'}>Select-box-2</SelectItem>
        <SelectItem value={'Select-box-3'}>Select-box-3</SelectItem>
      </>
    ),
    label: 'Select-box',
    placeholder: 'Select-box',
  },
}

export const Disabled: Story = {
  args: {
    children: (
      <>
        <SelectItem value={'Select-box-1'}>Select-box-1</SelectItem>
        <SelectItem value={'Select-box-2'}>Select-box-2</SelectItem>
        <SelectItem value={'Select-box-2'}>Select-box-3</SelectItem>
      </>
    ),
    disabled: true,
    label: 'Select-box',
    placeholder: 'Select-box',
  },
}

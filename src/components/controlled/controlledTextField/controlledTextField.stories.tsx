import { ControlledTextField } from '@/components/controlled/controlledTextField'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: ControlledTextField,
  tags: ['autodocs'],
  title: 'Components/controlled/ControlledTextField',
} satisfies Meta<typeof ControlledTextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

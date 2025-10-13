import { Meta, StoryObj } from '@storybook/react'

import { FormTextArea } from './FormTextArea'

const meta = {
  component: FormTextArea,
  tags: ['autodocs'],
  title: 'Components/Controlled/FormTextArea',
} satisfies Meta<typeof FormTextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {} as any,
}

import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPassword } from './CreateNewPassword'

const meta = {
  argTypes: {},
  component: CreateNewPassword,
  tags: ['autodocs'],
  title: 'Components/Forms/CreateNewPassword',
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const CreateNewPasswordForm: Story = {
  args: {},
}

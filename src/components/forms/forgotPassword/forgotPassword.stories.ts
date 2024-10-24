import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPassword } from '@/components/forms/forgotPassword/ForgotPassword'

const meta = {
  argTypes: {},
  component: ForgotPassword,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Forms/ForgotPassword',
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const ForgotPasswordForm: Story = {
  args: {},
}

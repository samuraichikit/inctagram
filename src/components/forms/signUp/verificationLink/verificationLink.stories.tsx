import { VerificationLink } from '@/components/forms/signUp/verificationLink/VerificationLink'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: VerificationLink,
  tags: ['autodocs'],
  title: 'Components/Forms/SignUp/Verification Link',
} satisfies Meta<typeof VerificationLink>

export default meta
type Story = StoryObj<typeof meta>

export const Verification: Story = {
  args: {},
}

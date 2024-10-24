import { PrivacyPolicy } from '@/components/forms/signUp/privacyPolicy/PrivacyPolicy'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: PrivacyPolicy,
  tags: ['autodocs'],
  title: 'Components/Forms/SignUp/Privacy Policy',
} satisfies Meta<typeof PrivacyPolicy>

export default meta
type Story = StoryObj<typeof meta>

export const Policy: Story = {
  args: {},
}

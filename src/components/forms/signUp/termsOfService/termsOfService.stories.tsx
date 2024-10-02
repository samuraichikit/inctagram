import { TermsOfService } from '@/components/forms/signUp/termsOfService/TermsOfService'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: TermsOfService,
  tags: ['autodocs'],
  title: 'Components/Forms/SignUp/Terms Of Service',
} satisfies Meta<typeof TermsOfService>

export default meta
type Story = StoryObj<typeof meta>

export const Service: Story = {
  args: {},
}

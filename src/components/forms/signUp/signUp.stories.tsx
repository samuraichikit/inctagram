import { SignUp } from '@/components/forms/signUp/SignUp'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: SignUp,
  tags: ['autodocs'],
  title: 'Components/Forms/Sign Up',
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Registration: Story = {
  args: {},
}

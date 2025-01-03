import { ConfirmedEmail } from '@/components/forms/signUp/confirmedEmail/ConfirmedEmail'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: ConfirmedEmail,
  tags: ['autodocs'],
  title: 'Components/Forms/SignUp/ConfirmedEmail',
} satisfies Meta<typeof ConfirmedEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Confirmed: Story = {
  args: {},
}

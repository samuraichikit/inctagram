import { Meta, StoryObj } from '@storybook/react'

import { SignIn } from './SignIn'

const meta = {
  argTypes: {},
  component: SignIn,
  tags: ['autodocs'],
  title: 'Components/TextField',
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const LogIn: Story = {
  args: {},
}

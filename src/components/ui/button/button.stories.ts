import { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button/button'

const meta = {
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'outlined', 'text'],
    },
  },
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    disabled: false,
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    disabled: false,
  },
}

export const Outlined: Story = {
  args: {
    children: 'Outlined Button',
    variant: 'outlined',
    disabled: false,
  },
}

export const TextButton: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
    disabled: false,
  },
}

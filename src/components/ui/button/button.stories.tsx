import { Button } from '@/components/ui/button'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'outlined', 'text'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    disabled: false,
    variant: 'secondary',
  },
}

export const Outlined: Story = {
  args: {
    children: 'Outlined Button',
    disabled: false,
    variant: 'outlined',
  },
}

export const TextButton: Story = {
  args: {
    children: 'Text Button',
    disabled: false,
    variant: 'text',
  },
}

export const FullWidthButton: Story = {
  args: {
    children: 'Full Width Button',
    fullwidth: true,
  },
}

export const Link: Story = {
  args: {
    asChild: true,
    children: <a>link</a>,
  },
}

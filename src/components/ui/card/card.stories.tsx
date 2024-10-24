import { Meta, StoryObj } from '@storybook/react'

import { Card } from './Card'

const meta = {
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Card',
    style: {
      height: '100px',
      padding: '30px',
      width: '100px',
    },
  },
}

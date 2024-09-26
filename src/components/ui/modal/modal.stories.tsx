import { Meta, StoryObj } from '@storybook/react'

import { Modal } from './Modal'

const meta = {
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

type Story = StoryObj<typeof meta>
export default meta

export const Default: Story = {
  args: {
    children: <div>Transaction failed. Please, write to support</div>,
    open: true,
    title: 'Title',
  },
}

import { Button } from '@/components/ui/button'
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
    children: (
      <div style={{ padding: '24px' }}>
        Transaction failed. Please, write to support Transaction failed. Please, write to support
        Transaction failed. Please, write to supportTransaction failed.
      </div>
    ),
    title: 'Title',
    trigger: <Button variant={'primary'}>Click to open modal</Button>,
  },
}

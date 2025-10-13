import type { Meta, StoryObj } from '@storybook/react'

import { NotificationsDropDown } from '@/components/notificationDropdown/notificationsDropDown'

const meta = {
  argTypes: {},
  component: NotificationsDropDown,
  tags: ['autodocs'],
  title: 'Components/NotificationsDropDown',
} satisfies Meta<typeof NotificationsDropDown>

export default meta
type Story = StoryObj<typeof meta>

export const OpenNotificationDropdown: Story = {
  args: {
    notifications: [
      { createdAt: '123', id: Number(new Date()), isRead: false, message: 'Lorem ipsum' },
      { createdAt: '142', id: Number(new Date()), isRead: true, message: 'Lorem ipsum' },
      { createdAt: '126', id: Number(new Date()), isRead: false, message: 'Lorem ipsum' },
    ],
  },
}

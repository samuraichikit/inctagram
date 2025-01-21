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
    notifications: ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
  },
}

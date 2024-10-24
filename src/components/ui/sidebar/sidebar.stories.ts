import type { Meta, StoryObj } from '@storybook/react'

import { Sidebar } from './Sidebar'

const meta = {
  argTypes: {},
  component: Sidebar,
  tags: ['autodocs'],
  title: 'Components/Sidebar',
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const SidebarStory: Story = {
  args: {},
}

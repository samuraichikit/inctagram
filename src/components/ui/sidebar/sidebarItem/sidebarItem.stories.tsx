import type { Meta, StoryObj } from '@storybook/react'

import { HomeOutlineIcon } from '@/assets/icons/HomeOutline'

import { SidebarItem } from './SidebarItem'

const meta = {
  argTypes: {},
  component: SidebarItem,
  tags: ['autodocs'],
  title: 'Components/Sidebar/SidebarItem',
} satisfies Meta<typeof SidebarItem>

export default meta
type Story = StoryObj<typeof meta>

export const SidebarItemStory: Story = {
  args: {
    children: (
      <>
        <HomeOutlineIcon /> Home
      </>
    ),
    href: '#',
  },
}
export const DisabledSidebarItemStory: Story = {
  args: {
    children: (
      <>
        <HomeOutlineIcon /> Home
      </>
    ),
    disabled: true,
    href: '#',
  },
}

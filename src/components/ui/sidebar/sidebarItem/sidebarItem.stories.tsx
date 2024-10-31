import type { Meta, StoryObj } from '@storybook/react'

import { HomeOutlineIcon } from '@/assets/icons/HomeOutline'

import { Typography } from '../../typography'
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

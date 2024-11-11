import type { Meta, StoryObj } from '@storybook/react'

import { ProfileSettingsBar } from './ProfileSettingsBar'

const meta = {
  argTypes: {},
  component: ProfileSettingsBar,
  tags: ['autodocs'],
  title: 'Components/ProfileSettingsBar',
} satisfies Meta<typeof ProfileSettingsBar>

export default meta
type Story = StoryObj<typeof meta>

export const ProfileStory: Story = {
  args: {},
}

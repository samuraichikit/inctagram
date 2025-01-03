import type { Meta, StoryObj } from '@storybook/react'

import { GeneralSettings } from '@/components/forms/generalSettings'

const meta = {
  argTypes: {},
  component: GeneralSettings,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Forms/GeneralSettings',
} satisfies Meta<typeof GeneralSettings>

export default meta
type Story = StoryObj<typeof meta>

export const GeneralSettingsForm: Story = {
  args: {},
}

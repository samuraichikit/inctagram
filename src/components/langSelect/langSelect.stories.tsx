import type { Meta, StoryObj } from '@storybook/react'

import { LangSelect } from '@/components/langSelect/LangSelect'

const meta = {
  argTypes: {},
  component: LangSelect,
  tags: ['autodocs'],
  title: 'Components/LangSelect',
} satisfies Meta<typeof LangSelect>

export default meta
type Story = StoryObj<typeof meta>

export const LangSelectStory: Story = {
  args: {},
}

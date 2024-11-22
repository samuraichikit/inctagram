import { TextArea } from '@/components/ui/text-area'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: TextArea,
  tags: ['autodocs'],
  title: 'Components/TextArea',
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const TextAreaDefault: Story = {
  args: {
    label: 'Text-area label',
  },
}

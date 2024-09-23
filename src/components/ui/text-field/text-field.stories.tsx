import { TextField } from '@/components/ui/text-field'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['text', 'search', 'password'],
    },
  },
  component: TextField,
  tags: ['autodocs'],
  title: 'Components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    label: 'Text input',
    placeholder: 'Input',
    type: 'text',
  },
}

export const Password: Story = {
  args: {
    label: 'Password input',
    placeholder: 'Input',
    type: 'password',
  },
}

export const Search: Story = {
  args: {
    label: 'Search input',
    placeholder: 'Input',
    type: 'search',
  },
}

export const TextWithError: Story = {
  args: {
    error: 'Error text',
    label: 'Search input',
    placeholder: 'Input',
    type: 'search',
  },
}

export const TextFieldWithoutLabel: Story = {
  args: {
    label: '',
    placeholder: 'Input',
    type: 'text',
  },
}

export const DisabledPassword: Story = {
  args: {
    disabled: true,
    label: '',
    placeholder: 'Input',
    type: 'password',
  },
}

export const DisabledSearch: Story = {
  args: {
    disabled: true,
    label: '',
    placeholder: 'Input',
    type: 'search',
  },
}

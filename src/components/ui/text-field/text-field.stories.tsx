import { Meta, StoryObj } from '@storybook/react'

import { TextField } from './text-field'

const meta = {
  component: TextField,
  tags: ['autodocs'],
  title: 'Components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    disabled: false,
    error: '',
    label: 'Email',
    placeholder: 'Hello',
    type: 'password',
  },
}

/*

 Text
 Password 
 Search
 TextWithError
 TextFieldWithoutLabel
 DisabledPassword
 DisabledSearch

*/

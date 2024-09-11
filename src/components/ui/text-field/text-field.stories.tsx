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
    label: '',
    placeholder: 'Input search',
    type: 'search',
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

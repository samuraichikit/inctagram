import { Meta } from '@storybook/react'

import { TextField } from './text-field'

const meta = {
  component: TextField,
} satisfies Meta<typeof TextField>

export default meta

export const Primary = {
  args: {
    placeholder: 'Hello',
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

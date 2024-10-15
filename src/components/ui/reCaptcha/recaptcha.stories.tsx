import { Meta, StoryObj } from '@storybook/react'

import { ReCaptcha } from './ReCaptcha'

const meta = {
  args: {
    hl: 'en',
    sitekey: '6LfCfGEqAAAAADuum-zR79JJ2C5qDQpb7pFLi4LE',
    theme: 'dark',
  },
  component: ReCaptcha,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/ReCaptcha',
} satisfies Meta<typeof ReCaptcha>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const WithError: Story = {
  args: {
    errorMessage: 'Some error',
  },
}

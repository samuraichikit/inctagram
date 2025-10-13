import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
}

export default meta
type Story = StoryObj<typeof RadioGroup>

const defaultState = [
  { disabled: false, label: 'Radio Group', value: 'rg1' },
  { disabled: false, label: 'Radio Group', value: 'rg2' },
  { disabled: false, label: 'Radio Group', value: 'rg3' },
  { disabled: false, label: 'Radio Group', value: 'rg4' },
  { disabled: true, label: 'Radio Group', value: 'rg5' },
]

const Component = () => {
  const [current, setCurrent] = useState(defaultState[0].value)

  const handleChangeCurrentRadio = (radioValue: string) => {
    setCurrent(radioValue)
  }

  return (
    <RadioGroup onValueChange={handleChangeCurrentRadio} options={defaultState} value={current} />
  )
}

export const Controlled: Story = {
  args: {
    options: defaultState,
  },
  render: () => <Component />,
}

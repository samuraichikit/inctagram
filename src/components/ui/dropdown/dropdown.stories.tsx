import type { Meta, StoryObj } from '@storybook/react'

import { BellOutline } from '@/assets/icons/BellOutline'
import { DropdownItem } from '@/components/ui/dropdown/DropdownItems'
import { Dropdown } from '@/components/ui/dropdown/dropdown'

const meta = {
  argTypes: {},
  component: Dropdown,
  tags: ['autodocs'],
  title: 'Components/Dropdown',
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownDefault: Story = {
  render: () => {
    return (
      <Dropdown
        align={'start'}
        title={'Notifications'}
        trigger={
          <div>
            <BellOutline />
          </div>
        }
      >
        <DropdownItem>Lorem ipsum</DropdownItem>
        <DropdownItem>Lorem ipsum</DropdownItem>
        <DropdownItem>Lorem ipsum</DropdownItem>
        <DropdownItem>Lorem ipsum</DropdownItem>
        <DropdownItem>Lorem ipsum</DropdownItem>
        <DropdownItem>Lorem ipsum</DropdownItem>
        <DropdownItem>Lorem ipsum</DropdownItem>
        <DropdownItem>Lorem ipsum</DropdownItem>
        <DropdownItem>Lorem ipsum</DropdownItem>
      </Dropdown>
    )
  },
}

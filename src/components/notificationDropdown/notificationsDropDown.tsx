import { useState } from 'react'

import { BellChecked } from '@/assets/icons/BellChecked'
import { BellOutline } from '@/assets/icons/BellOutline'
import { Dropdown } from '@/components/ui/dropdown'
import { DropdownItem } from '@/components/ui/dropdown/DropdownItems'

export const NotificationsDropDown = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dropdown
      trigger={
        isOpen ? (
          <div>
            <BellChecked />
          </div>
        ) : (
          <div>
            <BellOutline />
          </div>
        )
      }
    >
      <DropdownItem>Lorem ipsum</DropdownItem>
      <DropdownItem>Lorem ipsum</DropdownItem>
      <DropdownItem>Lorem ipsum</DropdownItem>
    </Dropdown>
  )
}

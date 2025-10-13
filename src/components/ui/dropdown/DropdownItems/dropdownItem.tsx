import { ComponentPropsWithoutRef } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from '../dropdown.module.scss'

export type DropdownItemProps = {} & ComponentPropsWithoutRef<typeof DropdownMenu.Item>
export const DropdownItem = ({
  children,
  disabled,
  itemID,
  onSelect,
  ...rest
}: DropdownItemProps) => {
  return (
    <DropdownMenu.Item className={s.Item} {...rest} itemID={itemID} onSelect={onSelect}>
      {children}
    </DropdownMenu.Item>
  )
}

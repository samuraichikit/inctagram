import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { DropdownItem } from '@/components/ui/dropdown/DropdownItems/dropdownItem'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import styles from '../dropdown.module.scss'

export type DropdownItemWithIconProps = {
  caption: string
  icon: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownItem>
export const DropdownItemWithIcon = ({
  caption,
  className,
  disabled,
  icon,
  itemID,
  onSelect,
  ...rest
}: DropdownItemWithIconProps) => {
  const classNames = {
    item: clsx(styles.Item, className),
  }

  return (
    <DropdownItem
      disabled={disabled}
      itemID={itemID}
      onSelect={onSelect}
      {...rest}
      className={classNames.item}
    >
      {icon}
      <Typography variant={'small_text'}>{caption}</Typography>
    </DropdownItem>
  )
}

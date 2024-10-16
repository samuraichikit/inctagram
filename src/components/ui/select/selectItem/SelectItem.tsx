import { ComponentPropsWithoutRef } from 'react'

import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './selectItem.module.scss'

type SelectItemProps = {
  small?: boolean
} & ComponentPropsWithoutRef<typeof SelectRadix.Item>

export const SelectItem = ({ children, className, small, ...rest }: SelectItemProps) => {
  return (
    <SelectRadix.Item className={clsx(s.item, small && s.small, className)} {...rest}>
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
    </SelectRadix.Item>
  )
}

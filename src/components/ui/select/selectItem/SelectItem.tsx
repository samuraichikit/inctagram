import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './selectItem.module.scss'

type SelectItemProps = {
  small?: boolean
} & ComponentPropsWithoutRef<typeof SelectRadix.Item>

export const SelectItem = forwardRef<ElementRef<typeof SelectRadix.Item>, SelectItemProps>(
  ({ children, className, small, ...rest }, ref) => {
    return (
      <SelectRadix.Item className={clsx(s.item, small && s.small, className)} {...rest} ref={ref}>
        <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
      </SelectRadix.Item>
    )
  }
)

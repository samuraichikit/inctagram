import { ComponentPropsWithoutRef, ReactNode, useId } from 'react'

import { DropDownArrowIcon } from '@/assets/icons/DropDownArrow'
import { Typography } from '@/components/ui/typography'
import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

export type SelectProps = {
  id?: string
  label?: string
  placeholder?: ReactNode
  small?: boolean
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const Select = ({ children, id, label, placeholder, small, ...rest }: SelectProps) => {
  const generatedId = useId()
  const idToUse = id ?? generatedId

  return (
    <div className={s.wrapper}>
      {!!label && (
        <Typography asChild className={s.label} variant={'regular_text_14'}>
          <label htmlFor={idToUse}>{label}</label>
        </Typography>
      )}
      <SelectRadix.Root {...rest}>
        <SelectRadix.Trigger className={clsx(s.trigger, small && s.small)} id={idToUse}>
          <SelectRadix.Value placeholder={placeholder} />
          <DropDownArrowIcon className={s.dropDownArrowIcon} height={24} width={24} />
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content
            className={clsx(s.content, small && s.small)}
            collisionPadding={0}
            position={'popper'}
          >
            <SelectRadix.Viewport className={s.viewport}>{children}</SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}

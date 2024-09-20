import { ComponentPropsWithoutRef, ReactNode, useId } from 'react'

import { DropDownArrowIcon } from '@/assets/icons/DropDownArrow'
import { Typography } from '@/components/ui/typography'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

type Option = {
  label: number | string
  value: string
}

export type SelectProps = {
  id?: string
  label?: string
  options: Option[]
  placeholder?: ReactNode
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const Select = ({ id, label, options, placeholder, ...rest }: SelectProps) => {
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
        <SelectRadix.Trigger className={s.trigger} id={idToUse}>
          <SelectRadix.Value placeholder={placeholder} />
          <DropDownArrowIcon className={s.dropDownArrowIcon} height={24} width={24} />
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content className={s.content} position={'popper'}>
            <SelectRadix.Viewport className={s.viewport}>
              {options.map(item => {
                return (
                  <SelectRadix.Item className={s.item} key={item.value} value={item.value}>
                    <SelectRadix.ItemText>{item.label}</SelectRadix.ItemText>
                  </SelectRadix.Item>
                )
              })}
            </SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}

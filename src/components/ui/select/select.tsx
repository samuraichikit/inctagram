import { ReactNode } from 'react'

import { DropDownArrowIcon } from '@/assets/icons/DropDownArrow'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

import { Typography } from '../typography'

type Option = {
  label: string
  value: string
}

type Props = {
  disabled?: boolean
  label?: string
  options: Option[]
  placeholder?: ReactNode
}

export const Select = ({ disabled, label, options, placeholder }: Props) => (
  <div className={s.wrapper}>
    {!!label && (
      <Typography asChild className={s.label} variant={'regular_text_14'}>
        <label htmlFor={label}>{label}</label>
      </Typography>
    )}
    <SelectRadix.Root disabled={disabled}>
      <SelectRadix.Trigger className={s.trigger} id={label}>
        <SelectRadix.Value placeholder={placeholder} />
        <DropDownArrowIcon className={s.dropDownArrowIcon} height={8} width={20} />
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

import { ReactNode } from 'react'

import { DropDownArrowIcon } from '@/assets/icons/DropDownArrow'
import { Typography } from '@/components/ui/typography'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

type Option = {
  label: string
  value: string
}

type Props = {
  defaultValue?: string
  disabled?: boolean
  label?: string
  onValueChange?: (value: string) => void
  options: Option[]
  placeholder?: ReactNode
  value?: string
}

export const Select = ({
  defaultValue,
  disabled,
  label,
  onValueChange,
  options,
  placeholder,
  value,
}: Props) => (
  <div className={s.wrapper}>
    {!!label && (
      <Typography asChild className={s.label} variant={'regular_text_14'}>
        <label htmlFor={label}>{label}</label>
      </Typography>
    )}
    <SelectRadix.Root
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={onValueChange}
      value={value}
    >
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

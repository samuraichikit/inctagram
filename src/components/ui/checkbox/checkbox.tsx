import { useState } from 'react'

import { CheckIcon } from '@/assets/icons/CheckIcon'
import { Typography } from '@/components/ui/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import clsx from 'clsx'

import s from './checkbox.module.scss'

type Props = {
  checked?: boolean
  className?: string
  disabled?: boolean
  id?: string
  label?: string
  onChange?: (checked: boolean) => void
  required?: boolean
}

export const Checkbox = ({
  checked,
  className,
  disabled,
  id = 'c1',
  label,
  onChange,
  required,
}: Props) => {
  const [isChecked, setChecked] = useState(false)

  const onCheckHandler = () => {
    if (!disabled) {
      setChecked(!isChecked)
    }
  }

  const classNames = {
    indicator: clsx(s.checkIndicator, disabled && s.disabled),
    indicatorWrapper: clsx(s.checkIndicatorWrapper, disabled && s.disabled),
    label: clsx(s.label, disabled && s.disabled),
    wrapper: clsx(s.wrapper, className),
  }

  return (
    <div className={classNames.wrapper}>
      <CheckboxRadix.Root
        checked={checked ?? isChecked}
        className={s.checkRoot}
        disabled={disabled}
        id={id}
        onCheckedChange={onChange}
        onClick={onCheckHandler}
        required={required}
      >
        <div className={classNames.indicatorWrapper}>
          <CheckboxRadix.Indicator className={classNames.indicator} forceMount>
            <CheckIcon />
          </CheckboxRadix.Indicator>
        </div>
      </CheckboxRadix.Root>
      {label && (
        <Typography asChild>
          <label className={classNames.label} onClick={onCheckHandler}>
            {label}
          </label>
        </Typography>
      )}
    </div>
  )
}

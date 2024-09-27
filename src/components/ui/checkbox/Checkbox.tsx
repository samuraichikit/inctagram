import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef, useId, useState } from 'react'

import { CheckIcon } from '@/assets/icons/CheckIcon'
import { Typography } from '@/components/ui/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import clsx from 'clsx'

import s from './checkbox.module.scss'

type Props = {
  className?: string
  errorMessage?: string
  id?: string
  label?: ReactNode
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, Props>(
  (
    { checked, className, disabled, errorMessage, id, label, onCheckedChange, required, ...props },
    ref
  ) => {
    const [isChecked, setChecked] = useState(false)
    const generatedId = useId()
    const idToUse = id ?? generatedId

    const checkboxToggleHandler = () => {
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
          id={idToUse}
          onCheckedChange={onCheckedChange}
          onClick={checkboxToggleHandler}
          ref={ref}
          required={required}
          {...props}
        >
          <div className={classNames.indicatorWrapper}>
            <CheckboxRadix.Indicator className={classNames.indicator} forceMount>
              <CheckIcon />
            </CheckboxRadix.Indicator>
          </div>
        </CheckboxRadix.Root>
        {label && (
          <Typography asChild>
            <label className={classNames.label} onClick={checkboxToggleHandler}>
              {label}
            </label>
          </Typography>
        )}
        {errorMessage && <Typography variant={'error'}>{errorMessage}</Typography>}
      </div>
    )
  }
)

Checkbox.displayName = CheckboxRadix.Root.displayName

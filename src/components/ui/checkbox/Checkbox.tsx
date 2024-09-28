import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef, useId } from 'react'

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
  ({ className, errorMessage, id, label, ...props }, ref) => {
    const generatedId = useId()
    const idToUse = id ?? generatedId

    const classNames = {
      indicator: clsx(s.checkIndicator, props.disabled && s.disabled),
      indicatorWrapper: clsx(s.checkIndicatorWrapper, props.disabled && s.disabled),
      label: clsx(s.label, props.disabled && s.disabled),
      wrapper: clsx(s.wrapper, className),
    }

    return (
      <div className={classNames.wrapper}>
        <CheckboxRadix.Root className={s.checkRoot} id={idToUse} ref={ref} {...props}>
          <div className={classNames.indicatorWrapper}>
            <CheckboxRadix.Indicator className={classNames.indicator} forceMount>
              <CheckIcon />
            </CheckboxRadix.Indicator>
          </div>
        </CheckboxRadix.Root>
        {label && (
          <Typography asChild>
            <label className={classNames.label}>{label}</label>
          </Typography>
        )}
        {errorMessage && <Typography variant={'error'}>{errorMessage}</Typography>}
      </div>
    )
  }
)

Checkbox.displayName = CheckboxRadix.Root.displayName

import { ComponentProps, forwardRef } from 'react'

import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './text-field.module.scss'

type Props = {
  error?: string
  label?: string
} & ComponentProps<'input'>

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ className, error, label, type, ...props }, ref) => {
    return (
      <div className={s.wrapper}>
        {!!label && (
          <Typography asChild className={s.label} variant={'regular_text_14'}>
            <label htmlFor={label}>{label}</label>
          </Typography>
        )}
        <input
          className={clsx(s.input, !!error && s.errorInput, className)}
          id={label}
          ref={ref}
          type={type}
          {...props}
        />
        {!!error && (
          <Typography className={s.error} variant={'regular_text_14'}>
            {error}
          </Typography>
        )}
      </div>
    )
  }
)

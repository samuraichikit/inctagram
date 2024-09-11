import { ComponentProps, forwardRef, useState } from 'react'

import { EyeIcon } from '@/assets/icons/EyeIcon'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './text-field.module.scss'

type Props = {
  error?: string
  label?: string
} & ComponentProps<'input'>

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ className, error, label, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const isPasswordType = type === 'password'

    const isSearchType = type === 'search'

    let finalType = type

    if (type === 'password') {
      finalType = showPassword ? 'text' : 'password'
    }

    const passwordHandler = () => setShowPassword(prev => !prev)

    return (
      <div className={s.wrapper}>
        {!!label && (
          <Typography asChild className={s.label} variant={'regular_text_14'}>
            <label htmlFor={label}>{label}</label>
          </Typography>
        )}
        <div className={s.iconWrapper}>
          <input
            className={clsx(
              s.input,
              !!error && s.errorInput,
              isPasswordType && s.passwordInput,
              className
            )}
            id={label}
            ref={ref}
            type={finalType}
            {...props}
          />
          {isPasswordType && (
            <button className={s.button} onClick={passwordHandler} type={'button'}>
              <EyeIcon height={24} width={24} />
            </button>
          )}
        </div>
        {!!error && (
          <Typography className={s.error} variant={'regular_text_14'}>
            {error}
          </Typography>
        )}
      </div>
    )
  }
)

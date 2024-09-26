import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { EyeIcon } from '@/assets/icons/EyeIcon'
import { EyeOffIcon } from '@/assets/icons/EyeOffIcon'
import { SearchIcon } from '@/assets/icons/SearchIcon'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './textField.module.scss'

type Props = {
  errorMessage?: string
  label?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ className, errorMessage, label, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const isPassword = type === 'password'

    const isSearch = type === 'search'

    let finalType = type

    if (isPassword) {
      finalType = showPassword ? 'text' : 'password'
    }

    const showPasswordClickHandler = () => setShowPassword(prev => !prev)

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
              errorMessage && s.errorInput,
              isPassword && s.passwordInput,
              isSearch && s.searchInput,
              className
            )}
            id={label}
            ref={ref}
            type={finalType}
            {...props}
          />
          {isPassword && (
            <button className={s.button} onClick={showPasswordClickHandler} type={'button'}>
              {showPassword ? (
                <EyeOffIcon className={s.eyeIcon} height={24} width={24} />
              ) : (
                <EyeIcon className={s.eyeIcon} height={24} width={24} />
              )}
            </button>
          )}
          {isSearch && <SearchIcon className={s.searchIcon} height={20} width={20} />}
        </div>
        {errorMessage && (
          <Typography className={s.error} variant={'regular_text_14'}>
            {errorMessage}
          </Typography>
        )}
      </div>
    )
  }
)

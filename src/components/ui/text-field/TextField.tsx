import { ComponentPropsWithoutRef, forwardRef, useId, useState } from 'react'

import { EyeIcon } from '@/assets/icons/EyeIcon'
import { EyeOffIcon } from '@/assets/icons/EyeOffIcon'
import { SearchIcon } from '@/assets/icons/SearchIcon'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './textField.module.scss'

export type TextFieldProps = {
  errorMessage?: string
  id?: string
  label?: string
  mandatory?: boolean
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, errorMessage, id, label, mandatory, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const isPassword = type === 'password'

    const isSearch = type === 'search'

    let finalType = type

    if (isPassword) {
      finalType = showPassword ? 'text' : 'password'
    }

    const generatedId = useId()
    const idToUse = id ?? generatedId

    const showPasswordClickHandler = () => setShowPassword(prev => !prev)

    return (
      <div className={clsx(s.wrapper, className)}>
        {!!label && (
          <Typography asChild className={s.label} variant={'regular_text_14'}>
            <label htmlFor={idToUse}>
              {label}
              {mandatory && (
                <Typography asChild variant={'error'}>
                  <span>*</span>
                </Typography>
              )}
            </label>
          </Typography>
        )}
        <div className={s.iconWrapper}>
          <input
            className={clsx(
              s.input,
              errorMessage && s.errorInput,
              isPassword && s.passwordInput,
              isSearch && s.searchInput
            )}
            id={idToUse}
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

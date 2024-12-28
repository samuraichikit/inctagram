import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useId } from 'react'

import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './textArea.module.scss'

export type TextAreaProps = {
  errorMessage?: string
  id?: string
  label?: string
  textAreaClassName?: string
  onValueChange?: (value: string) => void
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, errorMessage, id, label, onChange, onValueChange, textAreaClassName, ...props }, ref) => {
    const generatedId = useId()
    const idToUse = id ?? generatedId

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onValueChange?.(e.target.value)

      onChange?.(e)
    }

    return (
      <div className={clsx(s.wrapper, className)}>
        {!!label && (
          <Typography asChild className={s.label} variant={'regular_text_14'}>
            <label htmlFor={idToUse}>{label}</label>
          </Typography>
        )}
        <div className={s.iconWrapper}>
          <textarea
            className={clsx(s.textarea, textAreaClassName, errorMessage && s.errorTextArea)}
            id={idToUse}
            onChange={onChangeHandler}
            ref={ref}
            {...props}
          />
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

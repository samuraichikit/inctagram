import { ComponentPropsWithoutRef, forwardRef, useId, useState } from 'react'

import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './textArea.module.scss'

export type TextAreaProps = {
  errorMessage?: string
  id?: string
  label?: string
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, errorMessage, id, label, ...props }, ref) => {
    const generatedId = useId()
    const idToUse = id ?? generatedId

    return (
      <div className={clsx(s.wrapper, className)}>
        {!!label && (
          <Typography asChild className={s.label} variant={'regular_text_14'}>
            <label htmlFor={idToUse}>{label}</label>
          </Typography>
        )}
        <div className={s.iconWrapper}>
          <textarea
            className={clsx(s.textarea, errorMessage && s.errorTextArea)}
            id={idToUse}
            ref={ref}
            {...props}
          ></textarea>
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

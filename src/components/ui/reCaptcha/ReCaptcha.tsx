import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './reCaptcha.module.scss'

type Props = {
  errorMessage?: string
} & ComponentPropsWithoutRef<typeof ReCAPTCHA>

export const ReCaptcha = forwardRef<ElementRef<typeof ReCAPTCHA>, Props>(
  ({ errorMessage, hl, style, ...props }, ref) => {
    const router = useRouter()

    const lang = router.locale ?? 'ru'
    const wrapperClass = clsx(s.reCaptcha, errorMessage && s.error)

    return (
      <div className={wrapperClass}>
        <ReCAPTCHA
          hl={hl ?? lang}
          ref={ref}
          {...props}
          style={{
            height: '100%',
            maxHeight: '84px',
            maxWidth: '300px',
            width: '100%',
            ...style,
          }}
        />
        {errorMessage && <Typography variant={'error'}>{errorMessage}</Typography>}
      </div>
    )
  }
)

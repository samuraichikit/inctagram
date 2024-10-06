import React, { ComponentPropsWithoutRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import { Typography } from '@/components/ui/typography'

import s from './recaptcha.module.scss'

type Props = {
  errorMessage?: string
} & ComponentPropsWithoutRef<typeof ReCAPTCHA>
export const Recaptcha = ({ errorMessage, style, ...props }: Props) => {
  return (
    <div className={s.reCaptcha}>
      <ReCAPTCHA
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

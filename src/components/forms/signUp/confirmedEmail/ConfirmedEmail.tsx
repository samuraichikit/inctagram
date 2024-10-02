import React from 'react'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import Image from 'next/image'

import s from './confirmedEmail.module.scss'

import confirmedBro from '../../../../../public/confirmedBro.png'

export const ConfirmedEmail = () => {
  return (
    <div className={s.wrapper}>
      <Typography className={s.title} variant={'h1'}>
        Congratulations!
      </Typography>
      <Typography className={s.description} variant={'regular_text_16'}>
        Your email has been confirmed
      </Typography>
      <div>
        <Button className={s.button} variant={'primary'}>
          Sign in
        </Button>
      </div>
      <div>
        <Image alt={'confirmed email'} height={300} src={confirmedBro} width={432} />
      </div>
    </div>
  )
}

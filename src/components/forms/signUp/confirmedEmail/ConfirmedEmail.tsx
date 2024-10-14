import React from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import Image from 'next/image'

import s from './confirmedEmail.module.scss'

import confirmedBro from '../../../../../public/confirmedBro.png'

export const ConfirmedEmail = () => {
  const { t } = useTranslation()

  return (
    <div className={s.wrapper}>
      <Typography className={s.title} variant={'h1'}>
        {t.signUp.congratsMsg}
      </Typography>
      <Typography className={s.description} variant={'regular_text_16'}>
        {t.signUp.emailConfirmed}
      </Typography>
      <div>
        <Button className={s.button} variant={'primary'}>
          {t.passwordForm.signIn}
        </Button>
      </div>
      <div>
        <Image alt={'confirmed email'} height={300} src={confirmedBro} width={432} />
      </div>
    </div>
  )
}

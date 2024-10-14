import React from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import Image from 'next/image'

import s from './verificationLink.module.scss'

import verificationLink from '../../../../../public/verificationLink.png'

export const VerificationLink = () => {
  const { t } = useTranslation()

  return (
    <div className={s.wrapper}>
      <Typography className={s.title} variant={'h1'}>
        {t.emailVerification.expiredLinkMsg}
      </Typography>
      <Typography className={s.description} variant={'regular_text_16'}>
        {t.emailVerification.msg}
      </Typography>
      <div>
        <Button className={s.button} variant={'primary'}>
          {t.emailVerification.resendMsg}
        </Button>
      </div>
      <div>
        <Image alt={'confirmed email'} height={353} src={verificationLink} width={473} />
      </div>
    </div>
  )
}

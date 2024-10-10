import React, { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useConfirmEmailMutation } from '@/services/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './confirmedEmail.module.scss'

import confirmedBro from '../../../../../public/confirmedBro.png'
import { VerificationLink } from '../verificationLink'

export const ConfirmedEmail = () => {
  const [confirmEmail, { error, isLoading }] = useConfirmEmailMutation()
  const router = useRouter()
  const { query } = router

  const confirmationCode = query.code as string

  useEffect(() => {
    if (confirmationCode) {
      confirmEmail({ confirmationCode })
    }
  }, [confirmationCode, confirmEmail])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <VerificationLink />
  }

  return (
    <div className={s.wrapper}>
      <Typography className={s.title} variant={'h1'}>
        Congratulations!
      </Typography>
      <Typography className={s.description} variant={'regular_text_16'}>
        Your email has been confirmed
      </Typography>
      <div>
        <Button asChild className={s.button}>
          <Link href={'/auth/signIn'}>Sign in</Link>
        </Button>
      </div>
      <div>
        <Image alt={'confirmed email'} height={300} src={confirmedBro} width={432} />
      </div>
    </div>
  )
}

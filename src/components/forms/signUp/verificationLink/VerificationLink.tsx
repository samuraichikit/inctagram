import { useVerificationLink } from '@/common/hooks'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import Image from 'next/image'

import s from './verificationLink.module.scss'

import verificationLink from '../../../../../public/verificationLink.png'

export const VerificationLink = () => {
  const { resendEmailHandler } = useVerificationLink()

  return (
    <div className={s.wrapper}>
      <Typography className={s.title} variant={'h1'}>
        Email verification link expired
      </Typography>
      <Typography className={s.description} variant={'regular_text_16'}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <div>
        <Button className={s.button} onClick={resendEmailHandler}>
          Resend verification link
        </Button>
      </div>
      <div>
        <Image alt={'confirmed email'} height={353} src={verificationLink} width={473} />
      </div>
    </div>
  )
}

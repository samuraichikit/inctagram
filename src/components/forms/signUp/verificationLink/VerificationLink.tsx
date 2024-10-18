import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useResendVerificationLinkMutation } from '@/services/auth'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './verificationLink.module.scss'

import verificationLink from '../../../../../public/verificationLink.png'

export const VerificationLink = () => {
  const [resendVerificationLink] = useResendVerificationLinkMutation()
  const router = useRouter()
  const { query } = router
  const email = query.email as string
  const resendEmailHandler = () => {
    resendVerificationLink({ email })
  }

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

import { useResendVerificationLinkMutation } from '@/services/auth'
import { useRouter } from 'next/router'

export const useVerificationLink = () => {
  const [resendVerificationLink] = useResendVerificationLinkMutation()
  const router = useRouter()
  const { query } = router
  const email = query.email as string
  const resendEmailHandler = () => {
    resendVerificationLink({ email })
  }

  return { resendEmailHandler }
}

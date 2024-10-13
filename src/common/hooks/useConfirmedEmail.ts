import { useEffect } from 'react'

import { useConfirmEmailMutation } from '@/services/auth'
import { useRouter } from 'next/router'

export const useConfirmedEmail = () => {
  const [confirmEmail, { error, isLoading }] = useConfirmEmailMutation()
  const router = useRouter()
  const { query } = router

  const confirmationCode = query.code as string

  useEffect(() => {
    if (confirmationCode) {
      confirmEmail({ confirmationCode })
    }
  }, [confirmationCode, confirmEmail])

  return { error, isLoading }
}

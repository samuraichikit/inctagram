import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useTranslation } from '@/common/hooks/useTranslation'
import { newPasswordSchema } from '@/common/schemas'
import { useCheckRecoveryCodeMutation, useCreateNewPasswordMutation } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

export const useCreateNewPassword = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean>(true)

  type FormValues = z.infer<ReturnType<typeof newPasswordSchema>>
  const { control, formState, handleSubmit } = useForm<FormValues>({
    defaultValues: { newPassword: '', passwordConfirmation: '' },
    mode: 'onBlur',
    resolver: zodResolver(newPasswordSchema(t)),
  })
  const isValid = formState.isValid
  const router = useRouter()
  const { code, email } = router.query
  const [checkRecoveryMutation] = useCheckRecoveryCodeMutation()

  useEffect(() => {
    checkRecoveryMutation({ recoveryCode: code as string })
      .unwrap()
      .then(() => {
        setLoading(false)
      })
      .catch(error => {
        if (error.data.messages[0].message === 'Code is not valid') {
          router.push('/auth/expiredLink').then(() => {
            setLoading(false)
          })
        }
      })
  }, [code])

  const [createNewPassword, result] = useCreateNewPasswordMutation()
  const handleCreateNewPassword = (data: FormValues) => {
    if (code) {
      createNewPassword({ newPassword: data.passwordConfirmation, recoveryCode: code as string })
    }
  }
  const isLoading = loading

  if (result.isSuccess) {
    router.push('/auth/signIn')
  }

  return { control, email, handleCreateNewPassword, handleSubmit, isLoading, isValid, t }
}

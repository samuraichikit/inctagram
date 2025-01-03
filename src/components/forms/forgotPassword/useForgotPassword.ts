import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useTranslation } from '@/common/hooks/useTranslation'
import { usePasswordRecoveryMutation } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type ForgotValues = { email: string; reCaptcha: null | string }
export const useForgotPassword = () => {
  const [isUserEmail, setUserEmail] = useState<null | string>(null)
  const [showModal, setShowModal] = useState(false)
  const { t } = useTranslation()
  const [passwordRecovery] = usePasswordRecoveryMutation()
  const forgotSchema = z.object({
    email: z
      .string()
      .min(1, `${t.passwordForm.mandatoryField}`)
      .email(`${t.passwordForm.incorrectEmail}`),
    reCaptcha: !isUserEmail ? z.string().min(1, `${t.passwordForm.recaptchaMsg}`) : z.string(),
  })
  const { control, formState, handleSubmit, reset, setError, setValue } = useForm<ForgotValues>({
    defaultValues: { email: '', reCaptcha: '' },
    resolver: zodResolver(forgotSchema),
  })
  const currentBaseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const handleSendLink = async (data: ForgotValues) => {
    passwordRecovery({
      baseUrl: currentBaseUrl,
      email: data.email,
      recaptcha: data.reCaptcha ?? '',
    })
      .unwrap()
      .then(() => {
        setShowModal(true)
        setUserEmail(data.email)
        reset({ email: '', reCaptcha: '' })
      })
      .catch(error => {
        const errorMessages = error.data.messages[0]

        if (
          errorMessages.field === 'email' &&
          errorMessages.message === `User with this email ${data.email} not founded`
        ) {
          setError(errorMessages.field, {
            message: t.passwordForm.emailDoesntExist,
            type: 'custom',
          })
        }
      })
  }
  const isDisabled = !formState.isValid
  const buttonSentText = isUserEmail
    ? `${t.passwordForm.sendLinkAgain}`
    : `${t.passwordForm.sendLink}`
  const handleChangeRecaptcha = async (value: null | string) => {
    setValue('reCaptcha', value, { shouldValidate: true })
  }
  const handleButtonOkClick = () => setShowModal(false)

  return {
    buttonSentText,
    control,
    forgotSchema,
    handleButtonOkClick,
    handleChangeRecaptcha,
    handleSendLink,
    handleSubmit,
    isDisabled,
    isUserEmail,
    setShowModal,
    setUserEmail,
    showModal,
    t,
  }
}

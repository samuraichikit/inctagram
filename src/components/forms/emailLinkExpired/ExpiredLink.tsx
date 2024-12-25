import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ExpiredLinkIcon } from '@/assets/icons/ExpiredLinkIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { FormTextField } from '@/components/controlled/formTextField'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { ReCaptcha } from '@/components/ui/reCaptcha'
import { Typography } from '@/components/ui/typography'
import { usePasswordRecoveryMutation } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './expiredLink.module.scss'

export const ExpiredLink = () => {
  const [showModal, setShowModal] = useState(false)
  const [isUserEmail, setIsUserEmail] = useState('')
  const { t } = useTranslation()
  const ExpiredSchema = z.object({
    email: z
      .string()
      .min(1, `${t.passwordForm.mandatoryField}`)
      .email(`${t.passwordForm.incorrectEmail}`),
    reCaptcha: !isUserEmail ? z.string().min(1, `${t.passwordForm.recaptchaMsg}`) : z.string(),
  })

  type ExpiredValues = { email: string; reCaptcha: null | string }
  const { control, handleSubmit, setError, setValue } = useForm<ExpiredValues>({
    defaultValues: { email: '', reCaptcha: '' },
    mode: 'onBlur',
    resolver: zodResolver(ExpiredSchema),
  })
  const [passwordRecovery] = usePasswordRecoveryMutation()
  const onResendEmailHandler = (data: ExpiredValues) => {
    passwordRecovery({
      baseUrl: 'http://localhost:3000',
      email: data.email,
      recaptcha: data.reCaptcha ?? '',
    })
      .unwrap()
      .then(() => {
        setIsUserEmail(data.email)
        setShowModal(true)
        setValue('email', '')
        setValue('reCaptcha', '')
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
  const onReCaptchaChangeHandler = (value: null | string) => {
    setValue('reCaptcha', value ?? '')
  }
  const handleButtonOkClick = () => {
    setShowModal(false)
  }

  return (
    <div className={s.formContainer}>
      <form className={s.form} onSubmit={handleSubmit(data => onResendEmailHandler(data))}>
        <Typography variant={'h1'}>{t.passwordForm.expiredLink1}</Typography>
        <Typography variant={'regular_text_16'}>{t.passwordForm.expiredLink2}</Typography>
        <div className={s.buttonTextFieldContainer}>
          <FormTextField control={control} label={'Email'} name={'email'} />
          <Button className={s.submitButton} type={'submit'} variant={'primary'}>
            {t.passwordForm.resendVerificationLink}
          </Button>
        </div>
        <ReCaptcha
          onChange={onReCaptchaChangeHandler}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
          theme={'dark'}
        />
      </form>
      <ExpiredLinkIcon />
      <Modal onOpenChange={setShowModal} open={showModal} title={'Email sent'}>
        <div className={s.modalContent}>
          <Typography variant={'regular_text_16'}>
            {t.passwordForm.confirmationLinkMsg} {isUserEmail}
          </Typography>
          <Button onClick={handleButtonOkClick}>Ok</Button>
        </div>
      </Modal>
    </div>
  )
}

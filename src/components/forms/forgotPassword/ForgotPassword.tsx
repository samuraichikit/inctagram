import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { FormTextField } from '@/components/controlled/formTextField'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Modal } from '@/components/ui/modal'
import { Recaptcha } from '@/components/ui/recaptcha'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgotPassword.module.scss'

type ForgotValues = { email: string; reCaptcha: null | string }

type Props = {}
export const ForgotPassword = (props: Props) => {
  const [isUserEmail, setUserEmail] = useState<null | string>(null)
  const [showModal, setShowModal] = useState(false)

  const forgotSchema = z.object({
    email: z.string().min(1, 'Обязательный').email('Некорректный адресс электронной почты'),
    reCaptcha: !isUserEmail
      ? z.string().min(1, 'Пожалуйста, подтвердите, что вы не робот')
      : z.string(),
  })

  const buttonSentText = isUserEmail ? 'Send Link Again' : 'Send Link'

  const { control, formState, handleSubmit, reset, setValue } = useForm<ForgotValues>({
    defaultValues: { email: '', reCaptcha: '' },
    resolver: zodResolver(forgotSchema),
  })

  const handleSendLink = (data: ForgotValues) => {
    setUserEmail(data.email)
    setShowModal(true)
    reset({ email: '', reCaptcha: '' })
  }

  const handleChangeRecaptcha = (value: null | string) =>
    setValue('reCaptcha', value, { shouldValidate: true })

  const handleButtonOkClick = () => setShowModal(false)

  return (
    <Card className={s.card}>
      <form className={s.form} onSubmit={handleSubmit(handleSendLink)}>
        <Typography asChild className={s.title} variant={'h1'}>
          <h1>Forgot Password</h1>
        </Typography>
        <FormTextField
          control={control}
          label={'Email'}
          name={'email'}
          placeholder={'Epam@epam.com'}
        />
        <Typography className={s.instructions} variant={'regular_text_14'}>
          Enter your email address and we will send you further instructions
        </Typography>
        {isUserEmail && (
          <Typography className={s.info}>
            The link has been sent by email.
            <br />
            If you don’t receive an email send link again
          </Typography>
        )}
        <Button className={s.button} type={'submit'}>
          {buttonSentText}
        </Button>
        <Button className={s.button} variant={'text'}>
          Back to Sign In
        </Button>
        {!isUserEmail && (
          <Recaptcha
            errorMessage={formState.errors.reCaptcha?.message}
            onChange={handleChangeRecaptcha}
            sitekey={'6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
            theme={'dark'}
          />
        )}
        <Modal onOpenChange={setShowModal} open={showModal} title={'Email sent'}>
          <div className={s.modalContent}>
            <Typography variant={'regular_text_16'}>
              We have sent a link to confirm your email to {isUserEmail}
            </Typography>
            <Button onClick={handleButtonOkClick}>Ok</Button>
          </div>
        </Modal>
      </form>
    </Card>
  )
}

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { GitHubIcon } from '@/assets/icons/GitHubIcon'
import { GoogleIcon } from '@/assets/icons/GoogleIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { FormCheckbox } from '@/components/controlled/formCheckbox'
import { FormTextField } from '@/components/controlled/formTextField'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './signUp.module.scss'

export const SignUp = () => {
  const { t } = useTranslation()

  type SignUp = {
    agreesToTOS: any
    email: string
    password: string
    password_confirmation: string
    username: string
  }
  const { control, handleSubmit } = useForm<SignUp>({
    defaultValues: {
      agreesToTOS: false,
      email: '',
      password: '',
      password_confirmation: '',
      username: '',
    },
  })

  const onSubmitHandler: SubmitHandler<SignUp> = data => {}

  return (
    <Card className={s.card}>
      <Typography asChild className={s.title} variant={'h1'}>
        <h1>{t.signUp.signUpHeader}</h1>
      </Typography>
      <div className={s.iconWrapper}>
        <GoogleIcon height={36} width={36} />
        <GitHubIcon height={36} width={36} />
      </div>
      <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <FormTextField
          className={s.input}
          control={control}
          label={t.signUp.username}
          name={'username'}
          placeholder={'Epam11'}
          type={'text'}
        />
        <FormTextField
          className={s.input}
          control={control}
          label={t.passwordForm.email}
          name={'email'}
          placeholder={'Epam@epam.com'}
          type={'email'}
        />
        <FormTextField
          className={s.input}
          control={control}
          label={t.passwordForm.password}
          name={'password'}
          placeholder={t.passwordForm.password}
          type={'password'}
        />
        <FormTextField
          className={s.input}
          control={control}
          label={t.passwordForm.passwordConfirmation}
          name={'password_confirmation'}
          placeholder={t.passwordForm.passwordConfirmation}
          type={'password'}
        />
        <FormCheckbox
          className={s.checkBox}
          control={control}
          label={
            <Typography slot={'span'} variant={'small_text'}>
              {t.agreementMsg}{' '}
              <Typography asChild variant={'small_link'}>
                <a>{t.termsOfService.title}</a>
              </Typography>{' '}
              and
              <Typography asChild variant={'small_link'}>
                <a> {t.privacyPolicy.title}</a>
              </Typography>
            </Typography>
          }
          name={'agreesToTOS'}
        />
        <Button className={s.signUpButton} variant={'primary'}>
          {t.passwordForm.signUp}
        </Button>
        <Typography className={s.signInQuestion} variant={'regular_text_16'}>
          {t.signUp.haveAccount}
        </Typography>
        <Button variant={'text'}>{t.passwordForm.signIn}</Button>
      </form>
    </Card>
  )
}

import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'

import { GitHubIcon } from '@/assets/icons/GitHubIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { signInSchema } from '@/common/schemas/signInSchema'
import { FormTextField } from '@/components/controlled/formTextField'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GoogleAuthButton } from '@/components/ui/googleAuthButton'
import { Typography } from '@/components/ui/typography'
import { useSignInMutation } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { z } from 'zod'

import s from './signIn.module.scss'

type SignInSchemaType = z.infer<ReturnType<typeof signInSchema>>

export const SignIn = () => {
  const { t } = useTranslation()
  const classNames = {
    emailTextField: clsx(s.emailTextField, s.fullWidth, s.mainMargin),
    forgotPassword: clsx(s.forgotPassword, s.mainMargin),
    form: s.form,
    iconWrapper: clsx(s.iconWrapper, s.mainMargin),
    passwordTextField: clsx(s.passwordTextField, s.fullWidth),
    signInButton: clsx(s.signInButton, s.fullWidth),
    signUpQuestion: s.signUpQuestion,
    title: s.title,
    wrapper: s.wrapper,
  }

  const {
    control,
    formState: { isValid },
    handleSubmit,
    setError,
  } = useForm<SignInSchemaType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signInSchema(t)),
  })

  const [isDisabled, setIsDisabled] = useState(!isValid)

  const email = useWatch({ control, name: 'email' })
  const password = useWatch({ control, name: 'password' })

  useEffect(() => {
    const emailField = document.querySelector('input[name="email"]') as HTMLInputElement
    const passwordField = document.querySelector('input[name="password"]') as HTMLInputElement

    if (emailField.value.includes('@') && passwordField.value.length > 5) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [email, password])

  const [signIn] = useSignInMutation()
  const router = useRouter()

  const onSubmitHandler: SubmitHandler<SignInSchemaType> = (data: SignInSchemaType) => {
    signIn(data)
      .unwrap()
      .then(data => {
        localStorage.setItem('accessToken', data.accessToken)
        const payload = data.accessToken.split('.')[1]
        const id = JSON.parse(atob(payload)).userId

        router.push(`/profile/${id}`)
      })
      .catch(err => {
        if (err.data.messages === 'invalid password or email') {
          setError('email', { message: ' ' })
          setError('password', {
            message: t.passwordForm.signInError,
          })
        }
      })
  }

  return (
    <Card className={classNames.wrapper}>
      <Typography asChild className={classNames.title} variant={'h1'}>
        <h1>{t.passwordForm.signIn}</h1>
      </Typography>
      <div className={classNames.iconWrapper}>
        <GoogleAuthButton />
        <GitHubIcon height={36} width={36} />
      </div>
      <form className={classNames.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <FormTextField
          className={classNames.emailTextField}
          control={control}
          label={t.passwordForm.email}
          name={'email'}
          placeholder={'Epam@epam.com'}
          type={'email'}
        />
        <FormTextField
          className={classNames.passwordTextField}
          control={control}
          label={t.passwordForm.password}
          name={'password'}
          placeholder={t.passwordForm.enterPassword}
          type={'password'}
        />
        <Typography asChild className={classNames.forgotPassword} variant={'regular_text_14'}>
          <a href={'/auth/forgotPassword'}>{t.passwordForm.forgotPassword}</a>
        </Typography>
        <Button className={classNames.signInButton} disabled={isDisabled}>
          {t.passwordForm.signIn}
        </Button>
        <Typography className={s.signUpQuestion} variant={'regular_text_16'}>
          {t.passwordForm.noAccount}
        </Typography>
        <Button asChild variant={'text'}>
          <Link href={'/auth/signUp'}>{t.passwordForm.signUp}</Link>
        </Button>
      </form>
    </Card>
  )
}

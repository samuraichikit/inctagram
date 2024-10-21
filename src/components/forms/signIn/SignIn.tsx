import { SubmitHandler, useForm } from 'react-hook-form'

import { GitHubIcon } from '@/assets/icons/GitHubIcon'
import { GoogleIcon } from '@/assets/icons/GoogleIcon'
import { FormTextField } from '@/components/controlled/formTextField'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useLoginMutation } from '@/services/baseApi'
import clsx from 'clsx'

import s from './signIn.module.scss'

export const SignIn = () => {
  const [login, { data }] = useLoginMutation()

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

  type SignIn = {
    email: string
    password: string
  }

  const { control, handleSubmit } = useForm<SignIn>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmitHandler: SubmitHandler<SignIn> = data => {
    login({ email: data.email, password: data.password })
  }

  return (
    <Card className={classNames.wrapper}>
      <form className={classNames.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <Typography asChild className={classNames.title} variant={'h1'}>
          <h1>Sign In</h1>
        </Typography>
        <div className={classNames.iconWrapper}>
          <GoogleIcon height={36} width={36} />
          <GitHubIcon height={36} width={36} />
        </div>

        <FormTextField
          className={classNames.emailTextField}
          control={control}
          label={'Email'}
          name={'email'}
          placeholder={'Epam@epam.com'}
          type={'email'}
        />
        <FormTextField
          className={classNames.passwordTextField}
          control={control}
          label={'Password'}
          name={'password'}
          placeholder={'Enter password'}
          type={'password'}
        />
        <Typography asChild className={classNames.forgotPassword} variant={'regular_text_14'}>
          <a href={'#'}>Forgot Password</a>
        </Typography>
        <Button className={classNames.signInButton}>Sign In</Button>
        <Typography className={s.signUpQuestion} variant={'regular_text_16'}>
          Don’t have an account?
        </Typography>
        <Button variant={'text'}>Sign Up</Button>
      </form>
    </Card>
  )
}

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { GitHubIcon } from '@/assets/icons/GitHubIcon'
import { GoogleIcon } from '@/assets/icons/GoogleIcon'
import { FormCheckbox } from '@/components/controlled/formCheckbox'
import { FormTextField } from '@/components/controlled/formTextField'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useSignUpMutation } from '@/services/baseApi'

import s from './signUp.module.scss'

export const SignUp = () => {
  const [signUp, { data }] = useSignUpMutation()

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

  const onSubmitHandler: SubmitHandler<SignUp> = data => {
    signUp({
      baseUrl: 'http://localhost:3000',
      email: data.email,
      password: data.password,
      userName: data.username,
    })
  }

  return (
    <Card className={s.card}>
      <Typography asChild className={s.title} variant={'h1'}>
        <h1>Sign Up</h1>
      </Typography>
      <div className={s.iconWrapper}>
        <GoogleIcon height={36} width={36} />
        <GitHubIcon height={36} width={36} />
      </div>
      <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <FormTextField
          className={s.input}
          control={control}
          label={'Username'}
          name={'username'}
          placeholder={'Epam11'}
          type={'text'}
        />
        <FormTextField
          className={s.input}
          control={control}
          label={'Email'}
          name={'email'}
          placeholder={'Epam@epam.com'}
          type={'email'}
        />
        <FormTextField
          className={s.input}
          control={control}
          label={'Password'}
          name={'password'}
          placeholder={'Password'}
          type={'password'}
        />
        <FormTextField
          className={s.input}
          control={control}
          label={'Password confirmation'}
          name={'password_confirmation'}
          placeholder={'Password confirmation'}
          type={'password'}
        />
        <FormCheckbox
          className={s.checkBox}
          control={control}
          label={
            <Typography slot={'span'} variant={'small_text'}>
              I agree to the{' '}
              <Typography asChild variant={'small_link'}>
                <a>Terms of Service</a>
              </Typography>{' '}
              and
              <Typography asChild variant={'small_link'}>
                <a> Privacy Policy</a>
              </Typography>
            </Typography>
          }
          name={'agreesToTOS'}
        />
        <Button className={s.signUpButton} variant={'primary'}>
          Sign up
        </Button>
        <Typography className={s.signInQuestion} variant={'regular_text_16'}>
          Do you have an account?
        </Typography>
        <Button variant={'text'}>Sign in</Button>
      </form>
    </Card>
  )
}

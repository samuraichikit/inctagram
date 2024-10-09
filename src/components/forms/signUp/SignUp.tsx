import { useForm } from 'react-hook-form'

import { GitHubIcon } from '@/assets/icons/GitHubIcon'
import { GoogleIcon } from '@/assets/icons/GoogleIcon'
import { signUpSchema } from '@/common/schemas'
import { FormCheckbox } from '@/components/controlled/formCheckbox'
import { FormTextField } from '@/components/controlled/formTextField'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useSignUpMutation } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { z } from 'zod'

import s from './signUp.module.scss'

type FormValues = z.infer<typeof signUpSchema>

export const SignUp = () => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      agreesToTOS: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      userName: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  })

  const [signUp] = useSignUpMutation()

  const onSubmitHandler = async (data: FormValues) => {
    const { email, password, userName } = data

    await signUp({ email, password, userName })
    reset()
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
          name={'userName'}
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
          name={'passwordConfirmation'}
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
                <Link href={'/auth/termsOfService'}>Terms of Service</Link>
              </Typography>{' '}
              and
              <Typography asChild variant={'small_link'}>
                <Link href={'/auth/privacyPolicy'}> Privacy Policy</Link>
              </Typography>
            </Typography>
          }
          name={'agreesToTOS'}
        />
        <Button className={s.signUpButton} disabled={!isValid} variant={'primary'}>
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

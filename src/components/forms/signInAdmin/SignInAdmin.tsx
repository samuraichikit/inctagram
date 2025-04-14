import { useForm } from 'react-hook-form'

import { useTranslation } from '@/common/hooks/useTranslation'
import { signInAdminSchema } from '@/common/schemas'
import { FormTextField } from '@/components/controlled/formTextField'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useLoginAdminMutation } from '@/services/admin/authAdminService.generated'
import { Button } from '@samuraichikit/inc-ui-kit'
import { useRouter } from 'next/router'
import { z } from 'zod'

import s from './signInAdmin.module.scss'

type FormValues = z.infer<ReturnType<typeof signInAdminSchema>>

export const SignInAdmin = () => {
  const classNames = {
    card: s.card,
    textFieldPassword: s.textFieldPassword,
    title: s.title,
  }
  const { push } = useRouter()
  const { t } = useTranslation()
  const { control, handleSubmit, setError } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [login] = useLoginAdminMutation()

  const submitHandler = async ({ email, password }: FormValues) => {
    const { data } = await login({ variables: { email, password } })
    const logged = data?.loginAdmin.logged

    if (logged) {
      push('/admin/usersList')
    } else {
      setError('email', { message: ' ' })
      setError('password', {
        message: t.signInAdmin.error,
      })
    }
  }

  return (
    <Card className={classNames.card}>
      <Typography className={classNames.title} variant={'h1'}>
        {t.signInAdmin.signIn}
      </Typography>
      <form onSubmit={handleSubmit(submitHandler)}>
        <FormTextField
          control={control}
          label={t.signInAdmin.email}
          name={'email'}
          placeholder={'Epam@epam.com'}
        />
        <FormTextField
          className={classNames.textFieldPassword}
          control={control}
          label={t.signInAdmin.password}
          name={'password'}
          type={'password'}
        />
        <Button fullWidth>{t.signInAdmin.signIn}</Button>
      </form>
    </Card>
  )
}

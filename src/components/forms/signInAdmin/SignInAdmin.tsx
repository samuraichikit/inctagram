import { useForm } from 'react-hook-form'

import { useTranslation } from '@/common/hooks/useTranslation'
import { signInAdminSchema } from '@/common/schemas'
import { FormTextField } from '@/components/controlled/formTextField'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { z } from 'zod'

type FormValues = z.infer<ReturnType<typeof signInAdminSchema>>

export const SignInAdmin = () => {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const submitHandler = (data: FormValues) => {}

  return (
    <Card>
      <Typography variant={'h1'}>{t.signInAdmin.signIn}</Typography>
      <form onSubmit={handleSubmit(submitHandler)}>
        <FormTextField
          control={control}
          label={t.signInAdmin.email}
          name={'email'}
          placeholder={'Epam@epam.com'}
        />
        <FormTextField
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

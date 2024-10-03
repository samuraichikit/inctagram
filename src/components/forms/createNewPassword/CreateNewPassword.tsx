import { useForm } from 'react-hook-form'

import { FormTextField } from '@/components/controlled/formTextField'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './createNewPassword.module.scss'

type FormValues = z.infer<typeof newPasswordSchema>

const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/

const passwordSchema = z
  .string()
  .min(6, { message: 'Minimum number of characters 6' })
  .max(20, { message: 'Maximum number of characters 20' })
  .regex(PASSWORD_REGEX, {
    message: `Password must contain 0-9, a-z, A-Z, ! "
# $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^
_\` { | } ~`,
  })
  .trim()

const newPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    passwordConfirmation: passwordSchema,
  })
  .refine(data => data.newPassword === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  })

export const CreateNewPassword = () => {
  const classNames = {
    buttonSubmit: s.buttonSubmit,
    card: s.card,
    form: s.form,
    instructions: s.instructions,
    newPasswordInput: s.newPasswordInput,
    title: s.title,
  }

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { newPassword: '', passwordConfirmation: '' },
    mode: 'onBlur',
    resolver: zodResolver(newPasswordSchema),
  })

  const handleCreateNewPassword = () => {}

  return (
    <Card className={classNames.card}>
      <form className={classNames.form} onSubmit={handleSubmit(handleCreateNewPassword)}>
        <Typography asChild className={classNames.title} variant={'h1'}>
          <h1>Create New Password</h1>
        </Typography>
        <FormTextField
          className={classNames.newPasswordInput}
          control={control}
          label={'New password'}
          name={'newPassword'}
          type={'password'}
        />
        <FormTextField
          control={control}
          label={'Password confirmation'}
          name={'passwordConfirmation'}
          type={'password'}
        />
        <Typography className={classNames.instructions} variant={'regular_text_14'}>
          Your password must be between 6 and 20 characters
        </Typography>
        <Button className={classNames.buttonSubmit}>Create new password</Button>
      </form>
    </Card>
  )
}

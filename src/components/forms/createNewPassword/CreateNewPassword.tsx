import { useForm } from 'react-hook-form'

import { FormTextField } from '@/components/controlled/formTextField'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './createNewPassword.module.scss'

type FormValues = z.infer<typeof newPasswordSchema>

const newPasswordSchema = z.object({
  newPassword: z.string(),
  passwordConfirmation: z.string(),
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
    resolver: zodResolver(newPasswordSchema),
  })

  const handleCreateNewPassword = () => {}

  return (
    <Card className={classNames.card}>
      <form className={classNames.form} onSubmit={handleSubmit(handleCreateNewPassword)}>
        <Typography className={classNames.title} variant={'h1'}>
          Create New Password
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

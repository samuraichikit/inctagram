import { useForm } from 'react-hook-form'

import { FormTextField } from '@/components/controlled/formTextField'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type FormValues = z.infer<typeof newPasswordSchema>

const newPasswordSchema = z.object({
  newPassword: z.string(),
  passwordConfirmation: z.string(),
})

export const CreateNewPassword = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { newPassword: '', passwordConfirmation: '' },
    resolver: zodResolver(newPasswordSchema),
  })

  const handleCreateNewPassword = () => {}

  return (
    <Card>
      <form onSubmit={handleSubmit(handleCreateNewPassword)}>
        <FormTextField
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
        <Typography variant={'regular_text_14'}>
          Your password must be between 6 and 20 characters
        </Typography>
        <Button>Create new password</Button>
      </form>
    </Card>
  )
}

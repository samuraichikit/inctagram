import { FormTextField } from '@/components/controlled/formTextField'
import { useCreateNewPassword } from '@/components/forms/createNewPassword/useCreateNewPassword'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './createNewPassword.module.scss'

export const CreateNewPassword = () => {
  const classNames = {
    buttonSubmit: s.buttonSubmit,
    card: s.card,
    form: s.form,
    instructions: s.instructions,
    newPasswordInput: s.newPasswordInput,
    title: s.title,
  }
  const { control, handleCreateNewPassword, handleSubmit, isLoading, isValid, t } =
    useCreateNewPassword()

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Card className={classNames.card}>
          <form className={classNames.form} onSubmit={handleSubmit(handleCreateNewPassword)}>
            <Typography asChild className={classNames.title} variant={'h1'}>
              <h1>{t.passwordForm.createNewPassword}</h1>
            </Typography>
            <FormTextField
              className={classNames.newPasswordInput}
              control={control}
              label={t.passwordForm.newPassword}
              name={'newPassword'}
              type={'password'}
            />
            <FormTextField
              control={control}
              label={t.passwordForm.passwordConfirmation}
              name={'passwordConfirmation'}
              type={'password'}
            />
            <Typography className={classNames.instructions} variant={'regular_text_14'}>
              {t.passwordForm.passwordLengthMsg}
            </Typography>
            <Button className={classNames.buttonSubmit} disabled={!isValid}>
              {t.passwordForm.createNewPassBtn}
            </Button>
          </form>
        </Card>
      )}
    </>
  )
}

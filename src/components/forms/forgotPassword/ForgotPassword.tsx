import { useEffect } from 'react'

import { FormTextField } from '@/components/controlled/formTextField'
import { useForgotPassword } from '@/components/forms/forgotPassword/useForgotPassword'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Modal } from '@/components/ui/modal'
import { ReCaptcha } from '@/components/ui/reCaptcha'
import { Typography } from '@/components/ui/typography'
import Link from 'next/link'

import s from './forgotPassword.module.scss'

type Props = {}
export const ForgotPassword = (props: Props) => {
  const {
    buttonSentText,
    control,
    handleButtonOkClick,
    handleChangeRecaptcha,
    handleSendLink,
    handleSubmit,
    isDisabled,
    isUserEmail,
    setShowModal,
    showModal,
    t,
  } = useForgotPassword()

  return (
    <Card className={s.card}>
      <form className={s.form} onSubmit={handleSubmit(handleSendLink)}>
        <Typography asChild className={s.title} variant={'h1'}>
          <h1>{t.passwordForm.forgotPassword}</h1>
        </Typography>
        <FormTextField
          control={control}
          label={t.passwordForm.email}
          name={'email'}
          placeholder={'Epam@epam.com'}
        />
        <Typography className={s.instructions} variant={'regular_text_14'}>
          {t.passwordForm.forgotPasswordMsg}
        </Typography>
        {isUserEmail && (
          <Typography className={s.info}>
            {t.passwordForm.linkSentMsg}
            <br />
            {t.passwordForm.linkSentMsg_1}
          </Typography>
        )}
        <Button className={s.button} disabled={isDisabled} type={'submit'}>
          {buttonSentText}
        </Button>
        <Button className={s.button} variant={'text'}>
          <Link href={'/auth/signIn'}>{t.passwordForm.backToSignIn}</Link>
        </Button>
        {!isUserEmail && (
          <ReCaptcha
            onChange={handleChangeRecaptcha}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
            theme={'dark'}
          />
        )}
        <Modal onOpenChange={setShowModal} open={showModal} title={'Email sent'}>
          <div className={s.modalContent}>
            <Typography variant={'regular_text_16'}>
              {t.passwordForm.confirmationLinkMsg} {isUserEmail}
            </Typography>
            <Button onClick={handleButtonOkClick}>Ok</Button>
          </div>
        </Modal>
      </form>
    </Card>
  )
}

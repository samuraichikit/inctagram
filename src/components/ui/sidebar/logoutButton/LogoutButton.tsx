import { useState } from 'react'

import { LogoutIcon } from '@/assets/icons/Logout'
import { useTranslation } from '@/common/hooks/useTranslation'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { useLogoutMutation } from '@/services/auth'
import { useRouter } from 'next/router'

import s from './logoutButton.module.scss'

export const LogoutButton = () => {
  const classNames = {
    buttonWrapper: s.buttonWrapper,
    logoutButton: s.logoutButton,
    text: s.text,
  }
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [logOut] = useLogoutMutation()
  const router = useRouter()

  const logOutHandler = async () => {
    setIsOpen(false)
    try {
      await logOut().unwrap()
      localStorage.removeItem('accessToken')
      router.push('/auth/signIn')
    } catch (error) {
      alert('error')
    }
  }

  return (
    <div>
      <Button className={classNames.logoutButton} onClick={() => setIsOpen(true)} variant={'text'}>
        <LogoutIcon />
        {t.sideBar.logOut}
      </Button>
      <Modal className={s.modal} onOpenChange={setIsOpen} open={isOpen} title={t.sideBar.logOut}>
        <Typography className={classNames.text} variant={'regular_text_16'}>
          {t.sideBar.logOutConfirmation}
        </Typography>
        <div className={classNames.buttonWrapper}>
          <Button onClick={logOutHandler}>{t.sideBar.confirmButton}</Button>
          <Button onClick={() => setIsOpen(false)}>{t.sideBar.rejectButton}</Button>
        </div>
      </Modal>
    </div>
  )
}

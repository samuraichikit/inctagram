import { useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { useLogoutMutation } from '@/services/auth'
import { useRouter } from 'next/router'

import s from './sidebar.module.scss'

export const Sidebar = () => {
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
      console.log('error')
    }
  }

  return (
    <aside className={s.aside}>
      <Button onClick={() => setIsOpen(true)}>{t.sideBar.logOut}</Button>
      <Modal className={s.modal} onOpenChange={setIsOpen} open={isOpen} title={t.sideBar.logOut}>
        <Typography className={s.text} variant={'regular_text_16'}>
          {t.sideBar.logOutConfirmation}
        </Typography>
        <div className={s.buttonWrapper}>
          <Button onClick={logOutHandler}>Yes</Button>
          <Button onClick={() => setIsOpen(false)}>No</Button>
        </div>
      </Modal>
    </aside>
  )
}

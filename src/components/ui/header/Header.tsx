import { useCallback, useEffect, useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { LangSelect } from '@/components/langSelect/LangSelect'
import { NotificationsDropDown } from '@/components/notificationDropdown/notificationsDropDown'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/services/auth'
import { useGetNotificationsQuery } from '@/services/notifications/notificationsService'
import { NotificationType } from '@/services/notifications/notificationsService.types'
import { useSocket } from '@/services/websockets/socket'
import { getCookie } from 'cookies-next/client'
import Link from 'next/link'

import s from './header.module.scss'

export const Header = () => {
  const classNames = {
    buttonsContainer: s.buttonsContainer,
    container: s.container,
    header: s.header,
    navContainer: s.navContainer,
  }

  const { data } = useMeQuery()

  const { data: serverNotifications } = useGetNotificationsQuery({
    pageSize: 100,
    sortDirection: 'desc',
  })

  const [notifications, setNotifications] = useState<NotificationType[]>(
    serverNotifications?.items ?? []
  )

  useEffect(() => {
    if (serverNotifications?.items) {
      setNotifications(serverNotifications?.items)
    }
  }, [serverNotifications?.items])
  const handleNewNotification = useCallback(
    (notification: NotificationType) => {
      setNotifications(prev => [notification, ...prev])
    },
    [setNotifications]
  )
  const accessToken = getCookie('accessToken') as string

  useSocket(accessToken, handleNewNotification)

  const isMyProfile = !!data

  const { t } = useTranslation()

  return (
    <header className={classNames.header}>
      <div className={classNames.container}>
        <Typography variant={'large'}>Inctagram</Typography>
        <div className={classNames.navContainer}>
          {data && <NotificationsDropDown notifications={notifications} />}
          <LangSelect />
          {!isMyProfile && (
            <div className={classNames.buttonsContainer}>
              <Button asChild variant={'text'}>
                <Link data-cy={'logIn'} href={'/auth/signIn'}>
                  {t.header.signIn}
                </Link>
              </Button>
              <Button asChild data-cy={'signUp'}>
                <Link data-cy={'signUp'} href={'/auth/signUp'}>
                  {t.header.signUp}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

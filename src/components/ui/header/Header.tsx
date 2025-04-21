import { ROUTES } from '@/common/constants'
import { useNotifications } from '@/common/hooks/useNotifications'
import { useTranslation } from '@/common/hooks/useTranslation'
import { LangSelect } from '@/components/langSelect/LangSelect'
import { NotificationsDropDown } from '@/components/notificationDropdown/notificationsDropDown'
import { useMeQuery } from '@/services/auth'
import { Button, Typography } from '@samuraichikit/inc-ui-kit'
import Link from 'next/link'

import s from './header.module.scss'

export const Header = () => {
  const classNames = {
    buttonsContainer: s.buttonsContainer,
    container: s.container,
    header: s.header,
    navContainer: s.navContainer,
  }

  const { data, isError, isLoading } = useMeQuery()

  const { notifications } = useNotifications()

  const isMyProfile = !isError && !isLoading

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
                <Link data-cy={'logIn'} href={ROUTES.AUTH.SIGN_IN}>
                  {t.header.signIn}
                </Link>
              </Button>
              <Button asChild data-cy={'signUp'}>
                <Link data-cy={'signUp'} href={ROUTES.AUTH.SIGN_UP}>
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

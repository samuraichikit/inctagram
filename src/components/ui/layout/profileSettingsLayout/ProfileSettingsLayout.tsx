import { PropsWithChildren, ReactElement } from 'react'

import { Header } from '@/components/ui/header'
import { ProfileSettingsBar } from '@/components/ui/profileSettingsBar'
import { MainSidebar } from '@/components/ui/sidebar/mainSidebar'
import { useMeQuery } from '@/services/auth'
import clsx from 'clsx'
import { NextPage } from 'next'
import { usePathname } from 'next/navigation'

import s from '../baseLayout.module.scss'

export const ProfileSettingsLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const path = usePathname()
  const { isError, isLoading } = useMeQuery()

  const isMyProfile = !isLoading && !isError

  const classNames = {
    main: clsx(
      !isMyProfile && s.mainBase,
      isMyProfile && s.mainAuth,
      (path === '/auth/privacyPolicy' || path === '/auth/termsOfService') && s.privacyPolicy
    ),
  }

  return (
    <>
      <Header />
      {isMyProfile && <MainSidebar />}
      <main className={classNames.main}>
        <div className={s.formButtonWrapper}>
          <div className={s.wrapper}>
            <ProfileSettingsBar />
            {children}
          </div>
        </div>
      </main>
    </>
  )
}

export const getProfileSettingsLayout = (page: ReactElement) => {
  return <ProfileSettingsLayout>{page}</ProfileSettingsLayout>
}

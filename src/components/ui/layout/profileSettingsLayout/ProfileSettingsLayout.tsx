import React, { PropsWithChildren, ReactElement, useEffect, useState } from 'react'

import { Header } from '@/components/ui/header'
import { ProfileSettingsBar } from '@/components/ui/profileSettingsBar'
import { MainSidebar } from '@/components/ui/sidebar/mainSidebar'
import { useMeQuery } from '@/services/auth'
import clsx from 'clsx'
import { NextPage } from 'next'
import { usePathname } from 'next/navigation'

import s from '../baseLayout.module.scss'

export type pageProfileSettings = 'devices' | 'general' | 'management' | 'payments'

export const ProfileSettingsLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const path = usePathname()
  const { isError, isLoading } = useMeQuery()

  const [actualPage, setActualPage] = useState<pageProfileSettings>('general')

  useEffect(() => {
    const page = localStorage.getItem('selectProfileSettingPages')

    if (page) {
      setActualPage(JSON.parse(page))
    }
  }, [])

  const isMyProfile = !isLoading && !isError

  if (!isMyProfile) {
    return (
      <>
        <Header />
        <main className={s.mainBase}></main>
      </>
    )
  }

  const classNames = {
    main: clsx({
      [s.mainAuth]: true,
      [s.privacyPolicy]: path && ['/auth/privacyPolicy', '/auth/termsOfService'].includes(path),
    }),
  }

  return (
    <>
      <Header />
      <MainSidebar />
      <main className={classNames.main}>
        <div className={s.formButtonWrapper}>
          <div className={s.wrapper}>
            <ProfileSettingsBar actualPage={actualPage} />
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

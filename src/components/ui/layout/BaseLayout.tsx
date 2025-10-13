import React, { PropsWithChildren, ReactElement } from 'react'

import { ROUTES } from '@/common/constants'
import { useConnectSocket } from '@/common/hooks/useConnectSocket'
import { useMeQuery } from '@/services/auth'
import clsx from 'clsx'
import { NextPage } from 'next'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'

import s from './baseLayout.module.scss'

import { Header } from '../header'
import { MainSidebar } from '../sidebar/mainSidebar'

export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const path = usePathname()
  const { isError, isLoading } = useMeQuery()
  const router = useRouter()

  useConnectSocket()

  const isMyProfile = !isLoading && !isError && router.pathname !== ROUTES.AUTH.SIGN_IN

  const classNames = {
    main: clsx(
      !isMyProfile && s.mainBase,
      isMyProfile && s.mainAuth,
      (path === ROUTES.AUTH.PRIVACY_POLICY || path === ROUTES.AUTH.TERMS_OF_SERVICE) &&
        s.privacyPolicy
    ),
  }

  return (
    <>
      <Header />
      {isMyProfile && <MainSidebar />}
      <main className={classNames.main}>{children}</main>
    </>
  )
}

export const getBaseLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>
}

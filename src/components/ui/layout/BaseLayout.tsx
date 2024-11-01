import { PropsWithChildren, ReactElement } from 'react'

import { useAuth } from '@/common/hooks/useAuth'
import { useMeQuery } from '@/services/auth/authService'
import clsx from 'clsx'
import { NextPage } from 'next'

import s from './baseLayout.module.scss'

import { Header } from '../header'

export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const classNames = {
    main: s.main,
  }

  const { isAuth } = useAuth()

  return (
    <>
      <Header isAuth={isAuth} />
      <main className={classNames.main}>{children}</main>
    </>
  )
}

export const getBaseLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>
}

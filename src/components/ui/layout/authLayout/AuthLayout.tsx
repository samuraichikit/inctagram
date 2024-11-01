import { PropsWithChildren, ReactElement } from 'react'

import { useMeQuery } from '@/services/auth'
import { NextPage } from 'next'

import s from './authLayout.module.scss'

import { Header } from '../../header'
import { MainSidebar } from '../../sidebar/mainSidebar'

const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const classNames = {
    main: s.main,
  }
  const { isError, isLoading } = useMeQuery()

  const isAuth = !isError && !isLoading

  return (
    <>
      <Header isAuth={isAuth} />
      <MainSidebar />
      <main className={classNames.main}>{children}</main>
    </>
  )
}

export const getAuthLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

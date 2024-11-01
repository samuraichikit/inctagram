import { PropsWithChildren, ReactElement } from 'react'

import { useMeQuery } from '@/services/auth/authService'
import clsx from 'clsx'
import { NextPage } from 'next'

import s from './baseLayout.module.scss'

import { Header } from '../header'

const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const { data, isError, isLoading } = useMeQuery()

  const isAuth = !isError && !isLoading

  const classNames = {
    main: clsx(s.main, isAuth && s.mainIsAuth),
  }

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

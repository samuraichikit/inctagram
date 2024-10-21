import { ReactNode } from 'react'

import { useMeQuery } from '@/services/auth/authService'
import clsx from 'clsx'

import s from './lauout.module.scss'

import { Header } from '../header'
import { Sidebar } from '../sidebar'
type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  const { data, isError, isLoading } = useMeQuery()

  const isAuth = !isError && !isLoading

  const classNames = {
    main: clsx(s.main, isAuth && s.mainIsAuth),
  }

  return (
    <>
      <Header isAuth={isAuth} />
      <main className={classNames.main}>
        {isAuth && <Sidebar />}
        {children}
      </main>
    </>
  )
}

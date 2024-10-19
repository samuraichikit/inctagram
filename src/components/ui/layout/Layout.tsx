import { ReactNode } from 'react'

import { useMeQuery } from '@/services/auth/authService'

import s from './lauout.module.scss'

import { Header } from '../header'
type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  const classNames = {
    main: s.main,
  }
  const { data, isError, isLoading } = useMeQuery()

  const isAuth = !isError && !isLoading

  return (
    <>
      <Header isAuth={isAuth} />
      <main className={classNames.main}>{children}</main>
    </>
  )
}

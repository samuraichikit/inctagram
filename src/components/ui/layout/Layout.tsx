import { ReactNode } from 'react'

import { useMeQuery } from '@/services/auth/authService'

import { Header } from '../header'
type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  const { data, isError, isLoading } = useMeQuery()

  const isAuth = !isError && !isLoading

  return (
    <>
      <Header isAuth={isAuth} />
      <main>{children}</main>
    </>
  )
}

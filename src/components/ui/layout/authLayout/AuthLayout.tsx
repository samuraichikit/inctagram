import { PropsWithChildren, ReactElement } from 'react'

import { Header } from '@/components/ui/header'
import { MainSidebar } from '@/components/ui/sidebar/mainSidebar'
import { NextPage } from 'next'

import s from './authLayout.module.scss'

const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const classNames = {
    main: s.main,
  }

  return (
    <>
      <Header />
      <MainSidebar />
      <main className={classNames.main}>{children}</main>
    </>
  )
}

export const getAuthLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

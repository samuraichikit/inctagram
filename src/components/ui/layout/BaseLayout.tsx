import { PropsWithChildren, ReactElement } from 'react'

import clsx from 'clsx'
import { NextPage } from 'next'
import { usePathname } from 'next/navigation'

import s from './baseLayout.module.scss'

import { Header } from '../header'

export const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const path = usePathname()

  const classNames = {
    main: clsx(
      s.main,
      (path === '/auth/privacyPolicy' || path === '/auth/termsOfService') && s.privacyPolicy
    ),
  }

  return (
    <>
      <Header />
      <main className={classNames.main}>{children}</main>
    </>
  )
}

export const getBaseLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>
}

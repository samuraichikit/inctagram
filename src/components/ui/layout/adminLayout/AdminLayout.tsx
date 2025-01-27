import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import s from './adminLayout.module.scss'

import { HeaderAdmin } from '../../headerAdmin'

export const AdminLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const classNames = {
    main: s.main,
  }

  return (
    <>
      <HeaderAdmin />
      <main className={classNames.main}>{children}</main>
    </>
  )
}

export const getAdminLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>
}

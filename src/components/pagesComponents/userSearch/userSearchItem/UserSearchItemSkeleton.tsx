import { ComponentPropsWithoutRef, forwardRef } from 'react'
import Skeleton from 'react-loading-skeleton'

import s from './userSearchItem.module.scss'

export const UserSearchItemSkeleton = () => {
  const classNames = {
    container: s.container,
    userFullname: s.userFullname,
    userName: s.userName,
  }

  return (
    <div className={classNames.container}>
      <Skeleton circle height={48} width={48} />
      <div>
        <Skeleton height={24} width={117} />
        <Skeleton height={24} width={117} />
      </div>
    </div>
  )
}

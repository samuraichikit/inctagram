import Skeleton from 'react-loading-skeleton'

import s from './adminUserInfo.module.scss'

export const AdminUserInfoSkeleton = () => {
  const classNames = {
    accountInfoContainer: s.accountInfoContainer,
    adminUserInfoContainer: s.adminUserInfoContainer,
    creationDate: s.creationDate,
    creationDateContainer: s.creationDateContainer,
    userDetailsContainer: s.userDetailsContainer,
    userId: s.userId,
    userIdContainer: s.userIdContainer,
    userName: s.userName,
    userNameContainer: s.userNameContainer,
  }

  return (
    <div className={classNames.adminUserInfoContainer}>
      <div className={classNames.userDetailsContainer}>
        <Skeleton circle height={60} width={60} />
        <div className={classNames.userNameContainer}>
          <Skeleton height={36} />
          <Skeleton height={24} />
        </div>
      </div>
      <div className={classNames.accountInfoContainer}>
        <div className={classNames.userIdContainer}>
          <Skeleton height={24} />
          <Skeleton height={24} />
        </div>
        <div className={classNames.creationDateContainer}>
          <Skeleton height={24} />
          <Skeleton height={24} />
        </div>
      </div>
    </div>
  )
}

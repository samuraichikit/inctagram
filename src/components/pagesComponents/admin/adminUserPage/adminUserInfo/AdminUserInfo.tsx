import { formatDate } from '@/common/utils'
import { Avatar } from '@/components/ui/avatar'
import { Typography } from '@/components/ui/typography'
import { useGetUserQuery } from '@/services/admin/usersService.generated'
import { useRouter } from 'next/router'

import s from './adminUserInfo.module.scss'

export const AdminUserInfo = () => {
  const classNames = {
    accountInfoContainer: s.accountInfoContainer,
    adminUserInfoContainer: s.adminUserInfoContainer,
    creationDate: s.creationDate,
    creationDateContainer: s.creationDateContainer,
    userDetailsContainer: s.userDetailsContainer,
    userId: s.userId,
    userIdContainer: s.userIdContainer,
    userName: s.userName,
  }
  const { query } = useRouter()
  const userId = Number(query.id)
  const { data } = useGetUserQuery({ variables: { userId } })

  if (!data?.getUser.profile) {
    return null
  }

  const { avatars, createdAt, firstName, id, lastName, userName } = data.getUser.profile

  return (
    <div className={classNames.adminUserInfoContainer}>
      <div className={classNames.userDetailsContainer}>
        <Avatar height={60} src={avatars?.[0]?.url} width={60} />
        <div>
          <Typography asChild variant={'h1'}>
            <h1>
              {firstName} {lastName}
            </h1>
          </Typography>
          <Typography className={classNames.userName} variant={'regular_link'}>
            {userName}
          </Typography>
        </div>
      </div>
      <div className={classNames.accountInfoContainer}>
        <div className={classNames.userIdContainer}>
          <Typography className={classNames.userId}>UserID</Typography>
          <Typography variant={'regular_text_16'}>{id}</Typography>
        </div>
        <div className={classNames.creationDateContainer}>
          <Typography className={classNames.creationDate}>Profile Creation Date</Typography>
          <Typography variant={'regular_text_16'}>{formatDate(createdAt)}</Typography>
        </div>
      </div>
    </div>
  )
}

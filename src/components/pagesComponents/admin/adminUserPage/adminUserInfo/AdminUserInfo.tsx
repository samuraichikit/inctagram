import { useTranslation } from '@/common/hooks/useTranslation'
import { formatDate } from '@/common/utils'
import { Avatar } from '@/components/ui/avatar'
import { useGetUserQuery } from '@/services/admin/usersService.generated'
import { Typography } from '@samuraichikit/inc-ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './adminUserInfo.module.scss'

import { AdminUserInfoSkeleton } from './AdminUserInfoSkeleton'

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
  const { data, loading } = useGetUserQuery({
    variables: { userId },
  })
  const { t } = useTranslation()

  if (loading) {
    return <AdminUserInfoSkeleton />
  }

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
          <Typography asChild className={classNames.userName} variant={'regular_link'}>
            <Link href={`/profile/${userId}`}>{userName}</Link>
          </Typography>
        </div>
      </div>
      <div className={classNames.accountInfoContainer}>
        <div className={classNames.userIdContainer}>
          <Typography className={classNames.userId}>{t.adminUserPage.userId}</Typography>
          <Typography variant={'regular_text_16'}>{id}</Typography>
        </div>
        <div className={classNames.creationDateContainer}>
          <Typography className={classNames.creationDate}>
            {t.adminUserPage.profileCreationDate}
          </Typography>
          <Typography variant={'regular_text_16'}>{formatDate(createdAt)}</Typography>
        </div>
      </div>
    </div>
  )
}

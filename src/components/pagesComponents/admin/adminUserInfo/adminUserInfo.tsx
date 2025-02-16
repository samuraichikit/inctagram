import { formatDate } from '@/common/utils'
import { Avatar } from '@/components/ui/avatar'
import { Typography } from '@/components/ui/typography'
import { useGetUserQuery } from '@/services/admin/usersService.generated'
import { useRouter } from 'next/router'

export const AdminUserInfo = () => {
  const { query } = useRouter()
  const userId = Number(query.id)
  const { data } = useGetUserQuery({ variables: { userId: userId } })

  if (!data?.getUser.profile) {
    return null
  }

  const { avatars, createdAt, firstName, id, lastName, userName } = data.getUser.profile

  return (
    <div>
      <Avatar height={60} src={avatars?.[0]?.url} width={60} />
      <Typography asChild variant={'h1'}>
        <h1>
          {firstName} {lastName}
        </h1>
      </Typography>
      <Typography variant={'regular_link'}>{userName}</Typography>
      <Typography>UserID</Typography>
      <Typography variant={'regular_text_16'}>{id}</Typography>
      <Typography>Profile Creation Date</Typography>
      <Typography variant={'regular_text_16'}>{formatDate(createdAt)}</Typography>
    </div>
  )
}

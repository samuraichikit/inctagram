import TimeAgo from 'react-timeago'

import { Typography } from '@/components/ui/typography'
import { PublicPostResponse } from '@/services/publicPosts'

import { PublicImages } from './publicImages'
import { UserInfo } from './userInfo'

type Props = {
  post: PublicPostResponse
}

export const PublicPost = ({ post }: Props) => {
  const { avatarOwner, createdAt, description, images, userName } = post

  return (
    <>
      <PublicImages images={images} />
      <UserInfo src={avatarOwner} userName={userName} />
      <TimeAgo date={createdAt} />
      <Typography variant={'regular_text_14'}>{description}</Typography>
    </>
  )
}

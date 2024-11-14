import TimeAgo from 'react-timeago'

import { Typography } from '@/components/ui/typography'
import { PublicPostResponse } from '@/services/publicPosts'

import s from './publicPost.module.scss'

import { PublicImages } from './publicImages'
import { UserInfo } from './userInfo'

type Props = {
  post: PublicPostResponse
}

export const PublicPost = ({ post }: Props) => {
  const { avatarOwner, createdAt, description, images, userName } = post

  const classNames = {
    container: s.container,
    description: s.description,
    timeAgo: s.timeAgo,
  }

  return (
    <div className={classNames.container}>
      <PublicImages images={images} />
      <UserInfo src={avatarOwner} userName={userName} />
      <Typography className={classNames.timeAgo} variant={'small_text'}>
        <TimeAgo date={createdAt} />
      </Typography>
      <Typography className={classNames.description} variant={'regular_text_14'}>
        {description}
      </Typography>
    </div>
  )
}

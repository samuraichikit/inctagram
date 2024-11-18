import { useState } from 'react'
import TimeAgo from 'react-timeago'

import { MAX_COUNT_CHARACTERS, MIN_COUNT_CHARACTERS } from '@/common/constants'
import { Typography } from '@/components/ui/typography'
import { PublicPostResponse } from '@/services/publicPosts'
import Link from 'next/link'

import s from './publicPost.module.scss'

import { PublicImages } from './publicImages'
import { UserInfo } from './userInfo'

type Props = {
  post: PublicPostResponse
}

export const PublicPost = ({ post }: Props) => {
  const { avatarOwner, createdAt, description, images, userName } = post
  const [isExpanded, setIsExpanded] = useState(false)

  const classNames = {
    container: s.container,
    description: s.description,
    publicImagesContainer: s.publicImagesContainer,
    showMore: s.showMore,
    timeAgo: s.timeAgo,
  }

  const shownDescription = isExpanded
    ? `${description.slice(0, MAX_COUNT_CHARACTERS)}..`
    : `${description.slice(0, MIN_COUNT_CHARACTERS)}...`

  const toggleDescriptionDisplayHandler = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={classNames.container}>
      <Link
        className={classNames.publicImagesContainer}
        href={`/profile/${post.ownerId}/${post.id}`}
      >
        <PublicImages height={240} images={images} isExpanded={isExpanded} width={234} />
      </Link>
      <UserInfo src={avatarOwner} userName={userName} />
      <Typography className={classNames.timeAgo} variant={'small_text'}>
        <TimeAgo date={createdAt} />
      </Typography>
      {description && (
        <Typography className={classNames.description} variant={'regular_text_14'}>
          {shownDescription}{' '}
        </Typography>
      )}
      {description && (
        <Typography asChild onClick={toggleDescriptionDisplayHandler} variant={'regular_link'}>
          <span> {isExpanded ? 'Hide' : 'Show more'} </span>
        </Typography>
      )}
    </div>
  )
}

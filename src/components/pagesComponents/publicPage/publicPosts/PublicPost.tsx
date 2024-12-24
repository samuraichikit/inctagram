import { useState } from 'react'

import { MAX_COUNT_CHARACTERS, MIN_COUNT_CHARACTERS } from '@/common/constants'
import { useTranslation } from '@/common/hooks/useTranslation'
import { TimeAgoDisplay } from '@/components/ui/timeAgoDisplay'
import { Typography } from '@/components/ui/typography'
import { PublicPostResponse } from '@/services/publicPosts'
import Link from 'next/link'

import s from './publicPost.module.scss'

import { PostImages } from './postImages'
import { UserInfo } from './userInfo'

type Props = {
  post: PublicPostResponse
}

export const PublicPost = ({ post }: Props) => {
  const { avatarOwner, createdAt, description, images, userName } = post
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useTranslation()

  const classNames = {
    container: s.container,
    description: s.description,
    postImagesContainer: s.postImagesContainer,
    showMore: s.showMore,
    timeAgo: s.timeAgo,
  }

  const isVisibleShowMore = description.length >= MIN_COUNT_CHARACTERS && description

  const showDescription = (charactersCount: number, description: string, content: string) => {
    return description.length >= charactersCount
      ? `${description.slice(0, charactersCount)}${content}`
      : `${description.slice(0, charactersCount)}`
  }

  const shownDescription = isExpanded
    ? showDescription(MAX_COUNT_CHARACTERS, description, '..')
    : showDescription(MIN_COUNT_CHARACTERS, description, '...')

  const toggleDescriptionDisplayHandler = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={classNames.container}>
      <Link className={classNames.postImagesContainer} href={`/profile/${post.ownerId}/${post.id}`}>
        <PostImages height={240} images={images} isExpanded={isExpanded} width={234} />
      </Link>
      <UserInfo src={avatarOwner} userName={userName} />
      <TimeAgoDisplay className={classNames.timeAgo} date={createdAt} />
      {description && (
        <Typography className={classNames.description} variant={'regular_text_14'}>
          {shownDescription}{' '}
        </Typography>
      )}
      {isVisibleShowMore && (
        <Typography asChild onClick={toggleDescriptionDisplayHandler} variant={'regular_link'}>
          <span> {isExpanded ? t.publicPosts.hide : t.publicPosts.showMore} </span>
        </Typography>
      )}
    </div>
  )
}

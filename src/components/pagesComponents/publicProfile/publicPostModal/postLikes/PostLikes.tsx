import { formatDate } from '@/common/utils'
import { Avatar } from '@/components/ui/avatar'
import { Typography } from '@/components/ui/typography'

import s from './postLikes.module.scss'

type Props = {
  avatarsSrc: string[]
  createdAt: string
  likesCount: number
}

export const PostLikes = ({ avatarsSrc, createdAt, likesCount }: Props) => {
  const classNames = {
    avatarWrapper: s.avatarWrapper,
    avatarsContainer: s.avatarsContainer,
    avatarsWithLikes: s.avatarsWithLikes,
    container: s.container,
    date: s.date,
  }
  const shouldDisplayAvatars = avatarsSrc?.length > 0

  return (
    <div className={classNames.container}>
      {shouldDisplayAvatars && (
        <div className={classNames.avatarsWithLikes}>
          <div className={classNames.avatarsContainer}>
            {avatarsSrc.map(avatarSrc => {
              return (
                <div className={classNames.avatarWrapper} key={avatarSrc}>
                  <Avatar height={24} src={avatarSrc} width={24} />
                </div>
              )
            })}
          </div>
          {<span>{`${likesCount} "Like"`}</span>}
        </div>
      )}
      <Typography className={classNames.date} variant={'small_text'}>
        {formatDate(createdAt)}
      </Typography>
    </div>
  )
}

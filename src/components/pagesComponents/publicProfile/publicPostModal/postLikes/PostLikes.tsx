import { AVATARS_COUNT_WHO_LIKES } from '@/common/constants'
import { useTranslation } from '@/common/hooks/useTranslation'
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
  const { t } = useTranslation()
  const shouldDisplayAvatars = avatarsSrc?.length > 0
  const avatars = avatarsSrc.slice(0, AVATARS_COUNT_WHO_LIKES).reverse()

  return (
    <div className={classNames.container}>
      {shouldDisplayAvatars && (
        <div className={classNames.avatarsWithLikes}>
          <div className={classNames.avatarsContainer}>
            {avatars.map(avatarSrc => {
              return (
                <div className={classNames.avatarWrapper} key={avatarSrc}>
                  <Avatar height={24} src={avatarSrc} width={24} />
                </div>
              )
            })}
          </div>
          {
            <Typography variant={'regular_text_14'}>
              {t.publicPosts.getCount(likesCount)}
            </Typography>
          }
        </div>
      )}
      <Typography className={classNames.date} variant={'small_text'}>
        {formatDate(createdAt)}
      </Typography>
    </div>
  )
}

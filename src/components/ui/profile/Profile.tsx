import { useEffect, useState } from 'react'

import { ImageOutline } from '@/assets/icons/ImageOutline'
import { useTranslation } from '@/common/hooks/useTranslation'
import { PublicPostModal } from '@/components/pagesComponents/publicProfile/publicPostModal'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/services/auth'
import { useGetProfileQuery, useGetProfileWithPostsQuery } from '@/services/profile'
import { Comment, PublicPostResponse } from '@/services/publicPosts'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './profile.module.scss'

import { Avatar } from '../avatar'

type Props = {
  comments: Comment[]
  post: PublicPostResponse
}

export const Profile = ({ comments, post }: Props) => {
  const { data: meInfo } = useMeQuery()
  const { data: profileInfo } = useGetProfileWithPostsQuery(meInfo?.userName as string)
  const { t } = useTranslation()
  const followArray = [
    profileInfo?.followingCount,
    profileInfo?.followersCount,
    profileInfo?.publicationsCount,
  ]

  const { data } = useGetProfileQuery()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { push } = router
  const avatarSrc = (post ? post.avatarOwner : profileInfo?.avatars[0]?.url) ?? ''

  useEffect(() => {
    if (post) {
      setIsOpen(true)
    }
  }, [post])

  const closeHandler = () => {
    setIsOpen(false)
    push('/')
  }

  return (
    <div className={clsx(post && s.wrapper)}>
      <PublicPostModal comments={comments} isOpen={isOpen} onClose={closeHandler} post={post} />
      <div className={s.infoWrapper}>
        <div className={s.avatarWrapper}>
          {profileInfo?.avatars.length !== 0 ? (
            <Avatar height={204} src={avatarSrc} width={204} />
          ) : (
            <ImageOutline height={48} width={48} />
          )}
        </div>
        <div className={s.profileWrapper}>
          <div className={s.userNameWrapper}>
            <Typography variant={'h1'}>{profileInfo?.userName}</Typography>
            <Button
              onClick={() => router.push(`settings/general/${profileInfo?.id}`)}
              variant={'secondary'}
            >
              {t.profile.settings.profileSettings}
            </Button>
          </div>
          <div className={s.followInfoWrapper}>
            <ul className={s.followInfoList}>
              {followArray.map((el, i) => (
                <li className={s.followInfoItem} key={i}>
                  <Typography variant={'bold_text_14'}>{el}</Typography>
                  <Typography variant={'regular_text_14'}>
                    {i === 0 && t.profile.following}
                    {i === 1 && t.profile.followers}
                    {i === 2 && t.profile.publications}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Typography className={s.aboutMe}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { PostModal } from '@/components/pagesComponents/profile/postModal/PostModal'
import { UserPosts } from '@/components/pagesComponents/profile/userPosts'
import { PublicPostModal } from '@/components/pagesComponents/publicProfile/publicPostModal'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/profile/profilePhoto/avatar/Avatar'
import { BlankCover } from '@/components/ui/profile/profilePhoto/blankCover/BlankCover'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/services/auth'
import { useGetProfileWithPostsQuery, useGetPublicProfileQuery } from '@/services/profile'
import { Comment, PublicPostResponse } from '@/services/publicPosts'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

import s from './profile.module.scss'

type Props = {
  comments: Comment[]
  post: PublicPostResponse
}

export type Params = {
  id: string[]
} | null

export const Profile = ({ comments, post }: Props) => {
  const params: Params = useParams()

  const { data: meInfo } = useMeQuery()
  const { data: profileWithPosts } = useGetProfileWithPostsQuery(meInfo?.userName as string)
  const { data: profileInfo } = useGetPublicProfileQuery(params?.id[0] as string)
  const { t } = useTranslation()
  const followArray = [
    profileInfo?.userMetadata.following,
    profileInfo?.userMetadata.followers,
    profileInfo?.userMetadata.publications,
  ]

  const isMyProfile = meInfo?.userId === Number(params?.id[0])

  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { push } = router

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
    <div className={s.wrapper}>
      {isMyProfile ? (
        <PostModal isOpen={isOpen} onClose={closeHandler} />
      ) : (
        <PublicPostModal comments={comments} isOpen={isOpen} onClose={closeHandler} post={post} />
      )}
      <div className={s.infoWrapper}>
        {profileInfo?.avatars.length !== 0 ? (
          <div>
            {' '}
            <Avatar size={192} src={profileWithPosts?.avatars[0]?.url ?? null} />
          </div>
        ) : (
          <div>
            <BlankCover />
          </div>
        )}
        <div className={s.profileWrapper}>
          <div className={s.userNameWrapper}>
            <Typography variant={'h1'}>{profileInfo?.userName}</Typography>
            {isMyProfile && (
              <Button
                onClick={() => router.push(`settings/general/${profileInfo?.id}`)}
                variant={'secondary'}
              >
                {t.profile.settings.profileSettings}
              </Button>
            )}
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
            <Typography className={s.aboutMe}>{profileInfo?.aboutMe}</Typography>
          </div>
        </div>
      </div>
      <div className={s.userPostsContainer}>
        {meInfo?.userName && <UserPosts userName={meInfo?.userName} />}
      </div>
    </div>
  )
}

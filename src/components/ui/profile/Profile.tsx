import { useEffect, useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { PostModal } from '@/components/pagesComponents/profile/postModal/PostModal'
import { UserPosts } from '@/components/pagesComponents/profile/userPosts'
import { PublicPostModal } from '@/components/pagesComponents/publicProfile/publicPostModal'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/profile/profilePhoto/avatar/Avatar'
import { BlankCover } from '@/components/ui/profile/profilePhoto/blankCover/BlankCover'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/services/auth'
import { useGetProfileWithPostsQuery } from '@/services/profile'
import { useGetPublicProfileQuery } from '@/services/publicUser'
import { useRouter } from 'next/router'

import s from './profile.module.scss'

export const Profile = () => {
  const router = useRouter()
  const { push } = router

  const { id, skipSSR } = router.query
  const userId = id?.[0] ?? ''
  const postId = id?.[1] ?? ''
  const isPublic = !skipSSR

  const { data: meInfo, isError: isMeError, isLoading: isMeLoading } = useMeQuery()
  const { data: profileWithPosts } = useGetProfileWithPostsQuery(meInfo?.userName as string, {
    skip: isPublic,
  })
  const { data: profileInfo } = useGetPublicProfileQuery(
    { profileId: userId },
    { skip: router.isFallback }
  )

  const { t } = useTranslation()
  const followArray = [
    profileInfo?.userMetadata.following,
    profileInfo?.userMetadata.followers,
    profileInfo?.userMetadata.publications,
  ]

  const userName = meInfo?.userName ?? profileInfo?.userName
  const aboutMe = profileInfo?.aboutMe
  const avatarSrc = profileInfo?.avatars[0]?.url ?? profileWithPosts?.avatars[0]?.url
  const profileId = profileInfo?.id

  const isMyProfile = !isMeLoading && !isMeError

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (postId) {
      setIsOpen(true)
    }
  }, [postId])

  const closeHandler = () => {
    setIsOpen(false)
    push('/')
  }

  return (
    <div className={s.wrapper}>
      {isMyProfile ? (
        <PostModal isOpen={isOpen} onClose={closeHandler} />
      ) : (
       postId && <PublicPostModal isOpen={isOpen} onClose={closeHandler} postId={postId} />
      )}
      <div className={s.infoWrapper}>
        {avatarSrc ? (
          <div>
            <Avatar size={192} src={avatarSrc ?? null} />
          </div>
        ) : (
          <div>
            <BlankCover />
          </div>
        )}
        <div className={s.profileWrapper}>
          <div className={s.userNameWrapper
                          
                          
                          
                          
                          
            <Typography variant={'h1'}>{userName}</Typography>
            {isMyProfile && (
              <Button
                onClick={() => router.push(`/profile/settings/general/${profileId}`)}
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
            <Typography className={s.aboutMe}>{aboutMe}</Typography>
          </div>
        </div>
      </div>
      <div className={s.userPostsContainer}>
        {userName && <UserPosts isPublic={isPublic} userName={userName} />}
      </div>
    </div>
  )
}

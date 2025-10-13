import { useEffect, useState } from 'react'

import { ROUTES } from '@/common/constants'
import { useTranslation } from '@/common/hooks/useTranslation'
import { FollowUnfollowButton } from '@/components/pagesComponents/profile/followUnfollowButton'
import { PostModal } from '@/components/pagesComponents/profile/postModal/PostModal'
import { UserPosts } from '@/components/pagesComponents/profile/userPosts'
import { PublicPostModal } from '@/components/pagesComponents/publicProfile/publicPostModal'
import FollowUnfollowList from '@/components/ui/profile/FollowUnfollowList'
import { Avatar } from '@/components/ui/profile/profilePhoto/avatar/Avatar'
import { BlankCover } from '@/components/ui/profile/profilePhoto/blankCover/BlankCover'
import { useMeQuery } from '@/services/auth'
import { useGetProfileWithPostsQuery } from '@/services/profile'
import { useGetPublicProfileQuery } from '@/services/publicUser'
import { Button, Typography } from '@samuraichikit/inc-ui-kit'
import { useRouter } from 'next/router'

import s from './profile.module.scss'

export const Profile = () => {
  const router = useRouter()
  const { push } = router
  const { id } = router.query
  const userId = id?.[0] ?? ''
  const postId = id?.[1] ?? ''

  const { data: meInfo } = useMeQuery()
  const isAuth = !!meInfo?.userId
  const isMyProfile = meInfo?.userId === Number(userId)

  const { data: profileInfo } = useGetPublicProfileQuery(
    { profileId: userId },
    { skip: router.isFallback }
  )
  const { data: profileWithPosts } = useGetProfileWithPostsQuery(profileInfo?.userName as string, {
    skip: !profileInfo?.userName || !isAuth,
  })

  const { t } = useTranslation()
  const followArray = [
    profileWithPosts?.followingCount,
    profileWithPosts?.followersCount,
    profileWithPosts?.publicationsCount,
  ]
  const userName = profileInfo?.userName
  const aboutMe = profileInfo?.aboutMe
  const avatarSrc = profileInfo?.avatars[0]?.url ?? profileWithPosts?.avatars[0]?.url
  const profileId = profileInfo?.id ?? ''
  const isShowFollowUnfollowButton = !isMyProfile && isAuth
  const isFollowing = profileWithPosts?.isFollowing

  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContentType, setModalContentType] = useState<'followers' | 'following'>('following')

  const handleFollowItemClick = (index: number) => {
    if (index === 1) {
      setModalContentType('following')
      setIsModalOpen(true)
    } else if (index === 0) {
      setModalContentType('followers')
      setIsModalOpen(true)
    }
  }

  useEffect(() => {
    if (!postId) {
      return
    }
    setIsOpen(true)
    push(ROUTES.PROFILE.USER_POST({ id: userId, postId }), undefined, { shallow: true })
  }, [postId])

  const closeHandler = () => {
    setIsOpen(false)
    push(ROUTES.PROFILE.USER_PROFILE(userId), undefined, { shallow: true })
  }

  return (
    <div className={s.wrapper}>
      {isMyProfile && isOpen && <PostModal isOpen={isOpen} onClose={closeHandler} />}
      {!isMyProfile && postId && isOpen && (
        <PublicPostModal isOpen={isOpen} onClose={closeHandler} postId={postId} />
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
          <div className={s.userNameWrapper}>
            <Typography variant={'h1'}>{userName}</Typography>
            {isMyProfile && (
              <Button
                onClick={() => router.push(ROUTES.PROFILE.SETTINGS.GENERAL(profileId))}
                variant={'secondary'}
              >
                {t.profile.settings.profileSettings}
              </Button>
            )}
            <FollowUnfollowButton
              isFollowing={isFollowing}
              isShowFollowUnfollowButton={isShowFollowUnfollowButton}
              selectedUserId={Number(id)}
            />
          </div>
          <div className={s.followInfoWrapper}>
            <ul className={s.followInfoList}>
              {followArray.map((el, i) => (
                <li
                  className={s.followInfoItem}
                  key={i}
                  onClick={() => handleFollowItemClick(i)}
                  style={{ cursor: i !== 2 ? 'pointer' : 'default' }}
                >
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
          {isModalOpen && (
            <FollowUnfollowList
              initialTab={modalContentType}
              onClose={() => setIsModalOpen(false)}
              userName={userName}
            />
          )}
          <div>
            <Typography className={s.aboutMe}>{aboutMe}</Typography>
          </div>
        </div>
      </div>
      <div className={s.userPostsContainer}>{userName && <UserPosts userName={userName} />}</div>
    </div>
  )
}

import { useTranslation } from '@/common/hooks/useTranslation'
import { FollowUnfollowButton } from '@/components/pagesComponents/profile/followUnfollowButton'
import { GeneralSettingsButton } from '@/components/pagesComponents/profile/generalSettingsButton'
import { ProfileAvatar } from '@/components/pagesComponents/profile/profileAvatar'
import { ProfileModal } from '@/components/pagesComponents/profile/profileModal'
import { UserPosts } from '@/components/pagesComponents/profile/userPosts'
import { useMeQuery } from '@/services/auth'
import { useGetProfileWithPostsQuery } from '@/services/profile'
import { useGetPublicProfileQuery } from '@/services/publicUser'
import { Typography } from '@samuraichikit/inc-ui-kit'
import { useRouter } from 'next/router'

import s from './profile.module.scss'

export const Profile = () => {
  const router = useRouter()
  const { id } = router.query
  const userId = id?.[0] ?? ''
  const postId = id?.[1] ?? ''
  const { data: meInfo } = useMeQuery()

  const isAuth = !!meInfo?.userId
  const { data: profileInfo } = useGetPublicProfileQuery(
    { profileId: userId },
    { skip: router.isFallback }
  )
  const { data: profileWithPosts } = useGetProfileWithPostsQuery(profileInfo?.userName ?? '', {
    skip: !profileInfo?.userName || !isAuth,
  })

  const { t } = useTranslation()
  const followArray = [
    profileInfo?.userMetadata.following ?? profileWithPosts?.followingCount,
    profileInfo?.userMetadata.followers ?? profileWithPosts?.followersCount,
    profileInfo?.userMetadata.publications ?? profileWithPosts?.publicationsCount,
  ]
  const isMyProfile = meInfo?.userId === Number(userId)
  const userName = profileInfo?.userName
  const aboutMe = profileInfo?.aboutMe
  const avatarSrc = profileInfo?.avatars[0]?.url ?? profileWithPosts?.avatars[0]?.url
  const profileId = profileInfo?.id ?? ''
  const isShowFollowUnfollowButton = !isMyProfile && isAuth
  const isFollowing = profileWithPosts?.isFollowing

  return (
    <div className={s.wrapper}>
      <ProfileModal isMyProfile={isMyProfile} postId={postId} userId={userId} />
      <div className={s.infoWrapper}>
        <ProfileAvatar />
        <div className={s.profileWrapper}>
          <div className={s.userNameWrapper}>
            <Typography variant={'h1'}>{userName}</Typography>
            <GeneralSettingsButton isMyProfile={isMyProfile} profileId={profileId} />
            <FollowUnfollowButton
              isFollowing={isFollowing}
              isShowFollowUnfollowButton={isShowFollowUnfollowButton}
              selectedUserId={Number(id)}
            />
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
      <div className={s.userPostsContainer}>{userName && <UserPosts userName={userName} />}</div>
    </div>
  )
}

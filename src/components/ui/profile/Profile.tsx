import { useEffect, useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { UserPosts } from '@/components/pagesComponents/profile/userPosts'
import { PublicPostModal } from '@/components/pagesComponents/publicProfile/publicPostModal'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/profile/profilePhoto/avatar/Avatar'
import { BlankCover } from '@/components/ui/profile/profilePhoto/blankCover/BlankCover'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/services/auth'
import {
  GetPublicProfileResponse,
  useGetProfileWithPostsQuery,
  useGetPublicProfileQuery,
} from '@/services/profile'
import { Comment, PublicPostResponse } from '@/services/publicPosts'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

import s from './profile.module.scss'

type Props = {
  comments?: Comment[]
  post?: PublicPostResponse
  publicPostsTotalCount?: number
  publicProfile?: GetPublicProfileResponse
  userPosts?: PublicPostResponse[]
}

type Params = {
  id: string[]
} | null

export const Profile = ({
  comments,
  post,
  publicPostsTotalCount,
  publicProfile,
  userPosts,
}: Props) => {
  const params: Params = useParams()

  const { data: meInfo } = useMeQuery()
  const { data: profileWithPosts } = useGetProfileWithPostsQuery(meInfo?.userName as string, {
    skip: !!publicProfile,
  })
  const { data: profileInfo } = useGetPublicProfileQuery(params?.id[0] as string, {
    skip: !!publicProfile,
  })

  const { t } = useTranslation()
  const followArray = [
    publicProfile?.userMetadata.following ?? profileInfo?.userMetadata.following,
    publicProfile?.userMetadata.followers ?? profileInfo?.userMetadata.followers,
    publicProfile?.userMetadata.publications ?? profileInfo?.userMetadata.publications,
  ]

  const userName = publicProfile?.userName ?? meInfo?.userName
  const aboutMe = publicProfile?.aboutMe ?? profileInfo?.aboutMe
  const avatarSrc = publicProfile?.avatars[0]?.url ?? profileWithPosts?.avatars[0]?.url
  const profileId = publicProfile?.id ?? profileInfo?.id

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
      {post && comments && (
        <PublicPostModal comments={comments} isOpen={isOpen} onClose={closeHandler} post={post} />
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
                onClick={() => router.push(`settings/general/${profileId}`)}
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
        {userName && (
          <UserPosts
            publicPostsTotalCount={publicPostsTotalCount ?? null}
            userName={userName}
            userPosts={userPosts ?? []}
          />
        )}
      </div>
    </div>
  )
}

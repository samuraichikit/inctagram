import { useEffect, useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { PublicPostModal } from '@/components/pagesComponents/publicProfile/publicPostModal'
import { Button } from '@/components/ui/button'
import { ProfilePhotoEdit } from '@/components/ui/profile/profilePhoto/profilePhotoEdit/ProfilePhotoEdit'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/services/auth'
import {
  useGetProfileQuery,
  useGetProfileWithPostsQuery,
  useGetPublicProfileQuery,
} from '@/services/profile'
import { Comment, PublicPostResponse } from '@/services/publicPosts'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

import s from './profile.module.scss'

type Props = {
  comments: Comment[]
  post: PublicPostResponse
}

type Params = {
  id: string[]
} | null

export const Profile = ({ comments, post }: Props) => {
  const params: Params = useParams()

  const { data: meInfo } = useMeQuery()
  const { data } = useGetProfileQuery()
  const { data: profileWithPosts } = useGetProfileWithPostsQuery(meInfo?.userName as string)
  const { data: profileInfo } = useGetPublicProfileQuery(params?.id[0] as string)

  const { t } = useTranslation()
  const followArray = [
    profileInfo?.userMetadata.following,
    profileInfo?.userMetadata.followers,
    profileInfo?.userMetadata.publications,
  ]

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
        {profileInfo?.avatars.length !== 0 ? (
          <ProfilePhotoEdit avatar={profileWithPosts?.avatars[0]?.url ?? null} />
        ) : (
          <ProfilePhotoEdit />
        )}
        <div className={s.profileWrapper}>
          <div className={s.userNameWrapper}>
            <Typography variant={'h1'}>{profileInfo?.userName}</Typography>
            <Button
              disabled={String(meInfo?.userId) !== params?.id[0]}
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

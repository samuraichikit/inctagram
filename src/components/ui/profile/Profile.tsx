import { Avatar } from '@/assets/icons/Avatar'
import { useTranslation } from '@/common/hooks/useTranslation'
import { useMeQuery } from '@/services/auth'
import { useGetProfileWithPostsQuery } from '@/services/profile'

import s from './profile.module.scss'

import { Button } from '../button'
import { Typography } from '../typography'

export const Profile = () => {
  const { data: meInfo } = useMeQuery()
  const { data: profileInfo } = useGetProfileWithPostsQuery(meInfo?.userName as string)
  const { t } = useTranslation()
  const followArray = [
    profileInfo?.followingCount,
    profileInfo?.followersCount,
    profileInfo?.publicationsCount,
  ]

  console.log(profileInfo)

  return (
    <div className={s.wrapper}>
      <div className={s.infoWrapper}>
        <div className={s.avatarWrapper}>
          {profileInfo?.avatars.length !== 0 ? (
            <img alt={'Avatar'} src={profileInfo?.avatars[0].url} />
          ) : (
            <Avatar height={204} width={204} />
          )}
        </div>
        <div className={s.profieWrapper}>
          <div className={s.userNameWrapper}>
            <Typography variant={'h1'}>{profileInfo?.userName}</Typography>
            <Button variant={'secondary'}>Profile Settings</Button>
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
          <Typography className={s.aboutMe}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Typography>
        </div>
      </div>
    </div>
  )
}

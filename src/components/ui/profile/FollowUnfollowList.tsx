import React, { useEffect, useState } from 'react'

import { CrossIcon } from '@/assets/icons/CrossIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { Avatar } from '@/components/ui/profile/profilePhoto/avatar'
import { BlankCover } from '@/components/ui/profile/profilePhoto/blankCover'
import {
  useGetUserFollowersQuery,
  useGetUserFollowingQuery,
} from '@/services/usersFollowingAndFollowers'
import { ScrollArea } from '@samuraichikit/inc-ui-kit'

import s from '@/components/ui/profile/followUnfollowList.module.scss'

type Props = {
  initialTab: 'followers' | 'following'
  onClose?: () => void
  userName?: string
}

const FollowUnfollowList = ({ initialTab, onClose, userName }: Props) => {
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>(initialTab)
  const { data: followingData } = useGetUserFollowingQuery({ userName })
  const { data: followersData } = useGetUserFollowersQuery({ userName })
  const { t } = useTranslation()

  const currentData = activeTab === 'following' ? followingData : followersData

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  return (
    <div className={s.followUnfollowTable}>
      <div className={s.title}>
        {initialTab === 'followers' ? t.profile.following : t.profile.followers}
        <button className={s.closeBtn} onClick={onClose} type={'button'}>
          <CrossIcon />
        </button>
      </div>
      <ScrollArea className={s.ScrollArea} orientation={'vertical'}>
        <div>
          {currentData?.items.map(({ avatars, userName }, i) => {
            return (
              <ul className={s.list} key={i}>
                <div className={s.wrapperUser}>
                  {avatars[0]?.url ? (
                    <div>
                      <Avatar size={54} src={avatars[0]?.url ?? null} />
                    </div>
                  ) : (
                    <div>
                      <BlankCover className={s.blank} type={'circle'} />
                    </div>
                  )}
                  <li>{userName}</li>
                </div>
              </ul>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

export default FollowUnfollowList

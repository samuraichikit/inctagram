import Skeleton from 'react-loading-skeleton'

import { useTranslation } from '@/common/hooks/useTranslation'
import { useFollowMutation, useUnfollowMutation } from '@/services/usersFollowingAndFollowers'
import { Button } from '@samuraichikit/inc-ui-kit'

type Props = {
  isFollowing?: boolean
  isShowFollowUnfollowButton: boolean
  selectedUserId: number
}

export const FollowUnfollowButton = ({
  isFollowing,
  isShowFollowUnfollowButton,
  selectedUserId,
}: Props) => {
  const { t } = useTranslation()
  const [follow, { isLoading: isFollowLoading }] = useFollowMutation()
  const [unfollow, { isLoading: isUnfollowLoading }] = useUnfollowMutation()

  const isLoading = isFollowLoading || isUnfollowLoading

  const followHandler = () => {
    follow({ selectedUserId })
  }

  const unFollowHandler = () => {
    unfollow({ userId: selectedUserId })
  }

  if (isFollowing === undefined) {
    return <Skeleton height={36} width={150} />
  }

  return (
    <>
      {isShowFollowUnfollowButton && (
        <Button
          disabled={isLoading}
          onClick={isFollowing ? unFollowHandler : followHandler}
          variant={isFollowing ? 'outlined' : 'primary'}
        >
          {isFollowing ? t.profile.unfollow : t.profile.follow}
        </Button>
      )}
    </>
  )
}

import { useTranslation } from '@/common/hooks/useTranslation'
import { useFollowingMutation } from '@/services/usersFollowingAndFollowersService'
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
  const [follow, { isLoading }] = useFollowingMutation()

  const followHandler = () => {
    follow({ selectedUserId })
  }

  const unFollowHandler = () => {}

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

import { HeartIcon } from '@/assets/icons/HeartIcon'
import { HeartRedIcon } from '@/assets/icons/HeartRedIcon'
import { PaperPlaneIcon } from '@/assets/icons/PaperPlaneIcon'
import { LikeStatus, useUpdateLikeStatusMutation } from '@/services/posts'
import { BookmarkOutlineIcon, Button, MessengerIcon } from '@samuraichikit/inc-ui-kit'
import clsx from 'clsx'

import s from './postActionsBar.module.scss'

type Props = {
  isLiked: boolean
  message?: boolean
  postId: number
}

export const PostActionsBar = ({ isLiked, message, postId }: Props) => {
  const [updateLikeStatus] = useUpdateLikeStatusMutation()
  const handleLike = () => {
    updateLikeStatus({
      likeStatus: isLiked ? LikeStatus.NONE : LikeStatus.LIKE,
      postId: Number(postId),
    })
  }

  return (
    <div className={clsx(s.container, message && s.withMessage)}>
      <div className={s.iconsWrapper}>
        <Button variant={'icon'}>
          {isLiked ? (
            <HeartRedIcon height={24} onClick={handleLike} width={24} />
          ) : (
            <HeartIcon onClick={handleLike} />
          )}
        </Button>
        {message && (
          <Button variant={'icon'}>
            <MessengerIcon />
          </Button>
        )}
        <Button variant={'icon'}>
          <PaperPlaneIcon />
        </Button>
      </div>
      <Button variant={'icon'}>
        <BookmarkOutlineIcon />
      </Button>
    </div>
  )
}

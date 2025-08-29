import React, { useState } from 'react'

import { HeartIcon } from '@/assets/icons/HeartIcon'
import { HeartRedIcon } from '@/assets/icons/HeartRedIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { Avatar } from '@/components/ui/profile/profilePhoto/avatar'
import { TimeAgoDisplay } from '@/components/ui/timeAgoDisplay'
import {
  AnswersViewModel,
  CommentsViewModel,
} from '@/services/commentPost/commentPostService.types'
import { Button, Typography } from '@samuraichikit/inc-ui-kit'

import s from './CommentByEkate.module.scss'

type Props = {
  comment: AnswersViewModel | CommentsViewModel
}

export const CommentByEkate = ({ comment }: Props) => {
  const { t } = useTranslation()
  const [isLiked, setIsLiked] = useState<boolean>(comment.isLiked)

  const toggleLikeAnswer = () => {
    setIsLiked(prevState => !prevState)
    alert(isLiked)
  }

  return (
    <div className={s.commentWrapper}>
      <div className={s.leftBlock}>
        <Avatar
          className={s.avatar}
          size={36}
          src={comment.from.avatars.length !== 0 ? comment.from.avatars[0].url : ''}
          userName={comment.from.username}
        />
        <div className={s.comment}>
          <div className={s.textComment}>
            <Typography
              className={s.username}
              variant={'bold_text_14'}
            >{`${comment.from.username} `}</Typography>
            <Typography className={s.content} variant={'regular_text_14'}>
              {comment.content}
            </Typography>
          </div>
          <div className={s.commentInfo}>
            <TimeAgoDisplay date={comment.createdAt} />
            {comment.likeCount !== 0 && (
              <Typography variant={'small_text'}>
                {t.commentForm.like}: {comment.likeCount}
              </Typography>
            )}
            <Button variant={'text'}>
              <Typography variant={'semi-bold_small_text'}>{t.commentForm.answer}</Typography>
            </Button>
          </div>
        </div>
      </div>
      <Button onClick={toggleLikeAnswer} variant={'icon'}>
        {isLiked ? <HeartRedIcon height={'16px'} /> : <HeartIcon height={'16px'} />}
      </Button>
    </div>
  )
}

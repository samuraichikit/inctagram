import React, { useState } from 'react'

import { HeartIcon } from '@/assets/icons/HeartIcon'
import { HeartRedIcon } from '@/assets/icons/HeartRedIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { Avatar } from '@/components/ui/profile/profilePhoto/avatar'
import { TimeAgoDisplay } from '@/components/ui/timeAgoDisplay'
import {
  useUpdateAnswerLikeStatusMutation,
  useUpdateCommentLikeStatusMutation,
} from '@/services/commentPost/commentPostService'
import {
  AnswersViewModel,
  CommentsViewModel,
} from '@/services/commentPost/commentPostService.types'
import { LikeStatus } from '@/services/posts'
import { Button, Typography } from '@samuraichikit/inc-ui-kit'

import s from './CommentByEkate.module.scss'

type Props = {
  comment: AnswersViewModel | CommentsViewModel
  postId: number
}

export const CommentByEkate = ({ comment, postId }: Props) => {
  const { t } = useTranslation()

  const [updateLikeCommentStatus] = useUpdateCommentLikeStatusMutation()
  const [updateLikeAnswerStatus] = useUpdateAnswerLikeStatusMutation()

  const handleLike = async () => {
    if ('postId' in comment) {
      try {
        await updateLikeCommentStatus({
          commentId: comment.id,
          likeStatus: comment.isLiked ? 'NONE' : 'LIKE',
          postId,
        }).unwrap()
        console.log('Лайк обновлён на сервере')
      } catch (err) {
        console.error('Ошибка лайка комментария', err)
      }
    } else {
      updateLikeAnswerStatus({
        answerId: comment.id,
        commentId: comment.commentId,
        likeStatus: comment.isLiked ? LikeStatus.NONE : LikeStatus.LIKE,
        postId,
      })
    }
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
      <Button variant={'icon'}>
        {comment.isLiked ? (
          <HeartRedIcon onClick={handleLike} />
        ) : (
          <HeartIcon height={'16px'} onClick={handleLike} />
        )}
      </Button>
    </div>
  )
}

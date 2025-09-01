import React, { useState } from 'react'

import { HeartIcon } from '@/assets/icons/HeartIcon'
import { HeartRedIcon } from '@/assets/icons/HeartRedIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { Avatar } from '@/components/ui/profile/profilePhoto/avatar'
import { TimeAgoDisplay } from '@/components/ui/timeAgoDisplay'
import {
  useCreateNewAnswerToCommentMutation,
  useUpdateAnswerLikeStatusMutation,
  useUpdateCommentLikeStatusMutation,
} from '@/services/commentPost/commentPostService'
import {
  AnswersViewModel,
  CommentsViewModel,
} from '@/services/commentPost/commentPostService.types'
import { LikeStatus } from '@/services/posts'
import { Button, Modal, TextArea, Typography } from '@samuraichikit/inc-ui-kit'

import s from './Comments.module.scss'

export enum CommentType {
  ANSWER = 'answer',
  COMMENT = 'comment',
}

type Props =
  | {
      comment: AnswersViewModel
      commentType: CommentType.ANSWER
      postId: number
    }
  | {
      comment: CommentsViewModel
      commentType: CommentType.COMMENT
      postId: number
    }

export const Comment = ({ comment, commentType, postId }: Props) => {
  const { t } = useTranslation()
  const [isShowInput, setIsShowInput] = useState(false)
  const [commentValue, setCommentValue] = useState<string>('')
  const [updateLikeCommentStatus] = useUpdateCommentLikeStatusMutation()
  const [updateLikeAnswerStatus] = useUpdateAnswerLikeStatusMutation()
  const [publishAnswerToComment] = useCreateNewAnswerToCommentMutation()
  const handleLike = () => {
    if (commentType === CommentType.COMMENT) {
      updateLikeCommentStatus({
        commentId: comment.id,
        likeStatus: comment.isLiked ? 'NONE' : 'LIKE',
        postId,
      })
    } else {
      updateLikeAnswerStatus({
        answerId: comment.id,
        commentId: comment.commentId,
        likeStatus: comment.isLiked ? LikeStatus.NONE : LikeStatus.LIKE,
        postId,
      })
    }
  }

  const addCommentToComment = async () => {
    try {
      await publishAnswerToComment({
        commentId: comment.id,
        content: commentValue.trim(),
        postId,
      }).unwrap()

      setCommentValue('')
      setIsShowInput(false)
    } catch (err) {
      console.error(err)
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
            <Button onClick={() => setIsShowInput(true)} variant={'text'}>
              <Typography variant={'semi-bold_small_text'}>{t.commentForm.answer}</Typography>
            </Button>
          </div>
        </div>
      </div>
      <Button onClick={handleLike} variant={'icon'}>
        {comment.isLiked ? <HeartRedIcon /> : <HeartIcon height={'16px'} />}
      </Button>
      <Modal className={s.modal} onOpenChange={setIsShowInput} open={isShowInput}>
        <TextArea onValueChange={setCommentValue} value={commentValue} />
        <Button
          disabled={commentValue.trim().length === 0}
          fullWidth
          onClick={addCommentToComment}
          type={'button'}
          variant={'primary'}
        >
          {t.commentForm.publish}
        </Button>
      </Modal>
    </div>
  )
}

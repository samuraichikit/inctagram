import { useRef, useState } from 'react'

import { HeartIcon } from '@/assets/icons/HeartIcon'
import { HeartRedIcon } from '@/assets/icons/HeartRedIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { Avatar } from '@/components/ui/avatar'
import { TimeAgoDisplay } from '@/components/ui/timeAgoDisplay'
import {
  useCreateNewAnswerToCommentMutation,
  useUpdateCommentLikeStatusMutation,
} from '@/services/commentPost/commentPostService'
import { Button, TextArea, Typography } from '@samuraichikit/inc-ui-kit'

import s from './postComment.module.scss'

type Props = {
  answerCount?: number
  avatarSrc?: string
  content: string
  createdAt: string
  id: number
  isLiked: boolean
  likesCount: number
  postId: number
  userName: string
}

const LIKE_STATUS = {
  LIKE: 'LIKE',
  UNLIKE: 'NONE',
}

export const PostComment = ({
  answerCount = 0,
  avatarSrc,
  content,
  createdAt,
  id,
  isLiked,
  likesCount,
  postId,
  userName,
}: Props) => {
  const classNames = {
    answers: s.answers,
    avatar: s.avatar,
    comment: s.comment,
    container: s.container,
    timeAgo: s.timeAgo,
    userAndComment: s.userAndComment,
    userName: s.userName,
  }
  const displayViewAnswer = answerCount > 0
  const { t } = useTranslation()

  const [isShowInput, setIsShowInput] = useState(false)
  const [commentValue, setCommentValue] = useState<string>('')
  const [isLikeds, setIsLiked] = useState<boolean>(isLiked)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const [publishAnswerToComment] = useCreateNewAnswerToCommentMutation()
  const [updateLikeStatus] = useUpdateCommentLikeStatusMutation()

  const addAnswerToComment = () => {
    setIsShowInput(prevState => !prevState)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const toggleLikeComment = () => {
    updateLikeStatus({
      commentId: id,
      likeStatus: isLiked ? LIKE_STATUS.UNLIKE : LIKE_STATUS.LIKE,
      postId: postId,
    })
      .unwrap()
      .then(() => {
        setIsLiked(prevState => !prevState)
      })
  }

  const addCommentToComment = () => {
    publishAnswerToComment({
      commentId: id,
      content: commentValue,
      postId: postId,
    })
      .unwrap()
      .then(() => {
        setCommentValue('')
        setIsShowInput(false)
      })
  }

  return (
    <div className={classNames.container}>
      <Avatar className={classNames.avatar} height={36} src={avatarSrc} width={36} />
      <div>
        <div className={classNames.userAndComment}>
          <Typography className={classNames.userName} variant={'bold_text_14'}>
            {userName}
          </Typography>{' '}
          <Typography className={classNames.comment} variant={'regular_text_14'}>
            {content}
          </Typography>
          <span className={s.commentLike} onClick={toggleLikeComment}>
            {isLikeds ? <HeartRedIcon /> : <HeartIcon />}
          </span>
        </div>
        <div className={s.commentInfo}>
          <TimeAgoDisplay className={classNames.timeAgo} date={createdAt} />
          {likesCount !== 0 && (
            <Typography variant={'small_text'}>
              {t.commentForm.like}: {likesCount}
            </Typography>
          )}
          <Typography onClick={addAnswerToComment} variant={'semi-bold_small_text'}>
            {t.commentForm.answer}
          </Typography>
        </div>
        {displayViewAnswer && (
          <Typography
            className={classNames.answers}
            variant={'semi-bold_small_text'}
          >{`View Answers (${answerCount})`}</Typography>
        )}
        {isShowInput && (
          <div className={s.input}>
            <TextArea onValueChange={value => setCommentValue(value)} ref={inputRef} />
            <Button
              className={s.button}
              disabled={commentValue.trim().length === 0}
              fullWidth={false}
              onClick={addCommentToComment}
              type={'button'}
              variant={'secondary'}
            >
              {t.commentForm.publish}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

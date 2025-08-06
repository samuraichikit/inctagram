import React, { useState } from 'react'

import { HeartIcon } from '@/assets/icons/HeartIcon'
import { HeartRedIcon } from '@/assets/icons/HeartRedIcon'
import { Avatar } from '@/components/ui/profile/profilePhoto/avatar'
import { TimeAgoDisplay } from '@/components/ui/timeAgoDisplay'
import { useUpdateAnswerLikeStatusMutation } from '@/services/commentPost/commentPostService'
import { AnswersViewModel } from '@/services/commentPost/commentPostService.types'
import { Typography } from '@samuraichikit/inc-ui-kit'

import s from './Answer.module.scss'

type Props = {
  answer: AnswersViewModel
  postId: number
}

const LIKE_STATUS = {
  LIKE: 'LIKE',
  UNLIKE: 'NONE',
}

export const Answer = ({ answer, postId }: Props) => {
  const [isLiked, setIsLiked] = useState<boolean>(answer.isLiked)
  const [updateLikeAnswerStatus] = useUpdateAnswerLikeStatusMutation()
  const toggleLikeAnswer = () => {
    updateLikeAnswerStatus({
      answerId: answer.id,
      commentId: answer.commentId,
      likeStatus: isLiked ? LIKE_STATUS.UNLIKE : LIKE_STATUS.LIKE,
      postId,
    })
      .unwrap()
      .then(() => {
        setIsLiked(prevState => !prevState)
      })
  }

  return (
    <>
      <div className={s.commentWrapper} key={answer.id}>
        <div className={s.comment}>
          <div>
            <Avatar
              size={36}
              src={answer.from.avatars.length !== 0 ? answer.from.avatars[0].url : ''}
              userName={answer.from.username}
            />
          </div>
          <div>
            <Typography variant={'bold_text_14'}>{`${answer.from.username} `}</Typography>
            <Typography variant={'regular_text_14'}>{answer.content}</Typography>
            <TimeAgoDisplay className={s.commentCreatedAt} date={answer.createdAt} />
          </div>
        </div>
        <span className={s.commentLike} onClick={toggleLikeAnswer}>
          {isLiked ? <HeartRedIcon /> : <HeartIcon />}
        </span>
      </div>
    </>
  )
}

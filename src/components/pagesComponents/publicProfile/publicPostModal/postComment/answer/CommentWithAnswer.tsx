import React, { useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { CommentByEkate } from '@/components/pagesComponents/publicProfile/publicPostModal/postComment/comment/CommentByEkate'
import { useGetAnswersToPostCommentQuery } from '@/services/commentPost/commentPostService'
import { CommentsViewModel } from '@/services/commentPost/commentPostService.types'
import { Typography } from '@samuraichikit/inc-ui-kit'

import s from './Answer.module.scss'

type Props = {
  comment: CommentsViewModel
}

export const CommentsWithAnswers = ({ comment }: Props) => {
  const { t } = useTranslation()
  const [isShowAnswers, setIsShowAnswers] = useState(true)
  const postId = comment.postId

  const { data: answersToComment } = useGetAnswersToPostCommentQuery(
    {
      commentId: comment.id,
      postId,
    },
    { skip: !isShowAnswers }
  )
  const toggleShowAnswer = () => {
    setIsShowAnswers(!isShowAnswers)
  }

  const answers = answersToComment?.items ?? []
  const countAnswers = answers.length

  return (
    <div className={s.commentsWithAnswers}>
      <CommentByEkate comment={comment} postId={postId} />
      <div className={s.answers}>
        {countAnswers > 0 &&
          (isShowAnswers ? (
            <div>
              <Typography
                className={s.showAnswer}
                onClick={toggleShowAnswer}
                variant={'semi-bold_small_text'}
              >
                {`${t.commentForm.showAnswer} (${countAnswers})`}
              </Typography>
              {answers.map(answer => (
                <CommentByEkate comment={answer} key={answer.id} postId={postId} />
              ))}
            </div>
          ) : (
            <Typography onClick={toggleShowAnswer} variant={'semi-bold_small_text'}>
              {`${t.commentForm.showAnswer} (${countAnswers})`}
            </Typography>
          ))}
      </div>
    </div>
  )
}

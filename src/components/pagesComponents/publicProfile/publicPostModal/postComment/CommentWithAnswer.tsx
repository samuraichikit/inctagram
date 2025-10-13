import React, { useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import {
  Comment,
  CommentType,
} from '@/components/pagesComponents/publicProfile/publicPostModal/postComment/Comment'
import { useGetAnswersToPostCommentQuery } from '@/services/commentPost/commentPostService'
import { CommentsViewModel } from '@/services/commentPost/commentPostService.types'
import { Typography } from '@samuraichikit/inc-ui-kit'

import s from './Comments.module.scss'

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
  const answers = answersToComment?.items ?? []
  const countAnswers = answers.length

  return (
    <div className={s.commentsWithAnswers}>
      <Comment comment={comment} commentType={CommentType.COMMENT} postId={postId} />
      <div className={s.answers}>
        {countAnswers > 0 && (
          <Typography
            className={s.showAnswer}
            onClick={() => setIsShowAnswers(prev => !prev)}
            variant={'semi-bold_small_text'}
          >
            {isShowAnswers
              ? `${t.commentForm.hideAnswer} (${countAnswers})`
              : `${t.commentForm.showAnswer} (${countAnswers})`}
          </Typography>
        )}
        {isShowAnswers &&
          answers.map(answer => (
            <Comment
              comment={answer}
              commentType={CommentType.ANSWER}
              key={answer.id}
              postId={postId}
            />
          ))}
      </div>
    </div>
  )
}

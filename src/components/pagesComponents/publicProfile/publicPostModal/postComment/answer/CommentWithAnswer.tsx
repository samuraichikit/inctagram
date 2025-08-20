import React, { useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { PostComment } from '@/components/pagesComponents/publicProfile/publicPostModal/postComment'
import { Answer } from '@/components/pagesComponents/publicProfile/publicPostModal/postComment/answer/Answer'
import { useGetAnswersToPostCommentQuery } from '@/services/commentPost/commentPostService'
import { CommentsViewModel } from '@/services/commentPost/commentPostService.types'
import { Typography } from '@samuraichikit/inc-ui-kit'

import s from './Answer.module.scss'

type Props = {
  avatarOwner: string
  comment: CommentsViewModel
  userName: string
}

export const CommentsWithAnswers = ({ avatarOwner, comment, userName }: Props) => {
  const { t } = useTranslation()
  const { data: answersToComment } = useGetAnswersToPostCommentQuery({
    commentId: comment.id,
    postId: comment.postId,
  })
  const [isShowAnswers, setIsShowAnswers] = useState(true)

  const toggleShowAnswer = () => {
    setIsShowAnswers(!isShowAnswers)
  }

  return (
    <div className={s.commentsWithAnswers}>
      <PostComment
        avatarOwner={avatarOwner}
        content={comment.content}
        createdAt={comment.createdAt}
        id={comment.id}
        isLiked={comment.isLiked}
        likesCount={comment.likeCount}
        postId={comment.postId}
        userName={userName}
      />
      <div className={s.answers}>
        {(answersToComment?.items ?? []).length > 0 &&
          (isShowAnswers ? (
            <div>
              <Typography onClick={toggleShowAnswer} variant={'semi-bold_small_text'}>
                {t.commentForm.hideAnswer} ({answersToComment?.items?.length ?? 0})
              </Typography>
              {(answersToComment?.items ?? []).map(answer => (
                <Answer answer={answer} key={answer.id} postId={comment.postId} />
              ))}
            </div>
          ) : (
            <Typography onClick={toggleShowAnswer} variant={'semi-bold_small_text'}>
              {t.commentForm.showAnswer} ({answersToComment?.items?.length ?? 0})
            </Typography>
          ))}
      </div>
    </div>
  )
}

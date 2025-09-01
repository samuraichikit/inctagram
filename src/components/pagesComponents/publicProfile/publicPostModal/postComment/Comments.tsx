import React from 'react'

import { CommentsWithAnswers } from '@/components/pagesComponents/publicProfile/publicPostModal/postComment/CommentWithAnswer'
import { CommentsViewModel } from '@/services/commentPost/commentPostService.types'

import s from './Comments.module.scss'

type Props = {
  comments: CommentsViewModel[]
}

export const Comments = ({ comments }: Props) => {
  return (
    <div className={s.comments}>
      {comments.length > 0 &&
        comments.map(comment => <CommentsWithAnswers comment={comment} key={comment.id} />)}
    </div>
  )
}

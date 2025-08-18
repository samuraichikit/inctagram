import React from 'react'

import { CommentsWithAnswers } from '@/components/pagesComponents/publicProfile/publicPostModal/postComment/answer/CommentWithAnswer'
import { CommentsViewModel } from '@/services/commentPost/commentPostService.types'

import s from './Answer.module.scss'

type Props = {
  avatarOwner: string
  comments: CommentsViewModel[]
  userName: string
}

export const Comments = ({ avatarOwner, comments, userName }: Props) => {
  return (
    <div className={s.comments}>
      {comments.map(comment => (
        <CommentsWithAnswers
          avatarOwner={avatarOwner}
          comment={comment}
          key={comment.id}
          userName={userName}
        />
      ))}
    </div>
  )
}

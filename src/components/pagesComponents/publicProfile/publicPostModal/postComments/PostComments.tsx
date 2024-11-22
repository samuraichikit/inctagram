import { Comment } from '@/services/publicPosts'

import s from './postComments.module.scss'

import { PostComment } from '../postComment'

type Props = {
  comments: Comment[]
}

export const PostComments = ({ comments }: Props) => {
  const classNames = {
    container: s.container,
  }

  return (
    <div className={classNames.container}>
      {comments.map(({ answerCount, content, createdAt, from, id }) => (
        <PostComment
          answerCount={answerCount}
          avatarSrc={from.avatars[0].url}
          comment={content}
          createdAt={createdAt}
          key={id}
          userName={from.username}
        />
      ))}
    </div>
  )
}

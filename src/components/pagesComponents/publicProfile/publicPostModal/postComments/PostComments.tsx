import { ScrollArea } from '@/components/ui/scrollArea'
import { Comment } from '@/services/publicPosts'

import s from './postComments.module.scss'

import { PostComment } from '../postComment'

type Props = {
  avatarSrc: string
  comments: Comment[]
  createdAt: string
  description: string
  userName: string
}

export const PostComments = ({ avatarSrc, comments, createdAt, description, userName }: Props) => {
  const classNames = {
    container: s.container,
  }

  return (
    <ScrollArea>
      <div className={classNames.container}>
        {description && (
          <PostComment
            avatarSrc={avatarSrc}
            comment={description}
            createdAt={createdAt}
            userName={userName}
          />
        )}
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
    </ScrollArea>
  )
}

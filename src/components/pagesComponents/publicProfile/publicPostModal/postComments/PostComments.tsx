import { Comment } from '@/services/publicPosts'
import { ScrollArea } from '@samuraichikit/inc-ui-kit'

import s from './postComments.module.scss'

import { PostComment } from '../postComment'

type Props = {
  comments: Comment[]
  createdAt: string
  description: string
  userName: string
}

export const PostComments = ({ comments, description }: Props) => {
  const classNames = {
    container: s.container,
  }

  return (
    <ScrollArea>
      <div className={classNames.container}>
        {description &&
          comments.map(({ answerCount, content, createdAt, id, likeCount, postId }) => (
            <PostComment
              answerCount={answerCount}
              content={content}
              createdAt={createdAt}
              id={id}
              isLiked
              key={id}
              likesCount={likeCount}
              postId={postId}
            />
          ))}
      </div>
    </ScrollArea>
  )
}

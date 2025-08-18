import { PostActionsBar } from '@/components/pagesComponents/profile/postModal/postActionsBar'
import { CommentForm } from '@/components/ui/commentForm'
import { UserImage } from '@/services/publicPosts'

import { PostImages } from '../../publicPage/publicPosts/postImages'
import { PostLikes } from '../../publicProfile/publicPostModal/postLikes'
import { PostDescription } from '../postDescription'
import { PublicationHeader } from '../publicationHeader'
import { ViewAllCommentsButton } from '../viewAllCommentsButton'

type Props = {
  avatarOwner: string
  avatarsSrc: string[]
  createdAt: string
  description: string
  endCursorPostId: number
  images: UserImage[]
  isLiked: boolean
  likesCount: number
  postId: number
  userName: string
}

export const Publication = ({
  avatarOwner,
  avatarsSrc,
  createdAt,
  description,
  endCursorPostId,
  images,
  isLiked,
  likesCount,
  postId,
  userName,
}: Props) => {
  return (
    <>
      <PublicationHeader createAt={createdAt} src={avatarOwner} userName={userName} />
      <PostImages height={504} images={images} width={491} />
      <PostActionsBar endCursorPostId={endCursorPostId} isLiked={isLiked} message postId={postId} />
      <PostDescription avatarSrc={avatarOwner} description={description} userName={userName} />
      <PostLikes avatarsSrc={avatarsSrc} createdAt={createdAt} likesCount={likesCount} />
      <ViewAllCommentsButton
        avatarOwner={avatarOwner}
        postId={postId.toString()}
        userName={userName}
      />
      <CommentForm postId={postId} />
    </>
  )
}

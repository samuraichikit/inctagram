import { CommentForm } from '@/components/ui/commentForm'
import { UserImage } from '@/services/publicPosts'

import { PostImages } from '../../publicPage/publicPosts/postImages'
import { PostLikes } from '../../publicProfile/publicPostModal/postLikes'
import { ActionBar } from '../actionBar'
import { PostDescription } from '../postDescription'
import { PublicationHeader } from '../publicationHeader'
import { ViewAllCommentsButton } from '../viewAllCommentsButton'

type Props = {
  avatarsSrc: string[]
  createdAt: string
  images: UserImage[]
  likesCount: number
  postId: number
  src: string
  userName: string
}

export const Publication = ({
  avatarsSrc,
  createdAt,
  images,
  likesCount,
  postId,
  src,
  userName,
}: Props) => {
  return (
    <>
      <PublicationHeader createAt={createdAt} src={src} userName={userName} />
      <PostImages height={504} images={images} width={491} />
      <ActionBar />
      <PostDescription />
      <PostLikes avatarsSrc={avatarsSrc} likesCount={likesCount} />
      <ViewAllCommentsButton />
      <CommentForm postId={postId} />
    </>
  )
}

import { CommentForm } from '@/components/ui/commentForm'
import { UserImage } from '@/services/publicPosts'

import { PostImages } from '../../publicPage/publicPosts/postImages'
import { PostLikes } from '../../publicProfile/publicPostModal/postLikes'
import { ActionBar } from '../actionBar'
import { PostDescription } from '../postDescription'
import { PublicationHeader } from '../publicationHeader'
import { ViewAllCommentsButton } from '../viewAllCommentsButton'

type Props = {
  avatarOwner: string
  avatarsSrc: string[]
  createdAt: string
  description: string
  images: UserImage[]
  likesCount: number
  postId: number
  userName: string
}

export const Publication = ({
  avatarOwner,
  avatarsSrc,
  createdAt,
  description,
  images,
  likesCount,
  postId,
  userName,
}: Props) => {
  return (
    <>
      <PublicationHeader createAt={createdAt} src={avatarOwner} userName={userName} />
      <PostImages height={504} images={images} width={491} />
      <ActionBar />
      <PostDescription avatarSrc={avatarOwner} description={description} userName={userName} />
      <PostLikes avatarsSrc={avatarsSrc} likesCount={likesCount} />
      <ViewAllCommentsButton />
      <CommentForm postId={postId} />
    </>
  )
}

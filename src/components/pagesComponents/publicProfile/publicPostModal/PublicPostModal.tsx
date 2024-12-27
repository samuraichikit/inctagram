import { Modal } from '@/components/ui/modal'
import { useGetCommentsQuery, useGetPublicPostQuery } from '@/services/publicPosts'

import s from './publicPostModal.module.scss'

import { PostImages } from '../../publicPage/publicPosts/postImages'
import { UserInfo } from '../../publicPage/publicPosts/userInfo'
import { PostComments } from './postComments'
import { PostLikes } from './postLikes'

type Props = {
  isOpen: boolean
  onClose: () => void
  postId: string
}

export const PublicPostModal = ({ isOpen, onClose, postId }: Props) => {
  const classNames = {
    container: s.container,
    images: s.images,
    postDetails: s.postDetails,
    userInfoContainer: s.userInfoContainer,
  }

  const { data: commentsData } = useGetCommentsQuery({ postId })
  const { data: post } = useGetPublicPostQuery({ postId })

  const comments = commentsData?.items ?? []

  if (!post) {
    return null
  }
  const { avatarOwner, avatarWhoLikes, createdAt, description, images, likesCount, userName } = post

  return (
    <Modal onOpenChange={onClose} open={isOpen}>
      <div className={classNames.container}>
        <PostImages className={classNames.images} height={562} images={images} width={490} />
        <div className={classNames.postDetails}>
          <div className={classNames.userInfoContainer}>
            <UserInfo src={avatarOwner} userName={userName} />
          </div>
          <PostComments
            avatarSrc={avatarOwner}
            comments={comments}
            createdAt={createdAt}
            description={description}
            userName={userName}
          />
          <PostLikes avatarsSrc={avatarWhoLikes} createdAt={createdAt} likesCount={likesCount} />
        </div>
      </div>
    </Modal>
  )
}

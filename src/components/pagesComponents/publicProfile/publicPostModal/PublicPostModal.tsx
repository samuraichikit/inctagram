import { Modal } from '@/components/ui/modal'
import { Comment, PublicPostResponse } from '@/services/publicPosts'

import s from './publicPostModal.module.scss'

import { PostImages } from '../../publicPage/publicPosts/postImages'
import { UserInfo } from '../../publicPage/publicPosts/userInfo'
import { PostComments } from './postComments'
import { PostLikes } from './postLikes'

type Props = {
  comments: Comment[]
  isOpen: boolean
  onClose: () => void
  post: PublicPostResponse
}

export const PublicPostModal = ({ comments, isOpen, onClose, post }: Props) => {
  const classNames = {
    container: s.container,
    images: s.images,
    postDetails: s.postDetails,
    userInfoContainer: s.userInfoContainer,
  }

  if (!post) {
    return
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

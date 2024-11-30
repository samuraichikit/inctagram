import { Modal } from '@/components/ui/modal'
import { Comment, PublicPostResponse, UserImage } from '@/services/publicPosts'

import s from './publicPostModal.module.scss'

import { PublicImages } from '../../publicPage/publicPosts/publicImages'
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
    postDetails: s.postDetails,
    userInfoContainer: s.userInfoContainer,
  }

  return (
    <Modal onOpenChange={onClose} open={isOpen}>
      <div className={classNames.container}>
        <PublicImages height={562} images={post.images} width={490} />
        <div className={classNames.postDetails}>
          <div className={classNames.userInfoContainer}>
            <UserInfo src={post.avatarOwner} userName={post.userName} />
          </div>
          <PostComments
            avatarSrc={post.avatarOwner}
            comments={comments}
            createdAt={post.createdAt}
            description={post.description}
            userName={post.userName}
          />
          <PostLikes
            avatarsSrc={post.avatarWhoLikes}
            createdAt={post.createdAt}
            likesCount={post.likesCount}
          />
        </div>
      </div>
    </Modal>
  )
}

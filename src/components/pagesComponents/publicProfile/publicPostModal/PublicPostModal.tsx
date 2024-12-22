import { useState } from 'react'

import { EditPost } from '@/components/pagesComponents/userProfile/postModal/editPost'
import { PostActionsMenu } from '@/components/pagesComponents/userProfile/postModal/postActionsMenu'
import { Modal } from '@/components/ui/modal'
import { useMeQuery } from '@/services/auth'
import { Comment, PublicPostResponse } from '@/services/publicPosts'
import { useParams } from 'next/navigation'

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

type Params = {
  id: string[]
} | null

export const PublicPostModal = ({ comments, isOpen, onClose, post }: Props) => {
  const classNames = {
    container: s.container,
    images: s.images,
    postDetails: s.postDetails,
    userInfoContainer: s.userInfoContainer,
  }

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const { data } = useMeQuery()

  const params: Params = useParams()
  const { id = [] } = params || {}
  const [userId, postId] = id

  const isAuthorizedUser = data?.userId === +(userId || 0)

  if (!post) {
    return
  }

  const handleSetEditPost = (isShow: boolean) => {
    setIsEditModalOpen(isShow)
  }

  const { avatarOwner, avatarWhoLikes, createdAt, description, images, likesCount, userName } = post

  return (
    <Modal onOpenChange={onClose} open={isOpen}>
      <div className={classNames.container}>
        <PostImages className={classNames.images} height={562} images={images} width={490} />
        <div className={classNames.postDetails}>
          <div className={classNames.userInfoContainer}>
            <UserInfo src={avatarOwner} userName={userName} />
            {isAuthorizedUser && (
              <PostActionsMenu showEditModal={isShow => handleSetEditPost(isShow)} />
            )}
          </div>
          {isEditModalOpen ? (
            <EditPost closeEditModal={isShow => handleSetEditPost(isShow)} postId={postId} />
          ) : (
            <div>
              <PostComments
                avatarSrc={avatarOwner}
                comments={comments}
                createdAt={createdAt}
                description={description}
                userName={userName}
              />
              <PostLikes
                avatarsSrc={avatarWhoLikes}
                createdAt={createdAt}
                likesCount={likesCount}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

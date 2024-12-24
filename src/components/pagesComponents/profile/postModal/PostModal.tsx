import { useState } from 'react'

import { BookmarkIcon } from '@/assets/icons/BookmarkIcon'
import { HeartIcon } from '@/assets/icons/HeartIcon'
import { PaperPlaneIcon } from '@/assets/icons/PaperPlaneIcon'
import { EditPost } from '@/components/pagesComponents/profile/postModal/editPost'
import { PostComments } from '@/components/pagesComponents/publicProfile/publicPostModal/postComments'
import { PostLikes } from '@/components/pagesComponents/publicProfile/publicPostModal/postLikes'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Params } from '@/components/ui/profile'
import { Typography } from '@/components/ui/typography'
import { Comment } from '@/services/publicPosts'
import { useGetPostByIdQuery } from '@/services/userPosts'
import { useParams } from 'next/navigation'

import s from './postModal.module.scss'

import { PostActionsMenu } from '../../profile/postModal/postActionsMenu'
import { PostImages } from '../../publicPage/publicPosts/postImages'
import { UserInfo } from '../../publicPage/publicPosts/userInfo'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const PostModal = ({ isOpen, onClose }: Props) => {
  const params: Params = useParams()

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const { data: postById } = useGetPostByIdQuery(params?.id[1] as string)

  const comments: Comment[] = []

  const handleSetEditPost = (isShow: boolean) => {
    setIsEditModalOpen(isShow)
  }

  if (!postById) {
    return
  }
  const { avatarOwner, avatarWhoLikes, createdAt, description, id, images, likesCount, userName } =
    postById

  return (
    <Modal onOpenChange={onClose} open={isOpen}>
      <div className={s.container}>
        <PostImages className={s.images} height={562} images={images} width={490} />
        <div className={s.postDetails}>
          {!isEditModalOpen && (
            <div className={s.userInfoContainer}>
              <UserInfo src={avatarOwner} userName={userName} />
              <PostActionsMenu showEditModal={isShow => handleSetEditPost(isShow)} />
            </div>
          )}
          {isEditModalOpen ? (
            <EditPost closeEditModal={isShow => handleSetEditPost(isShow)} postId={id.toString()} />
          ) : (
            <div className={s.aboutPost}>
              <PostComments
                avatarSrc={avatarOwner}
                comments={comments}
                createdAt={createdAt}
                description={description}
                userName={userName}
              />
              <div className={s.icon3}>
                <div className={s.icon2}>
                  <HeartIcon />
                  <PaperPlaneIcon />
                </div>
                <BookmarkIcon />
              </div>
              <PostLikes
                avatarsSrc={avatarWhoLikes}
                className={s.postLikes}
                createdAt={createdAt}
                likesCount={likesCount}
              />
              <div className={s.addComment}>
                <Typography className={s.addText} variant={'regular_text_14'}>
                  Add a Comment
                </Typography>
                <Button variant={'text'}>{'Publish'}</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

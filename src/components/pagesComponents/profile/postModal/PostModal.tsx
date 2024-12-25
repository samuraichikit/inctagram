import { useEffect, useState } from 'react'

import { BookmarkIcon } from '@/assets/icons/BookmarkIcon'
import { HeartIcon } from '@/assets/icons/HeartIcon'
import { PaperPlaneIcon } from '@/assets/icons/PaperPlaneIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { DeletePost } from '@/components/pagesComponents/profile/postModal/deletePost/DeletePost'
import { EditPost } from '@/components/pagesComponents/profile/postModal/editPost'
import { PostComments } from '@/components/pagesComponents/publicProfile/publicPostModal/postComments'
import { PostLikes } from '@/components/pagesComponents/publicProfile/publicPostModal/postLikes'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Params } from '@/components/ui/profile'
import { Typography } from '@/components/ui/typography'
import { useGetPostByIdQuery, useGetPostMessageByIdQuery } from '@/services/posts'
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

  const { data: postById } = useGetPostByIdQuery(params?.id[1] as string)
  const { data: comments } = useGetPostMessageByIdQuery(params?.id[0] as string)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [description, setDescription] = useState<string>('')
  const { t } = useTranslation()

  useEffect(() => {
    if (postById) {
      setDescription(postById.description)
    }
  }, [postById])

  const handleSetEditPost = (isShow: boolean) => {
    setIsEditModalOpen(isShow)
  }
  const handleUpdateDescription = (newDescription: string) => {
    setDescription(newDescription)
  }

  if (!postById) {
    return
  }
  const { avatarOwner, avatarWhoLikes, createdAt, id, images, likesCount, userName } = postById

  return (
    <Modal onOpenChange={onClose} open={isOpen}>
      <div className={s.container}>
        <PostImages className={s.images} height={562} images={images} width={490} />
        <div className={s.postDetails}>
          {!isEditModalOpen && (
            <div className={s.userInfoContainer}>
              <UserInfo src={avatarOwner} userName={userName} />
              <PostActionsMenu
                showDeleteModal={isShow => setIsDeleteModalOpen(isShow)}
                showEditModal={isShow => handleSetEditPost(isShow)}
              />
            </div>
          )}
          {isDeleteModalOpen && (
            <DeletePost
              closeDeleteModal={isShow => setIsDeleteModalOpen(isShow)}
              isOpen={isDeleteModalOpen}
              onCloseModalPost={onClose}
            />
          )}
          {isEditModalOpen ? (
            <EditPost
              closeEditModal={isShow => handleSetEditPost(isShow)}
              onUpdateDescription={handleUpdateDescription}
              postId={id.toString()}
            />
          ) : (
            <div className={s.aboutPost}>
              <PostComments
                avatarSrc={avatarOwner}
                comments={comments?.items ?? []}
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
                  {t.postModal.addComment}
                </Typography>
                <Button variant={'text'}>{t.postModal.publishMsg}</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

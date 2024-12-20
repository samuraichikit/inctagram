import { useState } from 'react'

import { EditIcon } from '@/assets/icons/EditIcon'
import { TrashIcon } from '@/assets/icons/TrashIcon'
import { PublicImages } from '@/components/pagesComponents/publicPage/publicPosts/publicImages'
import { UserInfo } from '@/components/pagesComponents/publicPage/publicPosts/userInfo'
import { PostComments } from '@/components/pagesComponents/publicProfile/publicPostModal/postComments'
import { PostLikes } from '@/components/pagesComponents/publicProfile/publicPostModal/postLikes'
import { EditPost } from '@/components/pagesComponents/userProfile/postModal/editPost/editPost'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useGetPostByIdQuery } from '@/services/userPosts/postsService'

import s from './userPostModal.module.scss'

export const UserPostModal = (props: any) => {
  const { data } = useGetPostByIdQuery('3754')
  const [isOpen, onClose] = useState<boolean>(true)
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const [editPost, setEditPost] = useState<boolean>(false)

  const {
    avatarOwner = '',
    avatarWhoLikes,
    createdAt = '',
    description = '',
    id,
    images = [],
    likesCount,
    userName = '',
  } = data || {}

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen)
  }

  const handleEditPost = () => {
    setEditPost(true)
    toggleEditModal()
  }

  return (
    <Modal onOpenChange={onClose} open={isOpen}>
      <div className={s.container}>
        <PublicImages className={s.images} height={562} images={images} width={490} />
        <div className={s.postDetails}>
          {editPost ? (
            <EditPost returnPost={v => setEditPost(v)} />
          ) : (
            <div className={s.userInfoContainer}>
              <UserInfo src={avatarOwner} userName={userName} />
              <Button className={s.toggle} onClick={toggleEditModal} variant={'icon'}>
                {'...'}
              </Button>
              {editModalOpen && (
                <div className={s.editModal}>
                  <Button className={s.btn} onClick={handleEditPost} variant={'icon'}>
                    <EditIcon /> {'Edit Post'}
                  </Button>
                  <Button className={s.btn} onClick={toggleEditModal} variant={'icon'}>
                    <TrashIcon /> {'Delete Post'}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/*<PostComments*/}
          {/*  avatarSrc={avatarOwner}*/}
          {/*  comments={comments}*/}
          {/*  createdAt={createdAt}*/}
          {/*  description={description}*/}
          {/*  userName={userName}*/}
          {/*/>*/}
          {/*<PostLikes avatarsSrc={avatarWhoLikes} createdAt={createdAt} likesCount={likesCount} />*/}
        </div>
      </div>
    </Modal>
  )
}

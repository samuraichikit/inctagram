import { useState } from 'react'

import { EditIcon } from '@/assets/icons/EditIcon'
import { TrashIcon } from '@/assets/icons/TrashIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { QuestionModal } from '@/components/pagesComponents/profile/postModal/questionModal'
import { Button } from '@/components/ui/button'

import s from './postActionsMenu.module.scss'

type Props = {
  showDeleteModal: (isShow: boolean) => void
  showEditModal: (isShow: boolean) => void
}

export const PostActionsMenu = ({ showDeleteModal, showEditModal }: Props) => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const { t } = useTranslation()
  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen)
  }

  const handleEditPost = () => {
    showEditModal(true)
    toggleEditModal()
  }

  const handleDeletePost = () => {
    showDeleteModal(true)
    toggleEditModal()
  }

  return (
    <div>
      <Button className={s.toggle} onClick={toggleEditModal} variant={'icon'}>
        {'...'}
      </Button>
      {editModalOpen && (
        <div className={s.editModal}>
          <Button className={s.btn} onClick={handleEditPost} variant={'icon'}>
            <EditIcon /> {t.postModal.editPost}
          </Button>
          <Button className={s.btn} onClick={handleDeletePost} variant={'icon'}>
            <TrashIcon /> {t.postModal.deletePost}
          </Button>
        </div>
      )}
    </div>
  )
}

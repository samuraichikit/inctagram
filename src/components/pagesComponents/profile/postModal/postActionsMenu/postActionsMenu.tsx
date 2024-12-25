import { useState } from 'react'

import { EditIcon } from '@/assets/icons/EditIcon'
import { TrashIcon } from '@/assets/icons/TrashIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { Button } from '@/components/ui/button'

import s from './postActionsMenu.module.scss'

type Props = {
  showEditModal: (isShow: boolean) => void
}

export const PostActionsMenu = ({ showEditModal }: Props) => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const { t } = useTranslation()
  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen)
  }

  const handleEditPost = () => {
    showEditModal(true)
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
          <Button className={s.btn} onClick={toggleEditModal} variant={'icon'}>
            <TrashIcon /> {t.postModal.deletePost}
          </Button>
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'

import { EditIcon } from '@/assets/icons/EditIcon'
import { TrashIcon } from '@/assets/icons/TrashIcon'
import { Button } from '@/components/ui/button'

import s from './postActionsMenu.module.scss'

type Props = {
  showEditModal: (isShow: boolean) => void
}

export const PostActionsMenu = ({ showEditModal }: Props) => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
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
            <EditIcon /> {'Edit Post'}
          </Button>
          <Button className={s.btn} onClick={toggleEditModal} variant={'icon'}>
            <TrashIcon /> {'Delete Post'}
          </Button>
        </div>
      )}
    </div>
  )
}

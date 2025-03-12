import { useState } from 'react'

import { BanIcon } from '@/assets/icons/BanIcon'
import { MoreIcon } from '@/assets/icons/MoreIcon'
import { PersonRemoveIcon } from '@/assets/icons/PersonRemoveIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { RemoveUserModal } from '@/components/pagesComponents/admin/usersList/actionMenu/removeUserModal/removeUserModal'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './actionMenu.module.scss'

type Props = {
  userId: number
  userName: string
}

export const ActionsMenu = ({ userId, userName }: Props) => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const [isRemoveUserModalOpen, setIsRemoveUserModalOpen] = useState<boolean>(false)

  const { t } = useTranslation()

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen)
  }

  const handleDeleteUser = () => {
    setIsRemoveUserModalOpen(true)
    setEditModalOpen(false)
  }

  return (
    <div>
      <Button className={s.toggle} onClick={toggleEditModal} variant={'icon'}>
        {'...'}
      </Button>
      {editModalOpen && (
        <div className={s.adminModal}>
          <Button className={s.btn} onClick={handleDeleteUser} variant={'icon'}>
            <PersonRemoveIcon />{' '}
            <Typography variant={'regular_text_14'}>{t.actionMenuAdmin.deleteUser}</Typography>
          </Button>
          <Button className={s.btn} variant={'icon'}>
            <BanIcon />{' '}
            <Typography variant={'regular_text_14'}>{t.actionMenuAdmin.banInSystem}</Typography>
          </Button>
          <Button className={s.btn} variant={'icon'}>
            <MoreIcon />{' '}
            <Typography variant={'regular_text_14'}>{t.actionMenuAdmin.moreInformation}</Typography>
          </Button>
        </div>
      )}
      {isRemoveUserModalOpen && (
        <RemoveUserModal
          closeModal={isShow => setIsRemoveUserModalOpen(isShow)}
          isShow={isRemoveUserModalOpen}
          userId={userId}
          userName={userName}
        />
      )}
    </div>
  )
}

import { useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { Modal } from '@/components/ui/modal'
import { useRemoveUserMutation } from '@/services/admin/removeUserService.generated'
import { GET_USERS } from '@/services/admin/usersPaginationService'
import { Button } from '@samuraichikit/inc-ui-kit'

import s from './removeUserModal.module.scss'

type Props = {
  closeModal: (isShow: boolean) => void
  isShow: boolean
  userId: number
  userName: string
}

export const RemoveUserModal = ({ closeModal, isShow, userId, userName }: Props) => {
  const [removeUser] = useRemoveUserMutation({
    refetchQueries: [GET_USERS],
  })
  const [isOpened, setIsOpened] = useState<boolean>(isShow)
  const { t } = useTranslation()

  const handlerBtnYes = async () => {
    try {
      const res = await removeUser({ variables: { userId } })

      if (res.errors) {
        throw new Error('Failed to delete user')
      }
      setIsOpened(false)
    } catch (error: any) {
      alert(error.message || 'Error deleting user')
    }
  }

  const handlerBtnNo = () => {
    setIsOpened(false)
    closeModal(false)
  }

  return (
    <Modal
      className={s.modal}
      onOpenChange={handlerBtnNo}
      open={isOpened}
      title={t.removeUserAdmin.titleModal}
    >
      {`${t.removeUserAdmin.questionModal} ${userName}`}
      <div className={s.yesNo}>
        <Button className={s.buttons} onClick={handlerBtnNo} variant={'outlined'}>
          {t.sideBar.rejectButton}
        </Button>
        <Button className={s.buttons} onClick={handlerBtnYes}>
          {t.sideBar.confirmButton}
        </Button>
      </div>
    </Modal>
  )
}

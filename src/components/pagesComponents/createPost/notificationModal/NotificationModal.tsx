import { useAppDispatch } from '@/app/store'
import {
  resetState,
  setDraftedPage,
} from '@/components/pagesComponents/createPost/service/createPost.slice'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'

import s from './NotificationModal.module.scss'

type Props = {
  closeOtherModal: (open: boolean) => void
  isOpen: boolean
  isOpenChange: (open: boolean) => void
}

export const NotificationModal = ({ closeOtherModal, isOpen, isOpenChange }: Props) => {
  const dispatch = useAppDispatch()

  const onDiscardHandler = () => {
    dispatch(resetState())
    isOpenChange(false)
  }

  const onSaveDraftHandler = () => {
    dispatch(setDraftedPage())
    isOpenChange(false)
    closeOtherModal(false)
  }

  return (
    <Modal
      className={s.notificationModal}
      onOpenChange={isOpenChange}
      open={isOpen}
      title={'Close'}
    >
      <div className={s.body}>
        <Typography className={s.warnCaption} variant={'regular_text_16'}>
          Do you really want to close the creation of a publication? If you close everything will be
          deleted
        </Typography>
        <div className={s.btnGroup}>
          <Button onClick={onDiscardHandler} variant={'outlined'}>
            Discard
          </Button>
          <Button onClick={onSaveDraftHandler}>Save draft</Button>
        </div>
      </div>
    </Modal>
  )
}

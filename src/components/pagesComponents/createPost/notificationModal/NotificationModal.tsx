import { useAppDispatch } from '@/app/store'
import { useTranslation } from '@/common/hooks/useTranslation'
import {
  resetState,
  setDraftedPage,
} from '@/components/pagesComponents/createPost/service/createPost.slice'
import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { Button } from '@samuraichikit/inc-ui-kit'

import s from './NotificationModal.module.scss'

type Props = {
  closeOtherModal: (open: boolean) => void
  isOpen: boolean
  isOpenChange: (open: boolean) => void
}

export const NotificationModal = ({ closeOtherModal, isOpen, isOpenChange }: Props) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

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
      title={t.postModal.close}
    >
      <div className={s.body}>
        <Typography className={s.warnCaption} variant={'regular_text_16'}>
          {t.postModal.confirmationMsg}
        </Typography>
        <div className={s.btnGroup}>
          <Button onClick={onDiscardHandler} variant={'outlined'}>
            {t.postModal.discard}
          </Button>
          <Button onClick={onSaveDraftHandler}>{t.postModal.save}</Button>
        </div>
      </div>
    </Modal>
  )
}

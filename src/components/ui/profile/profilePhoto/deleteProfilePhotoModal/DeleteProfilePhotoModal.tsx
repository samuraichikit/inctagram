import React from 'react'

import s from './DeleteProfilePhotoModal.module.scss'
import { useDeleteAvatarMutation } from '@/services/profile'
import { useTranslation } from '@/common/hooks/useTranslation'
import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'

type Props = {
  isOpenDeletePhotoModal: boolean
  setIsOpenDeletePhotoModal: (isOpenDeletePhotoModal: boolean) => void
}
export const DeletePhotoModal = ({ isOpenDeletePhotoModal, setIsOpenDeletePhotoModal }: Props) => {
  const [deleteAvatar] = useDeleteAvatarMutation()

  const { t } = useTranslation()

  const deletePhoto = () => {
    deleteAvatar()
      .unwrap()
      .then(() => {
        setIsOpenDeletePhotoModal(false)
      })
      .catch(error => {
        error
      })
  }

  return (
    <Modal
      className={s.deleteModalRoot}
      open={isOpenDeletePhotoModal}
      onOpenChange={setIsOpenDeletePhotoModal}
      title={t.profile.settings.profileDeletePhoto}
    >
      <div className={s.deleteRoot}>
        <Typography variant={'regular_text_16'}>
          {t.profile.settings.profileDeletePhotoModal}
        </Typography>
        <div className={s.buttonsBlock}>
          <Button fullWidth={false} onClick={deletePhoto} variant={'primary'}>
            {t.sideBar.confirmButton}
          </Button>
          <Button
            fullWidth={false}
            onClick={() => {
              setIsOpenDeletePhotoModal(false)
            }}
            variant={'primary'}
          >
            {t.sideBar.rejectButton}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

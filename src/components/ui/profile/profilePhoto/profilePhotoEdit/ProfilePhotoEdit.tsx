import React, { useState } from 'react'

import { DeleteIcon } from '@/assets/icons/DeleteIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { Button } from '@/components/ui/button'
import { AddProfilePhotoModal } from '@/components/ui/profile/profilePhoto/addProfilePhotoModal/AddProfilePhotoModal'
import { Avatar } from '@/components/ui/profile/profilePhoto/avatar/Avatar'
import { BlankCover } from '@/components/ui/profile/profilePhoto/blankCover/BlankCover'
import { DeletePhotoModal } from '@/components/ui/profile/profilePhoto/deleteProfilePhotoModal/DeleteProfilePhotoModal'

import s from './ProfilePhotoEdit.module.scss'

type Props = { avatar?: null | string }
export const ProfilePhotoEdit = ({ avatar }: Props) => {
  const { t } = useTranslation()

  const [currentPhoto, setCurrentPhoto] = useState<File | null>(null)
  const [isOpenAddPhotoModal, setIsOpenAddPhotoModal] = useState(false)
  const [isOpenDeletePhotoModal, setIsOpenDeletePhotoModal] = useState(false)
  const [error, setError] = useState('')

  const openAddPhotoModalHandler = () => {
    setError('')
    setCurrentPhoto(null)
    setIsOpenAddPhotoModal(true)
  }

  const openDeletePhotoModalHandler = () => {
    setIsOpenDeletePhotoModal(true)
  }

  return (
    <>
      <div className={s.root}>
        {avatar ? (
          <div className={s.avatar}>
            <Button className={s.deleteIcon} onClick={openDeletePhotoModalHandler}>
              <DeleteIcon />
            </Button>
            <Avatar className={s.avatarPhoto} size={192} src={avatar} />
          </div>
        ) : (
          <BlankCover />
        )}
        <Button onClick={openAddPhotoModalHandler} variant={'outlined'}>
          {t.profile.settings.profilePhoto}
        </Button>
      </div>
      <AddProfilePhotoModal
        currentPhoto={currentPhoto}
        error={error}
        isOpenAddPhotoModal={isOpenAddPhotoModal}
        setCurrentPhoto={setCurrentPhoto}
        setError={setError}
        setIsOpenAddPhotoModal={setIsOpenAddPhotoModal}
      />
      <DeletePhotoModal
        isOpenDeletePhotoModal={isOpenDeletePhotoModal}
        setIsOpenDeletePhotoModal={setIsOpenDeletePhotoModal}
      />
    </>
  )
}

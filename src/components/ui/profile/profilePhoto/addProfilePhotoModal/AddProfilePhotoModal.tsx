import React, { ChangeEvent, useRef } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'

import { clsx } from 'clsx'
import AvatarEditor from 'react-avatar-editor'

import s from './AddProfilePhotoModal.module.scss'
import { useUploadAvatarMutation } from '@/services/profile'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { BlankCover } from '@/components/ui/profile/profilePhoto/blankCover/BlankCover'
import { Typography } from '@/components/ui/typography'

type Props = {
  currentPhoto: File | null
  error: string
  isOpenAddPhotoModal: boolean
  setCurrentPhoto: (currentPhoto: File | null) => void
  setError: (error: string) => void
  setIsOpenAddPhotoModal: (isOpenAddPhotoModal: boolean) => void
}

export const AddProfilePhotoModal = ({
  currentPhoto,
  error,
  isOpenAddPhotoModal,
  setCurrentPhoto,
  setError,
  setIsOpenAddPhotoModal,
}: Props) => {
  const editorRef = useRef<AvatarEditor>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const MAX_FILE_SIZE = 10 * 1024 * 1024

  const [updateAvatar] = useUploadAvatarMutation()

  const { t } = useTranslation()

  const selectPhoto = () => {
    inputRef && inputRef.current?.click()
  }
  const changePhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      if (file.size > MAX_FILE_SIZE) {
        setError(t.profile.settings.profilePhotoErrorSize)
        e.target.value = ''
      } else if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        setError(t.profile.settings.profilePhotoErrorFormat)
        e.target.value = ''
      } else {
        setCurrentPhoto(file)
      }
    }
  }
  const savePhoto = () => {
    if (editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas()

      if (canvasScaled) {
        canvasScaled.toBlob(blob => {
          if (blob) {
            const timestamp = Date.now()
            const fileName = `photo_${timestamp}.png`
            const file = new File([blob], fileName, { type: 'image/png' })

            updateAvatar({ file: file })
              .unwrap()
              .then(() => {
                setCurrentPhoto(null)
                setIsOpenAddPhotoModal(false)
              })
              .catch(error => {
                setError(error)
                debugger
              })
          }
        }, 'image/png')
      }
    }
  }

  return (
    <Modal
      className={s.addModalRoot}
      open={isOpenAddPhotoModal}
      onOpenChange={setIsOpenAddPhotoModal}
      title={t.profile.settings.profilePhoto}
    >
      <div className={s.modalContent}>
        {currentPhoto ? (
          <>
            <AvatarEditor
              border={8}
              borderRadius={158}
              color={[23, 23, 23, 0.8]}
              height={316}
              image={currentPhoto}
              ref={editorRef}
              rotate={0}
              scale={1.2}
              width={316}
            />

            <Button
              className={s.saveButton}
              fullWidth={false}
              onClick={savePhoto}
              variant={'primary'}
            >
              {t.profile.settings.profileSavePhoto}
            </Button>
          </>
        ) : (
          <div className={s.withoutPhoto}>
            {error &&
              <div className={s.errorText}>
                <Typography variant={'bold_text_14'}>{error}</Typography>
              </div>
            }
            <BlankCover className={clsx(s.blank, error && s.blankError)} type={'square'} />
            <Button fullWidth={false} onClick={selectPhoto} variant={'primary'}>
              {t.profile.settings.profilePhotoSelect}
            </Button>
          </div>
        )}
        <input
          accept={'*/image, .png, .img, .jpeg, jpg'}
          onChange={changePhotoHandler}
          ref={inputRef}
          style={{ display: 'none' }}
          type={'file'}
        />
      </div>
    </Modal>
  )
}

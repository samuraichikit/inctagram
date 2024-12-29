import { ChangeEvent, useRef } from 'react'

import { useAppDispatch } from '@/app/store'
import { CrossIcon } from '@/assets/icons/CrossIcon'
import {
  resetState,
  setNextStage,
  setPictures,
  setStageFromDraft,
} from '@/components/pagesComponents/createPost/service/createPost.slice'
import { uploadPhotos } from '@/components/pagesComponents/createPost/service/uploadPhotos'
import { Button } from '@/components/ui/button'
import { BlankCover } from '@/components/ui/profile/profilePhoto/blankCover/BlankCover'
import { Typography } from '@/components/ui/typography'

import s from './ImageSelection.module.scss'

type ImageSelectionProps = {
  onCloseBtn: () => void
}

export const ImageSelection = ({ onCloseBtn }: ImageSelectionProps) => {
  const dispatch = useAppDispatch()
  const setNext = () => dispatch(setNextStage())
  const setPhotos = (pictures: string[]) => dispatch(setPictures({ pictures }))
  const inputRef = useRef<HTMLInputElement>(null)

  const changePhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const readyForSetFiles = uploadPhotos(e)

    debugger
    if (readyForSetFiles.length > 0) {
      dispatch(resetState())
      setPhotos(readyForSetFiles)
      debugger
      setNext()
    }
  }

  const openDraftHandler = () => {
    dispatch(setStageFromDraft())
  }

  const selectPhoto = () => {
    inputRef && inputRef.current?.click()
  }

  return (
    <div>
      <div className={s.title}>
        <Typography variant={'h1'}>Add Photo</Typography>
        <button className={s.closeBtn} onClick={onCloseBtn} type={'button'}>
          <CrossIcon />
        </button>
      </div>

      <div className={s.body}>
        <BlankCover type={'square'} />
        <div className={s.btnGroup}>
          <label>
            <input
              accept={'image/*'}
              multiple
              onChange={changePhotoHandler}
              ref={inputRef}
              type={'file'}
            />
            <Button onClick={selectPhoto}>Select from Computer</Button>
          </label>
          <Button fullWidth={false} onClick={openDraftHandler} variant={'outlined'}>
            Open Draft
          </Button>
        </div>
      </div>
    </div>
  )
}

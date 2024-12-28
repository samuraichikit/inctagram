import React from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store'
import { ArrowLeftIcon } from '@/assets/icons/ArrowLeftIcon'
import { ImageCropper } from '@/components/pagesComponents/createPost/cropping/imageCropper/ImageCropper'
import { SelectedImagesPreview } from '@/components/pagesComponents/createPost/cropping/selectedImagesPreview/SelectedImagesPreview'
import {
  setCroppedImages,
  setNextStage,
  setPrevStage,
} from '@/components/pagesComponents/createPost/service/createPost.slice'
import { getCroppedImage } from '@/components/pagesComponents/createPost/service/getCroppedImage'
import { SliderPost } from '@/components/pagesComponents/createPost/slider/SliderPost'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './Cropping.module.scss'

export const Cropping = () => {
  const photos = useAppSelector(state => state.createPostSlice.pictures)
  const dispatch = useAppDispatch()

  const savedImages = async () => {
    const images: string[] = []

    for (let i = 0; i < photos.length; i++) {
      images.push(await getCroppedImage(photos[i]))
    }

    return images
  }
  const setPerv = () => {
    dispatch(setPrevStage())
  }
  const setNext = async () => {
    const croppedImages = await savedImages()

    dispatch(setCroppedImages({ croppedImages }))
    dispatch(setNextStage())
  }

  return (
    <div>
      <div className={s.title}>
        <button className={s.backBtn} onClick={setPerv}>
          <ArrowLeftIcon />
        </button>
        <Typography variant={'h1'}>Cropping</Typography>
        <Button onClick={setNext} style={{ padding: 'unset' }} variant={'outlined'}>
          Next
        </Button>
      </div>
      <div className={s.body}>
        <SliderPost isDots={photos.length > 1} sizeBtn={36} sliderLength={photos.length}>
          {photos.map(photo => (
            <ImageCropper key={photo.id} photo={photo} />
          ))}
        </SliderPost>
        <SelectedImagesPreview />
      </div>
    </div>
  )
}

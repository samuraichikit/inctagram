import React, { useState } from 'react'
import Cropper from 'react-easy-crop'

import { useAppDispatch } from '@/app/store'
import { AspectRatioSettings } from '@/components/pagesComponents/createPost/cropping/imageCropper/aspectRatioSettings/AspectRatioSettings'
import { ZoomSetting } from '@/components/pagesComponents/createPost/cropping/imageCropper/zoomSettings/ZoomSettings'
import {
  CroppedArea,
  PictureObj,
  setAspectRatio,
  setCroppedArea,
  setZoom,
} from '@/components/pagesComponents/createPost/service/createPost.slice'

import s from './ImageCropper.module.scss'

type Props = {
  photo: PictureObj
}

export const ImageCropper = ({ photo }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const dispatch = useAppDispatch()
  const setZoomHandler = (id: number, zoom: number) => dispatch(setZoom({ id, zoom }))
  const setAspectRatioHandler = (id: number, aspect: number) =>
    dispatch(setAspectRatio({ aspect, id }))
  const onCropCompleteHandler = (_: CroppedArea, croppedAreaPixels: CroppedArea) => {
    dispatch(setCroppedArea({ croppedArea: croppedAreaPixels, id: photo.id }))
  }

  return (
    <div className={s.imageCropper}>
      <Cropper
        aspect={photo.aspectRatio}
        classes={{ cropAreaClassName: s.cropper }}
        crop={crop}
        image={photo.img}
        objectFit={'cover'}
        onCropChange={setCrop}
        onCropComplete={onCropCompleteHandler}
        showGrid
        zoom={photo.zoom}
      />
      <ZoomSetting imgId={photo.id} setZoom={setZoomHandler} zoom={photo.zoom} />
      <AspectRatioSettings
        aspect={photo.aspectRatio}
        imgId={photo.id}
        setAspect={setAspectRatioHandler}
      />
    </div>
  )
}

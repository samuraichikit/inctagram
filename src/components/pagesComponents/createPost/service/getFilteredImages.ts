import { toast } from 'react-toastify'

import { AppDispatch } from '@/app/store'
import { createImageElement } from '@/components/pagesComponents/createPost/service/createImageElement'
import {
  CroppedPicture,
  setPicturesIds,
} from '@/components/pagesComponents/createPost/service/createPost.slice'

export const getFilteredImage = async (
  croppedPictureObj: CroppedPicture,
  dispatch: AppDispatch,
  uploadToServer: (file: FormData) => Promise<any>
): Promise<string> => {
  const imageObj = await createImageElement(croppedPictureObj.img)
  const canvasObj = document.createElement('canvas')
  const ctx = canvasObj.getContext('2d')

  if (!ctx) {
    return ''
  }

  canvasObj.width = croppedPictureObj.croppedArea.width
  canvasObj.height = croppedPictureObj.croppedArea.height

  ctx.filter = croppedPictureObj.filter
  ctx.drawImage(imageObj, 0, 0)

  const dataUrl = canvasObj.toDataURL('image/jpeg')

  canvasObj.toBlob(async blob => {
    if (blob) {
      const timestamp = Date.now()
      const fileName = `photo_${timestamp}.png`
      const file = new File([blob], fileName, { type: 'image/png' })
      const formData = new FormData()

      formData.append('file', file)

      try {
        const response = await uploadToServer(formData)
        const imageId = response?.data.images[0].uploadId

        if (imageId) {
          dispatch(setPicturesIds({ uploadId: imageId }))
        }
      } catch (error: unknown) {
        if (isFetchBaseQueryError(error)) {
          if (!Array.isArray(error.data.messages[0].message)) {
            toast.error(error.data.messages[0].message)
          }
        }
      }
    }
  }, 'image/jpeg')

  imageObj.remove()
  canvasObj.remove()

  return dataUrl
}

type ErrorData = {
  data: {
    error: string
    messages: { field: string; message: string }[]
    statusCode: number
  }
  status: number
}

export const isFetchBaseQueryError = (error: unknown): error is ErrorData => {
  return typeof error === 'object' && error !== null && 'data' in error
}

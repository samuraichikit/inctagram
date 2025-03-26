import { createImageElement } from '@/components/pagesComponents/createPost/service/createImageElement'
import { PictureObj } from '@/components/pagesComponents/createPost/service/createPost.slice'

export const getCroppedImage = async (photoObj: PictureObj): Promise<string> => {
  const imageObj = await createImageElement(photoObj.img)
  const canvasObj = document.createElement('canvas')
  const ctx = canvasObj.getContext('2d')

  canvasObj.width = photoObj.croppedArea.width
  canvasObj.height = photoObj.croppedArea.height

  ctx?.translate(-photoObj.croppedArea.x, -photoObj.croppedArea.y)
  ctx?.drawImage(imageObj, 0, 0)

  const dataUrl = canvasObj.toDataURL('image/jpeg')

  imageObj.remove()
  canvasObj.remove()

  return dataUrl
}

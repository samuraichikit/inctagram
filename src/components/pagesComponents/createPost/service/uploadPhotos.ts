import { ChangeEvent } from 'react'
import { toast } from 'react-toastify'

const MAX_FILE_SIZE = 20 * 1024 * 1024

export const uploadPhotos = (e: ChangeEvent<HTMLInputElement>): string[] => {
  e.preventDefault()
  if (e.target.files && e.target.files.length > 0) {
    const files = e.target.files
    const readyForSetFiles: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (file.size > MAX_FILE_SIZE) {
        toast.error(`size too big: ${file.name}`)
      } else if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        toast.error(`incorrect file type, accept only png/jpg: ${file.name}`)
      } else {
        const fileUrl = URL.createObjectURL(file)

        readyForSetFiles.push(fileUrl)
      }
    }

    return readyForSetFiles
  }

  return []
}

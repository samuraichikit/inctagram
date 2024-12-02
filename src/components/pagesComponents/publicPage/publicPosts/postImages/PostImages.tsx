import { formatDate } from '@/common/utils'
import { UserImage } from '@/services/publicPosts'
import clsx from 'clsx'
import Image from 'next/image'

import s from './postImages.module.scss'

import { ImagesSlider } from '../imagesSlider'

type Props = {
  className?: string
  height: number
  images: UserImage[]
  isExpanded?: boolean
  width: number
}

export const PostImages = ({ className, height, images, isExpanded, width }: Props) => {
  const shouldDisplayImagesSlider = images.length > 1
  const classNames = {
    container: clsx(isExpanded && s.expanded, className),
  }

  return (
    <div className={classNames.container}>
      {shouldDisplayImagesSlider ? (
        <ImagesSlider height={height} images={images} width={width} />
      ) : (
        <Image
          alt={`Image uploaded on ${formatDate(images[0]?.createdAt)}`}
          height={height}
          src={images[0]?.url}
          width={width}
        />
      )}
    </div>
  )
}

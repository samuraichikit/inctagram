import { formatDate } from '@/common/utils'
import { UserImage } from '@/services/publicPosts'
import clsx from 'clsx'
import Image from 'next/image'

import s from './publicImages.module.scss'

import { ImagesSlider } from '../imagesSlider'

type Props = {
  height: number
  images: UserImage[]
  isExpanded?: boolean
  width: number
}

export const PublicImages = ({ height, images, isExpanded, width }: Props) => {
  const shouldDisplayImagesSlider = images.length > 1
  const classNames = {
    container: clsx(s.container, isExpanded && s.expanded),
  }

  return (
    <div className={classNames.container}>
      {shouldDisplayImagesSlider ? (
        <ImagesSlider height={height} images={images} width={width} />
      ) : (
        <Image
          alt={`Image uploaded on ${formatDate(images[0].createdAt)}`}
          height={height}
          src={images[0].url}
          width={width}
        />
      )}
    </div>
  )
}

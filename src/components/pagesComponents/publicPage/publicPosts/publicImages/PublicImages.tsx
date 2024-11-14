import { formatDate } from '@/common/utils'
import { UserImage } from '@/services/publicPosts'
import clsx from 'clsx'
import Image from 'next/image'

import s from './publicImages.module.scss'

import { ImagesSlider } from '../imagesSlider'

type Props = {
  images: UserImage[]
  isExpanded: boolean
}

export const PublicImages = ({ images, isExpanded }: Props) => {
  const shouldDisplayImagesSlider = images.length > 1
  const classNames = {
    container: clsx(s.container, isExpanded && s.expanded),
  }

  return (
    <div className={classNames.container}>
      {shouldDisplayImagesSlider ? (
        <ImagesSlider images={images} />
      ) : (
        <Image
          alt={`Image uploaded on ${formatDate(images[0].createdAt)}`}
          height={240}
          src={images[0].url}
          width={234}
        />
      )}
    </div>
  )
}

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { formatDate } from '@/common/utils'
import { UserImage } from '@/services/publicPosts'
import clsx from 'clsx'
import Image from 'next/image'

import s from './postImages.module.scss'

import { ImagesSlider } from '../imagesSlider'

type Props = {
  className?: string
  fill?: boolean
  height?: number
  images: UserImage[]
  isExpanded?: boolean
  width?: number
} & ComponentPropsWithoutRef<'div'>

export const PostImages = forwardRef<ElementRef<'div'>, Props>(
  ({ className, fill, height, images, isExpanded, width }, ref) => {
    const shouldDisplayImagesSlider = images.length > 1
    const classNames = {
      container: clsx(s.container, isExpanded && s.expanded, className),
      image: s.image,
      imageContainer: s.imageContainer,
    }

    return (
      <div className={classNames.container} ref={ref}>
        {shouldDisplayImagesSlider ? (
          <ImagesSlider fill={fill} height={height} images={images} width={width} />
        ) : (
          <Image
            alt={`Image uploaded on ${formatDate(images[0]?.createdAt)}`}
            className={classNames.image}
            fill={fill}
            height={height}
            src={images[0]?.url}
            width={width}
          />
        )}
      </div>
    )
  }
)

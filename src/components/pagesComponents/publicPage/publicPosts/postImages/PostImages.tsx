import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

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
} & ComponentPropsWithoutRef<'div'>

export const PostImages = forwardRef<ElementRef<'div'>, Props>(
  ({ className, height, images, isExpanded, width }, ref) => {
    const shouldDisplayImagesSlider = images.length > 1
    const classNames = {
      container: clsx(isExpanded && s.expanded, className),
    }

    return (
      <div className={classNames.container} ref={ref}>
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
)

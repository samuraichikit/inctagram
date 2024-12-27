/* eslint-disable import/extensions */
import { ArrowIosBackOutlineIcon } from '@/assets/icons/ArrowIosBackOutline'
import { ArrowIosForwardIcon } from '@/assets/icons/ArrowIosForward'
import { formatDate } from '@/common/utils'
import { Button } from '@/components/ui/button'
import { UserImage } from '@/services/publicPosts'
import Image from 'next/image'
import { Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/scss'

import s from './imagesSlider.module.scss'

type Props = {
  fill?: boolean
  height?: number
  images: UserImage[]
  width?: number
}

export const ImagesSlider = ({ fill, height, images, width }: Props) => {
  const classNames = {
    activeCustomBullet: s.activeCustomBullet,
    buttonArrowBack: s.buttonArrowBack,
    buttonArrowForward: s.buttonArrowForward,
    container: s.container,
    customBullet: s.customBullet,
    customPagination: s.customPagination,
  }

  return (
    <div className={classNames.container}>
      <Swiper
        keyboard={{ enabled: true }}
        modules={[Navigation, Pagination, Keyboard]}
        navigation={{
          nextEl: `.${classNames.buttonArrowForward}`,
          prevEl: `.${classNames.buttonArrowBack}`,
        }}
        pagination={{
          bulletActiveClass: `${classNames.activeCustomBullet}`,
          bulletClass: `${classNames.customBullet}`,
          clickable: true,
          el: `.${classNames.customPagination}`,
        }}
        slidesPerView={1}
        spaceBetween={50}
      >
        {images.map(image => {
          return (
            <SwiperSlide key={image.uploadId}>
              <div style={{ height: '100%', position: 'relative', width: '100%' }}>
                <Image
                  alt={`Image uploaded on ${formatDate(image.createdAt)}`}
                  fill={fill}
                  height={height}
                  objectFit={'cover'}
                  src={image.url}
                  width={width}
                />
              </div>
            </SwiperSlide>
          )
        })}
        <Button className={classNames.buttonArrowBack} variant={'icon'}>
          <ArrowIosBackOutlineIcon />
        </Button>
        <Button className={classNames.buttonArrowForward} variant={'icon'}>
          <ArrowIosForwardIcon className={s.arrowForward} />
        </Button>
        <div className={classNames.customPagination} />
      </Swiper>
    </div>
  )
}

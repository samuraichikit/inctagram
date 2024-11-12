/* eslint-disable import/extensions */
import { ArrowIosBackOutlineIcon } from '@/assets/icons/ArrowIosBackOutline'
import { ArrowIosForwardIcon } from '@/assets/icons/ArrowIosForward'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/scss'

import s from './imageSlider.module.scss'

type UserImages = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

type Props = {
  images: UserImages[]
}

export const ImagesSlider = ({ images }: Props) => {
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
              <Image
                alt={`Image uploaded on ${new Date(image.createdAt).toLocaleDateString()}`}
                height={240}
                src={image.url}
                width={234}
              />
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

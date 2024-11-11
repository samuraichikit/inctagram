import Image from 'next/image'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

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
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination
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
    </Swiper>
  )
}

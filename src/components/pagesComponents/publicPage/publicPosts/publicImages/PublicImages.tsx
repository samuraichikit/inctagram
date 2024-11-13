import { formatDate } from '@/common/utils'
import { UserImage } from '@/services/publicPosts'
import Image from 'next/image'

import { ImagesSlider } from '../imagesSlider'

type Props = {
  images: UserImage[]
}

export const PublicImages = ({ images }: Props) => {
  const shouldDisplayImagesSlider = images.length > 1

  return (
    <>
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
    </>
  )
}

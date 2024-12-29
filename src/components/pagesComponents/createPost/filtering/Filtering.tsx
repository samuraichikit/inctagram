import React, { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store'
import { ArrowLeftIcon } from '@/assets/icons/ArrowLeftIcon'
import { FilterCard } from '@/components/pagesComponents/createPost/filtering/filterCard/FilterCard'
import {
  setFilter,
  setFilteredImages,
  setNextStage,
  setPrevStage,
} from '@/components/pagesComponents/createPost/service/createPost.slice'
import { getFilteredImage } from '@/components/pagesComponents/createPost/service/getFilteredImages'
import { SliderPost } from '@/components/pagesComponents/createPost/slider/SliderPost'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useUploadPostPhotoMutation } from '@/services/publicPosts/post-api'
import NextImage from 'next/image'

import s from './Filtering.module.scss'

export const Filtering = () => {
  const [slideId, setSlideId] = useState<number>(0)
  const croppedPictures = useAppSelector(state => state.createPostSlice.croppedPictures)
  const dispatch = useAppDispatch()
  const [uploadToServer] = useUploadPostPhotoMutation()

  const savedImages = async () => {
    const images: string[] = []

    for (let i = 0; i < croppedPictures.length; i++) {
      images.push(await getFilteredImage(croppedPictures[i], dispatch, uploadToServer))
    }
    debugger

    return images
  }

  const setPerv = () => {
    dispatch(setPrevStage())
  }
  const setNext = async () => {
    const filteredImages = await savedImages()

    dispatch(setFilteredImages({ filteredImages }))
    dispatch(setNextStage())
  }
  const setFilterHandler = (i: number, filter: string) => {
    dispatch(setFilter({ filter, index: i }))
  }

  return (
    <div>
      <div className={s.title}>
        <button className={s.backBtn} onClick={setPerv} type={'button'}>
          <ArrowLeftIcon />
        </button>
        <Typography variant={'h1'}>Filtering</Typography>
        <Button onClick={setNext} style={{ padding: 'unset' }} variant={'outlined'}>
          Next
        </Button>
      </div>
      <div className={s.body}>
        <div className={s.sliderBlock}>
          <SliderPost
            isDots={croppedPictures.length > 1}
            setSlideId={setSlideId}
            sizeBtn={36}
            slideId={slideId}
            sliderLength={croppedPictures.length}
          >
            {croppedPictures.map((pic, i) => (
              <div key={i}>
                <NextImage
                  alt={'post image with filter'}
                  height={499}
                  src={pic.img}
                  style={{ filter: pic.filter, objectFit: 'contain' }}
                  width={489}
                />
              </div>
            ))}
          </SliderPost>
        </div>
        <div className={s.filtersBlock}>
          {FILTERS.map(el => (
            <FilterCard
              filter={el.value}
              key={el.name}
              onClick={() => setFilterHandler(slideId, el.value)}
              title={el.name}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export const FILTERS = [
  {
    name: 'Original',
    value: 'none',
  },
  {
    name: 'Amaro',
    value: 'contrast(0.9) brightness(1.1) hue-rotate(-10deg) saturate(1.5)',
  },
  {
    name: 'Brannan',
    value: 'contrast(1.4) sepia(0.5)',
  },
  {
    name: 'Clarendon',
    value: 'contrast(1.2) saturate(1.35)',
  },
  {
    name: 'Gingham',
    value: 'brightness(1.05) hue-rotate(-10deg)',
  },
  {
    name: 'Moon',
    value: 'contrast(1.1) brightness(1.1) grayscale(1)',
  },
  {
    name: 'Lark',
    value: 'contrast(0.9)',
  },
  {
    name: 'Lofi',
    value: 'contrast(1.5) saturate(1.1)',
  },
  {
    name: 'Maven',
    value: 'contrast(0.95) brightness(0.95) saturate(1.5) sepia(0.25)',
  },
  {
    name: 'Toaster',
    value: 'contrast(1.5) brightness(0.9)',
  },
]

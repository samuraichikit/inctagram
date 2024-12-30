import React from 'react'
import { toast } from 'react-toastify'

import { useAppDispatch, useAppSelector } from '@/app/store'
import { ArrowLeftIcon } from '@/assets/icons/ArrowLeftIcon'
import {
  resetState,
  setDescription,
  setPrevStage,
} from '@/components/pagesComponents/createPost/service/createPost.slice'
import { isFetchBaseQueryError } from '@/components/pagesComponents/createPost/service/getFilteredImages'
import { SliderPost } from '@/components/pagesComponents/createPost/slider/SliderPost'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/profile/profilePhoto/avatar/Avatar'
import { TextArea } from '@/components/ui/text-area'
import { Typography } from '@/components/ui/typography'
import { useGetProfileQuery } from '@/services/profile'
import { useCreatePostMutation } from '@/services/publicPosts/post-api'
import NextImage from 'next/image'

import s from './Publish.module.scss'

type PublishProps = {
  onCloseBtn: () => void
}

export const Publish = ({ onCloseBtn }: PublishProps) => {
  const { data } = useGetProfileQuery()
  const filteredImages = useAppSelector(state => state.createPostSlice.filteredPictures)
  const description = useAppSelector(state => state.createPostSlice.description)
  const dispatch = useAppDispatch()
  const [createPost] = useCreatePostMutation()
  const imagesIds = useAppSelector(state => state.createPostSlice.picturesIds)

  const setPerv = () => {
    dispatch(setPrevStage())
  }

  const changeDescHandler = (value: string) => {
    dispatch(setDescription({ desc: value }))
  }

  const onPublishHandler = async () => {
    try {
      if (imagesIds.length) {
        debugger
        await createPost({ childrenMetadata: imagesIds, description })
        dispatch(resetState())
        onCloseBtn()

        toast.success('Post is published')
      }
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        if (!Array.isArray(error.data.messages[0].message)) {
          toast.error(error.data.messages[0].message)
        }
      }
    }
  }

  return (
    <div>
      <div className={s.title}>
        <button className={s.backBtn} onClick={setPerv} type={'button'}>
          <ArrowLeftIcon />
        </button>
        <Typography variant={'h1'}>Publication</Typography>
        <Button
          disabled={!imagesIds.length}
          onClick={onPublishHandler}
          style={{ padding: 'unset' }}
          variant={'outlined'}
        >
          Publish
        </Button>
      </div>

      <div className={s.body}>
        <div className={s.sliderBlock}>
          <SliderPost
            isDots={filteredImages.length > 1}
            sizeBtn={36}
            sliderLength={filteredImages.length}
          >
            {filteredImages.map(pic => (
              <div key={pic.id}>
                <NextImage
                  alt={'post image with filter'}
                  height={499}
                  src={pic.img}
                  style={{ objectFit: 'contain' }}
                  width={489}
                />
              </div>
            ))}
          </SliderPost>
        </div>
        <div className={s.publishBlock}>
          <div className={s.userInfo}>
            <Avatar size={36} src={data?.avatars[0]?.url} /*userName={`${data?.userName}`}*/ />
            <Typography asChild>{data?.userName ?? 'URL Profile'}</Typography>
          </div>
          <TextArea
            label={'Add publication description'}
            maxLength={500}
            onValueChange={changeDescHandler}
            placeholder={"What's new?"}
            value={description}
          />
          <Typography
            asChild
            className={s.counter}
            variant={'small_text'}
          >{`${description.length}/500`}</Typography>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'

import { useAppSelector } from '@/app/store'
import { Cropping } from '@/components/pagesComponents/createPost/cropping/Cropping'
import { Filtering } from '@/components/pagesComponents/createPost/filtering/Filtering'
import { ImageSelection } from '@/components/pagesComponents/createPost/imageSelection/ImageSelection'
import { NotificationModal } from '@/components/pagesComponents/createPost/notificationModal/NotificationModal'
import { Publish } from '@/components/pagesComponents/createPost/publish/Publish'
import { Modal } from '@/components/ui/modal'
import { clsx } from 'clsx'

import s from './CreatePost.module.scss'

type Props = {
  isOpen: boolean
  isOpenChange: (open: boolean) => void
}

export const CreatePost = ({ isOpen, isOpenChange }: Props) => {
  const [openNotification, setOpenNotification] = useState<boolean>(false)
  const stage = useAppSelector(state => state.createPostSlice.stage)
  const onCloseHandler = () => {
    if (stage === 0) {
      isOpenChange(false)
    } else {
      setOpenNotification(true)
    }
  }

  const onPublishedSuccess = () => {
    isOpenChange(false)
    setOpenNotification(false)
  }

  return (
    <div>
      <Modal onOpenChange={onCloseHandler} open={isOpen}>
        {stage === 0 && <ImageSelection onCloseBtn={onCloseHandler} />}
        {stage === 1 && <Cropping />}
        {stage === 2 && <Filtering />}
        {stage === 3 && <Publish onCloseBtn={onPublishedSuccess} />}
      </Modal>
      <NotificationModal
        closeOtherModal={isOpenChange}
        isOpen={openNotification}
        isOpenChange={setOpenNotification}
      />
    </div>
  )
}

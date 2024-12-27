import { useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { QuestionModal } from '@/components/pagesComponents/profile/postModal/questionModal'
import { Params } from '@/components/ui/profile'
import {
  useDeletePostMutation,
  useGetUserPostsQuery,
  useLazyGetUserPostsQuery,
} from '@/services/posts'
import { useParams } from 'next/navigation'

import s from './deletePost.module.scss'

type Props = {
  closeDeleteModal: (isShow: boolean) => void
  isOpen: boolean
  onCloseModalPost: () => void
}

export const DeletePost = ({ closeDeleteModal, isOpen, onCloseModalPost }: Props) => {
  const params: Params = useParams()
  const [deletePost] = useDeletePostMutation()
  const [isOpened, setIsOpened] = useState(isOpen)
  const { t } = useTranslation()

  const handlerBtnYes = () => {
    deletePost(params?.id[1] as string)
    setIsOpened(false)
    onCloseModalPost()
    closeDeleteModal(false)
  }

  const handlerBtnNo = () => {
    setIsOpened(false)
    closeDeleteModal(false)
  }

  return (
    <QuestionModal
      btnNo={handlerBtnNo}
      btnYes={handlerBtnYes}
      className={s.modal}
      isOpen={isOpened}
      question={t.postModal.deleteConfirmMsg}
      title={t.postModal.deletePost}
    />
  )
}

import { ChangeEvent, useEffect, useState } from 'react'

import { CloseIcon } from '@/assets/icons/Close'
import { useTranslation } from '@/common/hooks/useTranslation'
import { QuestionModal } from '@/components/pagesComponents/profile/postModal/questionModal/questionModal'
import { UserInfo } from '@/components/pagesComponents/publicPage/publicPosts/userInfo'
import { Button } from '@/components/ui/button'
import { TextArea } from '@/components/ui/text-area'
import { Typography } from '@/components/ui/typography'
import { useGetPostByIdQuery, useUpdatePostMutation } from '@/services/posts'

import s from './editPost.module.scss'

type Props = {
  closeEditModal: (isShow: boolean) => void
  onUpdateDescription: (description: string) => void
  postId: string
}

export const EditPost = ({ closeEditModal, onUpdateDescription, postId }: Props) => {
  const { data } = useGetPostByIdQuery(postId)
  const [updatePost] = useUpdatePostMutation()
  const [desc, setDesc] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { t } = useTranslation()

  const { avatarOwner = '', description, id, userName = '' } = data || {}

  useEffect(() => {
    setDesc(description ?? '')
  }, [description])

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(event.currentTarget.value)
  }

  const handleSubmit = () => {
    if (id) {
      updatePost({ description: desc, postId: +id ?? 0 })
    }
    closeEditModal(false)
    onUpdateDescription(desc)
  }

  const handleSubmitAndCloseModal = () => {
    setIsOpen(false)
    handleSubmit()
    closeEditModal(false)
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={s.container}>
      <div className={s.titleWithClose}>
        <Typography color={'textSecondary'} variant={'h1'}>
          {t.postModal.editPost}
        </Typography>
        <button className={s.closeButton} onClick={toggleModal} type={'button'}>
          <CloseIcon />
        </button>
        {isOpen && (
          <QuestionModal
            btnNo={toggleModal}
            btnYes={handleSubmitAndCloseModal}
            isOpen={isOpen}
            question={t.postModal.confirmationMsg}
            title={t.postModal.editPost}
          />
        )}
      </div>
      <div className={s.aboutPost}>
        <div className={s.avatarWithName}>
          <UserInfo src={avatarOwner} userName={userName} />
        </div>
        <div>
          <TextArea
            defaultValue={description}
            label={t.postModal.addPublicationDesc}
            maxLength={500}
            name={'comments'}
            onBlur={toggleModal}
            onChange={handleDescriptionChange}
            textAreaClassName={s.textArea}
          />
          <div className={s.length}>{`${desc.length}/500`}</div>
        </div>
        <div className={s.buttonWrapper}>
          <Button onClick={handleSubmit} variant={'primary'}>
            {t.postModal.saveChangesBtn}
          </Button>
        </div>
      </div>
    </div>
  )
}

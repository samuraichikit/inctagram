import { ChangeEvent, useEffect, useState } from 'react'

import { CloseIcon } from '@/assets/icons/Close'
import { QuestionModal } from '@/components/pagesComponents/profile/postModal/questionModal/questionModal'
import { UserInfo } from '@/components/pagesComponents/publicPage/publicPosts/userInfo'
import { Button } from '@/components/ui/button'
import { TextArea } from '@/components/ui/text-area'
import { Typography } from '@/components/ui/typography'
import { useGetPostByIdQuery, useUpdatePostMutation } from '@/services/userPosts/postsService'

import s from './editPost.module.scss'

type Props = {
  closeEditModal: (isShow: boolean) => void
  postId: string
}

export const EditPost = ({ closeEditModal, postId }: Props) => {
  const { data } = useGetPostByIdQuery(postId)
  const [updatePost] = useUpdatePostMutation()
  const [desc, setDesc] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)

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
          Edit Post
        </Typography>
        <button className={s.closeButton} onClick={toggleModal} type={'button'}>
          <CloseIcon />
        </button>
        {isOpen && (
          <QuestionModal
            btnNo={toggleModal}
            btnYes={handleSubmitAndCloseModal}
            isOpen={isOpen}
            question={
              'Do you really want to finish editing?\n' +
              'If you close the changes you have\n' +
              'made will not be saved.'
            }
            title={'Edit Post'}
          />
        )}
      </div>
      <div className={s.aboutPost}>
        <div className={s.avatarWithName}>
          <UserInfo src={avatarOwner} userName={userName} />
        </div>
        <div>
          <TextArea
            defaultValue={desc}
            label={'Add publication descriptions'}
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
            {'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  )
}

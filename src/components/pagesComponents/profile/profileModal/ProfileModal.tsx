import { useEffect, useState } from 'react'

import { ROUTES } from '@/common/constants'
import { useRouter } from 'next/router'

import { PublicPostModal } from '../../publicProfile/publicPostModal'
import { PostModal } from '../postModal'

type Props = {
  isMyProfile: boolean
  postId: string
  userId: string
}

export const ProfileModal = ({ isMyProfile, postId, userId }: Props) => {
  const { push } = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!postId) {
      return
    }
    setIsOpen(true)
    push(ROUTES.PROFILE.USER_POST({ id: userId, postId }), undefined, { shallow: true })
  }, [postId])

  const closeHandler = () => {
    setIsOpen(false)
    push(ROUTES.PROFILE.USER_PROFILE(userId), undefined, { shallow: true })
  }

  return (
    <>
      {isMyProfile ? (
        <PostModal isOpen={isOpen} onClose={closeHandler} />
      ) : (
        postId && <PublicPostModal isOpen={isOpen} onClose={closeHandler} postId={postId} />
      )}
    </>
  )
}

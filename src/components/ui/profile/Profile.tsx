import { useEffect, useState } from 'react'

import { PublicPostModal } from '@/components/pagesComponents/publicProfile/publicPostModal'
import { useGetProfileQuery } from '@/services/profile'
import { Comment, PublicPostResponse } from '@/services/publicPosts'
import { useRouter } from 'next/router'

import s from './profile.module.scss'

import { Typography } from '../typography'

type Props = {
  comments: Comment[]
  post: PublicPostResponse
}

export const Profile = ({ comments, post }: Props) => {
  const { data } = useGetProfileQuery()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { push } = router

  useEffect(() => {
    if (post) {
      setIsOpen(true)
    }
  }, [post])

  const closeHandler = () => {
    setIsOpen(false)
    push('/')
  }

  return (
    <div className={s.profileWrapper}>
      <PublicPostModal comments={comments} isOpen={isOpen} onClose={closeHandler} post={post} />
      <Typography variant={'h1'}>{data?.userName}</Typography>
    </div>
  )
}

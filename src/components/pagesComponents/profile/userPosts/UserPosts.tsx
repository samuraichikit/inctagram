import { useEffect, useRef, useState } from 'react'

import { ROUTES } from '@/common/constants'
import { useElementInView } from '@/common/hooks/useElementInView'
import { PostImages } from '@/components/pagesComponents/publicPage/publicPosts/postImages'
import { useMeQuery } from '@/services/auth'
import { PostResponse, useGetUserPostsQuery, useLazyGetUserPostsQuery } from '@/services/posts'
import {
  useGetPublicPostsByUserIdQuery,
  useLazyGetPublicPostsByUserIdQuery,
} from '@/services/publicPosts'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './userPosts.module.scss'

type Props = {
  userName: string
}

export const UserPosts = ({ userName }: Props) => {
  const classNames = {
    container: s.container,
  }

  const router = useRouter()
  const { id } = router.query
  const userId = id?.[0] ?? ''

  const [pageNumber, setPageNumber] = useState(1)
  const [posts, setPosts] = useState<PostResponse[]>([])
  const endCursorPostIdRef = useRef<null | string>(null)

  const { data: meData } = useMeQuery()
  const isMyProfile = meData?.userId === Number(userId)

  const { data: postsByUserName } = useGetUserPostsQuery(
    {
      pageNumber,
      pageSize: 8,
      userName,
    },
    { skip: !isMyProfile }
  )

  const { data: publicPostsByUserId } = useGetPublicPostsByUserIdQuery(
    { pageSize: 8, userId },
    { skip: router.isFallback || pageNumber > 1 }
  )

  const [getNextPosts] = useLazyGetUserPostsQuery()
  const [getNextPublicPosts] = useLazyGetPublicPostsByUserIdQuery()

  const { isInView, targetRef } = useElementInView({ threshold: 0.6 })

  const totalCount = publicPostsByUserId?.totalCount ?? postsByUserName?.totalCount ?? 0
  const totalPages = Math.ceil(totalCount / 8)
  const isSetNextPage = isInView && pageNumber < totalPages
  const initialPosts = publicPostsByUserId?.items ?? postsByUserName?.items
  const publicPosts = publicPostsByUserId?.items || []

  useEffect(() => {
    endCursorPostIdRef.current = posts[posts.length - 1]?.id.toString()
  }, [posts])

  useEffect(() => {
    if (pageNumber === 1 && initialPosts) {
      setPosts([...initialPosts])
    }
  }, [pageNumber, initialPosts])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await getNextPosts({ pageNumber, pageSize: 8, userName })

      if (data) {
        setPosts(prev => [...prev, ...data.items])
      }
    }

    const fetchPublicPosts = async () => {
      const { data } = await getNextPublicPosts({
        endCursorPostId: endCursorPostIdRef.current ?? undefined,
        pageSize: 8,
        userId,
      })

      if (data) {
        setPosts(prev => [...prev, ...data.items])
      }
    }

    if (pageNumber > 1 && pageNumber <= totalPages) {
      if (isMyProfile) {
        fetchPosts()
      } else {
        fetchPublicPosts()
      }
    }
  }, [pageNumber, getNextPosts, totalPages, userName, userId, getNextPublicPosts, isMyProfile])

  useEffect(() => {
    if (isSetNextPage) {
      setPageNumber(prev => prev + 1)
    }
  }, [isSetNextPage])

  return (
    <>
      {(pageNumber === 1 ? publicPosts : posts).map((post, index) => (
        <div
          className={classNames.container}
          key={post.id}
          ref={index === (pageNumber === 1 ? publicPosts : posts).length - 1 ? targetRef : null}
        >
          <Link href={ROUTES.PROFILE.USER_POST({ id: post.ownerId, postId: post.id })}>
            <PostImages fill images={post.images} />
          </Link>
        </div>
      ))}
    </>
  )
}

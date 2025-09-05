import { useEffect, useMemo, useRef, useState } from 'react'

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
  const router = useRouter()
  const { id } = router.query
  const userId = id?.[0] ?? ''

  const { data: meData } = useMeQuery()
  const isMyProfile = meData?.userId === Number(userId)

  const { data: postsByUserName } = useGetUserPostsQuery(
    { pageNumber: 1, pageSize: 8, userName },
    { skip: !isMyProfile }
  )

  const { data: publicPostsByUserId } = useGetPublicPostsByUserIdQuery(
    { pageSize: 8, userId },
    { skip: router.isFallback || isMyProfile }
  )

  const [extraPosts, setExtraPosts] = useState<PostResponse[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const [getNextPosts] = useLazyGetUserPostsQuery()
  const [getNextPublicPosts] = useLazyGetPublicPostsByUserIdQuery()

  const { isInView, targetRef } = useElementInView({ threshold: 0.6 })
  const endCursorPostIdRef = useRef<null | string>(null)

  const totalCount = publicPostsByUserId?.totalCount ?? postsByUserName?.totalCount ?? 0

  const allPosts = useMemo(() => {
    const firstPage = isMyProfile
      ? (postsByUserName?.items ?? [])
      : (publicPostsByUserId?.items ?? [])

    return [...firstPage, ...extraPosts]
  }, [isMyProfile, postsByUserName?.items, publicPostsByUserId?.items, extraPosts])

  useEffect(() => {
    if (allPosts.length) {
      endCursorPostIdRef.current = allPosts[allPosts.length - 1]?.id.toString()
    }
  }, [allPosts])

  useEffect(() => {
    const totalPages = Math.ceil(totalCount / 8)

    if (!isInView || isLoadingMore || currentPage >= totalPages) {
      return
    }

    setIsLoadingMore(true)
    const nextPage = currentPage + 1

    const load = isMyProfile
      ? getNextPosts({ pageNumber: nextPage, pageSize: 8, userName }).unwrap()
      : getNextPublicPosts({
          endCursorPostId: endCursorPostIdRef.current ?? undefined,
          pageSize: 8,
          userId,
        }).unwrap()

    load
      .then(res => {
        setExtraPosts(prev => [...prev, ...res.items])
        setCurrentPage(nextPage)
      })
      .finally(() => {
        setTimeout(() => setIsLoadingMore(false), 100)
      })
  }, [
    isInView,
    isLoadingMore,
    currentPage,
    totalCount,
    isMyProfile,
    userName,
    userId,
    getNextPosts,
    getNextPublicPosts,
  ])

  return (
    <>
      {allPosts.map((post, index) => (
        <div
          className={s.container}
          key={post.id}
          ref={index === allPosts.length - 1 ? targetRef : null}
        >
          <Link href={ROUTES.PROFILE.USER_POST({ id: post.ownerId, postId: post.id })}>
            <PostImages fill images={post.images} />
          </Link>
        </div>
      ))}
    </>
  )
}

import { useEffect, useState } from 'react'

import { useElementInView } from '@/common/hooks/useElementInView'
import { PostImages } from '@/components/pagesComponents/publicPage/publicPosts/postImages'
import { PostResponse, useGetUserPostsQuery, useLazyGetUserPostsQuery } from '@/services/posts'
import { useGetPublicPostsByUserIdQuery } from '@/services/publicPosts'
import { useRouter } from 'next/router'

import s from './userPosts.module.scss'

type Props = {
  isPublic?: boolean
  userName: string
}

export const UserPosts = ({ isPublic, userName }: Props) => {
  const classNames = {
    container: s.container,
  }

  const router = useRouter()
  const { id } = router.query
  const userId = id?.[0] ?? ''

  const [pageNumber, setPageNumber] = useState(1)
  const [posts, setPosts] = useState<PostResponse[]>([])
  const { data: postsByUserName } = useGetUserPostsQuery(
    {
      pageNumber,
      pageSize: 8,
      userName,
    },
    { skip: isPublic }
  )

  const { data: publicPostsByUserId } = useGetPublicPostsByUserIdQuery(
    { userId },
    { skip: router.isFallback || pageNumber > 1 }
  )

  const [getNextPosts] = useLazyGetUserPostsQuery()

  const { isInView, targetRef } = useElementInView({ threshold: 0.6 })

  const totalCount = postsByUserName?.totalCount ?? 0
  const totalPages = Math.ceil(totalCount / 8)
  const isSetNextPage = isInView && pageNumber < totalPages
  const initialPosts = isPublic ? publicPostsByUserId?.items : postsByUserName?.items

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

    if (pageNumber > 1 && pageNumber <= totalPages && !isPublic) {
      fetchPosts()
    }
  }, [pageNumber, getNextPosts, totalPages, userName, userId, isPublic])

  useEffect(() => {
    if (isSetNextPage) {
      setPageNumber(prev => prev + 1)
    }
  }, [isSetNextPage])

  return (
    <>
      {posts.map((post, index) => (
        <div
          className={classNames.container}
          key={post.id}
          ref={index === posts.length - 1 ? targetRef : null}
        >
          <PostImages fill images={post.images} />
        </div>
      ))}
    </>
  )
}

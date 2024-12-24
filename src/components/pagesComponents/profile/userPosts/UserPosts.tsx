import { useEffect, useState } from 'react'

import { useElementInView } from '@/common/hooks/useElementInView'
import { PostImages } from '@/components/pagesComponents/publicPage/publicPosts/postImages'
import {
  PostResponse,
  useGetUserPostsQuery,
  useLazyGetPublicPostsByUserIdQuery,
  useLazyGetUserPostsQuery,
} from '@/services/posts'
import { PublicPostResponse } from '@/services/publicPosts'
import { useRouter } from 'next/router'

import s from './userPosts.module.scss'

type Props = {
  publicPostsTotalCount: null | number
  userName: string
  userPosts: PublicPostResponse[]
}

export const UserPosts = ({ publicPostsTotalCount, userName, userPosts }: Props) => {
  const classNames = {
    container: s.container,
  }

  const { query } = useRouter()
  const { id } = query
  const userId = id?.[0] ?? ''

  const [pageNumber, setPageNumber] = useState(1)
  const { data: postsByUserName } = useGetUserPostsQuery(
    {
      pageNumber,
      pageSize: 8,
      userName,
    },
    { skip: !!publicPostsTotalCount }
  )

  const [posts, setPosts] = useState<PostResponse[]>([])
  const [getNextPosts] = useLazyGetUserPostsQuery()
  const [getPublicPostsByUserId] = useLazyGetPublicPostsByUserIdQuery()

  const { isInView, targetRef } = useElementInView({ threshold: 0.6 })

  const totalCount = publicPostsTotalCount ?? postsByUserName?.totalCount ?? 0
  const totalPages = Math.ceil(totalCount / 8)
  const isSetNextPage = isInView && pageNumber < totalPages
  const initialPosts = publicPostsTotalCount ? userPosts : postsByUserName?.items

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
      const { data } = await getPublicPostsByUserId({ pageNumber, pageSize: 8, userId })

      if (data) {
        setPosts(prev => [...prev, ...data.items])
      }
    }

    if (pageNumber > 1 && pageNumber <= totalPages) {
      if (publicPostsTotalCount) {
        fetchPublicPosts()
      } else {
        fetchPosts()
      }
    }
  }, [
    pageNumber,
    getNextPosts,
    totalPages,
    userName,
    getPublicPostsByUserId,
    userId,
    publicPostsTotalCount,
  ])

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

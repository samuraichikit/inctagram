import { useEffect, useState } from 'react'

import { useElementInView } from '@/common/hooks/useElementInView'
import { PostImages } from '@/components/pagesComponents/publicPage/publicPosts/postImages'
import { PostResponse, useGetUserPostsQuery, useLazyGetUserPostsQuery } from '@/services/posts'
import { PublicPostResponse } from '@/services/publicPosts'

import s from './userPosts.module.scss'

type Props = {
  userName: string
  userPosts: PublicPostResponse[]
}

export const UserPosts = ({ userName, userPosts }: Props) => {
  const classNames = {
    container: s.container,
  }
  const [pageNumber, setPageNumber] = useState(1)
  const { data: postsByUserName } = useGetUserPostsQuery(
    {
      pageNumber,
      pageSize: 8,
      userName,
    },
    { skip: !!userPosts }
  )
  const [posts, setPosts] = useState<PostResponse[]>([])
  const [getNextPosts] = useLazyGetUserPostsQuery()

  const { isInView, targetRef } = useElementInView({ threshold: 0.6 })

  const totalCount = postsByUserName?.totalCount ?? 0
  const totalPages = Math.ceil(totalCount / 8)
  const isSetNextPage = isInView && pageNumber < totalPages
  const initialPosts = userPosts ?? postsByUserName?.items

  useEffect(() => {
    if (pageNumber === 1 && initialPosts) {
      setPosts([...initialPosts])
    }
  }, [pageNumber, initialPosts, posts.length])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await getNextPosts({ pageNumber, pageSize: 8, userName })

      if (data) {
        setPosts(prev => [...prev, ...data.items])
      }
    }

    if (pageNumber > 1 && pageNumber <= totalPages) {
      fetchPosts()
    }
  }, [pageNumber, getNextPosts, totalPages, userName])

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

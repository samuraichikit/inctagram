import { PAGE_SIZE_PUBLIC_POSTS } from '@/common/constants'
import { useGetPublicPostsQuery } from '@/services/publicPosts'
import { useGetTotalUsersQuery } from '@/services/publicUser'

import s from './publicPage.module.scss'

import { PublicPost } from './publicPosts/PublicPost'
import { TotalUsers } from './totalUsers'

export const PublicPage = () => {
  const classNames = {
    container: s.container,
    posts: s.posts,
  }

  const { data: totalUsersData } = useGetTotalUsersQuery()
  const { data: postsData } = useGetPublicPostsQuery({ pageSize: PAGE_SIZE_PUBLIC_POSTS })

  const totalUsers = totalUsersData?.totalCount ?? 0
  const posts = postsData?.items

  return (
    <div className={classNames.container}>
      <TotalUsers totalUsers={totalUsers} />
      <div className={classNames.posts}>
        {posts?.map(post => {
          return <PublicPost key={post.id} post={post} />
        })}
      </div>
    </div>
  )
}

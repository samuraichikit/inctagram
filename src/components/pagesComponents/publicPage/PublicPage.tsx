import { PublicPostResponse } from '@/services/publicPosts'

import s from './publicPage.module.scss'

import { PublicPost } from './publicPosts/PublicPost'
import { TotalUsers } from './totalUsers'

type Props = {
  posts: PublicPostResponse[]
  totalUsers: number
}

export const PublicPage = ({ posts, totalUsers }: Props) => {
  const classNames = {
    container: s.container,
  }

  return (
    <div className={classNames.container}>
      <TotalUsers totalUsers={totalUsers} />
      {posts?.map(post => {
        return <PublicPost key={post.id} post={post} />
      })}
    </div>
  )
}

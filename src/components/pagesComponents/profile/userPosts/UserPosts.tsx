import { useGetUserPostsQuery } from '@/services/posts'

import { PostImages } from '../../publicPage/publicPosts/postImages'

type Props = {
  userName: string
}

export const UserPosts = ({ userName }: Props) => {
  const { data: postsByUserName } = useGetUserPostsQuery({ pageSize: 8, userName })

  return (
    <>
      {postsByUserName?.items.map(post => (
        <PostImages height={228} images={post.images} key={post.id} width={234} />
      ))}
    </>
  )
}

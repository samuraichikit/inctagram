import { getBaseLayout } from '@/components/ui/layout'
import { getAuthLayout } from '@/components/ui/layout/authLayout'
import { Profile } from '@/components/ui/profile'
import { Comment, PublicPostResponse, publicPostsService } from '@/services/publicPosts'
import { GetServerSideProps } from 'next'

import { NextPageWithLayout } from '../_app'

type Params = {
  id: string[]
}

type Props = {
  comments: Comment[]
  post: PublicPostResponse
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as Params
  const [, postId] = id

  const post = postId ? await publicPostsService.getPublicPost(postId) : null
  const comments = postId
    ? await publicPostsService.getComments(postId).then(data => data.items)
    : []

  return {
    props: {
      comments,
      post,
    },
  }
}

const UserProfile: NextPageWithLayout<Props> = ({ comments, post }) => {
  return (
    <>
      <Profile comments={comments} post={post} />
    </>
  )
}

UserProfile.getLayout = page => {
  const { post } = page.props

  return post ? getBaseLayout(page) : getAuthLayout(page)
}
export default UserProfile

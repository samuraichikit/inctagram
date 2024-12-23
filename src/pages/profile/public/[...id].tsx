import { getBaseLayout } from '@/components/ui/layout'
import { Profile } from '@/components/ui/profile'
import { NextPageWithLayout } from '@/pages/_app'
import { GetPublicProfileResponse } from '@/services/profile'
import { Comment, PublicPostResponse, publicPostsService } from '@/services/publicPosts'
import { publicUserService } from '@/services/publicUser'
import { GetServerSideProps } from 'next'

type Params = {
  id: string[]
}

type Props = {
  comments: Comment[]
  post: PublicPostResponse
  publicProfile: GetPublicProfileResponse
  userPosts: PublicPostResponse[]
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as Params
  const [userId, postId] = id

  const post = postId ? await publicPostsService.getPublicPost(postId) : null
  const comments = postId
    ? await publicPostsService.getComments(postId).then(data => data.items)
    : []
  const publicProfile = await publicUserService.getPublicProfile(userId)
  const userPosts = await publicPostsService.getPublicPostsByUserId(userId).then(data => data.items)

  return {
    props: {
      comments,
      post,
      publicProfile,
      userPosts
    },
  }
}

const UserProfile: NextPageWithLayout<Props> = ({ comments, post, publicProfile, userPosts }) => {
  return (
    <>
      <Profile comments={comments} post={post} publicProfile={publicProfile} userPosts={userPosts} />
    </>
  )
}

UserProfile.getLayout = getBaseLayout

export default UserProfile

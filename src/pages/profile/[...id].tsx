import { getBaseLayout } from '@/components/ui/layout'
import { getAuthLayout } from '@/components/ui/layout/authLayout'
import { Profile } from '@/components/ui/profile'
import { GetPublicProfileResponse } from '@/services/profile'
import { Comment, PublicPostResponse, publicPostsService } from '@/services/publicPosts'
import { publicUserService } from '@/services/publicUser'
import { GetServerSideProps } from 'next'

import { NextPageWithLayout } from '../_app'

type Params = {
  id: string[]
}

type Props = {
  comments: Comment[]
  post: PublicPostResponse
  publicProfile: GetPublicProfileResponse
}

const UserProfile: NextPageWithLayout<Props> = () => {
  return (
    <>
      <Profile />
    </>
  )
}

UserProfile.getLayout = page => {
  const { post } = page.props

  return post ? getBaseLayout(page) : getAuthLayout(page)
}
export default UserProfile

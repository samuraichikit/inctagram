import { AppStore, wrapper } from '@/app/store'
import { getBaseLayout } from '@/components/ui/layout'
import { Profile, UserProfileProps } from '@/components/ui/profile'
import { NextPageWithLayout } from '@/pages/_app'
import { baseApi } from '@/services/baseApi'
import { publicPostsService } from '@/services/publicPosts'
import { publicUserService } from '@/services/publicUser'
import { GetServerSideProps } from 'next'

type Params = {
  id: string[]
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store: AppStore) =>
    async ({ params }) => {
      const { id } = params as Params
      const [userId, postId] = id

      store.dispatch(publicUserService.endpoints.getPublicProfile.initiate({ profileId: userId }))
      store.dispatch(
        publicPostsService.endpoints.getPublicPostsByUserId.initiate({ pageSize: 8, userId })
      )
      if (postId) {
        store.dispatch(publicPostsService.endpoints.getPublicPost.initiate({ postId }))
        store.dispatch(publicPostsService.endpoints.getComments.initiate({ postId }))
      }

      await Promise.all(store.dispatch(baseApi.util.getRunningQueriesThunk()))

      return {
        props: { postId: postId ?? null, userId: userId ?? null },
      }
    }
)
const UserProfile: NextPageWithLayout<UserProfileProps> = ({ postId, userId }) => {
  return <Profile postId={postId} userId={userId} />
}

UserProfile.getLayout = getBaseLayout

export default UserProfile

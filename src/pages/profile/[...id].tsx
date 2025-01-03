import { AppStore, wrapper } from '@/app/store'
import { getBaseLayout } from '@/components/ui/layout'
import { Profile } from '@/components/ui/profile'
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
    async ({ params, query }) => {
      const { id } = params as Params
      const [userId, postId] = id

      if (query.skipSSR) {
        return {
          props: {},
        }
      }

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
        props: {},
      }
    }
)

const UserProfile: NextPageWithLayout = () => {
  return (
    <>
      <Profile />
    </>
  )
}

UserProfile.getLayout = getBaseLayout

export default UserProfile

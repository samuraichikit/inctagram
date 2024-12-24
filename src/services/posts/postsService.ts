import { baseApi } from '../baseApi'
import {
  GetUserPostsArgs,
  GetUserPostsByUserIdArgs,
  PostsByUserIdResponse,
  PostsByUserNameResponse,
} from './postsService.types'

const postService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPublicPostsByUserId: builder.query<PostsByUserIdResponse, GetUserPostsByUserIdArgs>({
      query: ({ userId, ...params }) => ({ params, url: `v1/public-posts/user/${userId}` }),
    }),
    getUserPosts: builder.query<PostsByUserNameResponse, GetUserPostsArgs>({
      query: ({ userName, ...params }) => ({
        params,
        url: `v1/posts/${userName}`,
      }),
    }),
  }),
})

export const {
  useGetUserPostsQuery,
  useLazyGetPublicPostsByUserIdQuery,
  useLazyGetUserPostsQuery,
} = postService

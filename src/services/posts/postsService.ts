import { baseApi } from '../baseApi'
import { GetUserPosts, PostsByUserNameResponse } from './postsService.types'

const postService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUserPosts: builder.query<PostsByUserNameResponse, GetUserPosts>({
      query: ({ userName, ...params }) => ({
        params,
        url: `v1/posts/${userName}`,
      }),
    }),
  }),
})

export const { useGetUserPostsQuery, useLazyGetUserPostsQuery } = postService

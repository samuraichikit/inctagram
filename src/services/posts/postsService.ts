import { baseApi } from '../baseApi'
import { GetUserPostsArgs, PostsByUserNameResponse } from './postsService.types'

const postService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUserPosts: builder.query<PostsByUserNameResponse, GetUserPostsArgs>({
      query: ({ userName, ...params }) => ({
        params,
        url: `v1/posts/${userName}`,
      }),
    }),
  }),
})

export const { useGetUserPostsQuery, useLazyGetUserPostsQuery } = postService

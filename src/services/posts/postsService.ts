import { CommentsResponse } from '@/services/publicPosts'

import { baseApi } from '../baseApi'
import {
  GetUserPosts,
  PostItemResponse,
  PostUpdate,
  PostsByUserNameResponse,
} from './postsService.types'

const postService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPostById: builder.query<PostItemResponse, string>({
      query: postId => ({
        url: `/v1/posts/id/${postId}`,
      }),
    }),
    getPostMessageById: builder.query<CommentsResponse, string>({
      query: postId => ({
        url: `/v1/posts/${postId}/comments`,
      }),
    }),
    getUserPosts: builder.query<PostsByUserNameResponse, GetUserPosts>({
      query: ({ userName, ...params }) => ({
        params,
        url: `v1/posts/${userName}`,
      }),
    }),
    updatePost: builder.mutation<void, PostUpdate>({
      query: ({ description, postId }) => ({
        body: { description },
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        url: `/v1/posts/${postId}`,
      }),
    }),
  }),
})

export const {
  useGetPostByIdQuery,
  useGetPostMessageByIdQuery,
  useGetUserPostsQuery,
  useLazyGetUserPostsQuery,
  useUpdatePostMutation,
} = postService

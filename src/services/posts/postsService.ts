import { CommentsResponse } from '@/services/publicPosts'

import { baseApi } from '../baseApi'
import {
  GetUserPostsArgs,
  LikeStatus,
  PostItemResponse,
  PostUpdate,
  PostsByUserNameResponse,
} from './postsService.types'

const postService = baseApi.injectEndpoints({
  endpoints: builder => ({
    deletePost: builder.mutation<void, string>({
      invalidatesTags: (result, error, postId) => [
        { id: postId, type: 'Posts' },
        { id: 'LIST', type: 'Posts' },
      ],
      query: postId => ({
        method: 'DELETE',
        url: `/v1/posts/${postId}`,
      }),
    }),
    getPostById: builder.query<PostItemResponse, string>({
      providesTags: (result, error, postId) => (result ? [{ id: postId, type: 'Posts' }] : []),
      query: postId => ({
        url: `/v1/posts/id/${postId}`,
      }),
    }),
    getPostMessageById: builder.query<CommentsResponse, string>({
      providesTags: ['Comments'],
      query: postId => ({
        url: `/v1/posts/${postId}/comments`,
      }),
    }),
    getUserPosts: builder.query<PostsByUserNameResponse, GetUserPostsArgs>({
      providesTags: result =>
        result
          ? [
              { id: 'LIST', type: 'Posts' },
              ...result.items.map(post => ({ id: post.id.toString(), type: 'Posts' }) as const),
            ]
          : [{ id: 'LIST', type: 'Posts' }],
      query: ({ userName, ...params }) => ({
        params,
        url: `v1/posts/${userName}`,
      }),
    }),
    updateLikeStatus: builder.mutation<void, { likeStatus: LikeStatus; postId: number }>({
      invalidatesTags: (result, error, { postId }) => [{ id: postId, type: 'Posts' }],
      query: ({ likeStatus, postId }) => ({
        body: { likeStatus },
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        url: `/v1/posts/${postId}/like-status`,
      }),
    }),
    updatePost: builder.mutation<void, PostUpdate>({
      invalidatesTags: (result, error, { postId }) => [{ id: postId, type: 'Posts' }],
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
  useDeletePostMutation,
  useGetPostByIdQuery,
  useGetPostMessageByIdQuery,
  useGetUserPostsQuery,
  useLazyGetUserPostsQuery,
  useUpdateLikeStatusMutation,
  useUpdatePostMutation,
} = postService

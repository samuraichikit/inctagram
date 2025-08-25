import { baseApi } from '@/services/baseApi'

import {
  CommentsViewModel,
  CreateAnswerToCommentRequest,
  CreateCommentRequest,
  GetAnswerCommentLikesRequest,
  GetAnswersToPostCommentRequest,
  GetAnswersToPostCommentsResponse,
  GetCommentLikesRequest,
  GetCommentLikesResponse,
  GetPostCommentsRequest,
  GetPostCommentsResponse,
  UpdateAnswerLikeStatusRequest,
  UpdateLikeStatusRequest,
} from './commentPostService.types'

const commentsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createNewAnswerToComment: builder.mutation<CommentsViewModel, CreateAnswerToCommentRequest>({
      invalidatesTags: ['Answer'],
      query: ({ commentId, postId, ...body }) => ({
        body,
        method: 'POST',
        url: `/v1/posts/${postId}/comments/${commentId}/answers`,
      }),
    }),
    createNewComment: builder.mutation<CommentsViewModel, CreateCommentRequest>({
      invalidatesTags: ['Comments'],
      query: ({ postId, ...body }) => ({
        body,
        method: 'POST',
        url: `/v1/posts/${postId}/comments`,
      }),
    }),
    getAnswerCommentLikes: builder.query<GetCommentLikesResponse, GetAnswerCommentLikesRequest>({
      query: ({ answerId, commentId, postId, ...args }) => ({
        method: 'GET',
        params: args,
        url: `/v1/posts/${postId}/comments/${commentId}/answers/${answerId}/likes`,
      }),
    }),
    getAnswersToPostComment: builder.query<
      GetAnswersToPostCommentsResponse,
      GetAnswersToPostCommentRequest
    >({
      providesTags: ['Answer'],
      query: ({ commentId, postId, ...args }) => ({
        method: 'GET',
        params: args,
        url: `/v1/posts/${postId}/comments/${commentId}/answers`,
      }),
    }),
    getCommentLikes: builder.query<GetCommentLikesResponse, GetCommentLikesRequest>({
      query: ({ commentId, postId, ...args }) => ({
        method: 'GET',
        params: args,
        url: `/v1/posts/${postId}/comments/${commentId}/likes`,
      }),
    }),
    getPostComments: builder.query<GetPostCommentsResponse, GetPostCommentsRequest>({
      providesTags: ['Comments'],
      query: ({ postId, ...args }) => ({
        method: 'GET',
        params: args,
        url: `/v1/posts/${postId}/comments`,
      }),
    }),
    updateAnswerLikeStatus: builder.mutation<void, UpdateAnswerLikeStatusRequest>({
      invalidatesTags: ['Answer'],
      query: ({ answerId, commentId, postId, ...body }) => ({
        body,
        method: 'PUT',
        url: `/v1/posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
      }),
    }),
    updateCommentLikeStatus: builder.mutation<void, UpdateLikeStatusRequest>({
      invalidatesTags: ['Comments'],
      query: ({ commentId, postId, ...body }) => ({
        body,
        method: 'PUT',
        url: `/v1/posts/${postId}/comments/${commentId}/like-status`,
      }),
    }),
  }),
})

export const {
  useCreateNewAnswerToCommentMutation,
  useCreateNewCommentMutation,
  useGetAnswerCommentLikesQuery,
  useGetAnswersToPostCommentQuery,
  useGetCommentLikesQuery,
  useGetPostCommentsQuery,
  useUpdateAnswerLikeStatusMutation,
  useUpdateCommentLikeStatusMutation,
} = commentsApi

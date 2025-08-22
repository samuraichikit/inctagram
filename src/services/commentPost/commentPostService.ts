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
      invalidatesTags: (result, error, { commentId }) => [{ id: commentId, type: 'Answer' }],
      query: ({ commentId, postId, ...body }) => ({
        body,
        method: 'POST',
        url: `/v1/posts/${postId}/comments/${commentId}/answers`,
      }),
    }),

    createNewComment: builder.mutation<CommentsViewModel, CreateCommentRequest>({
      invalidatesTags: (result, error, { postId }) => [{ id: postId, type: 'Comments' }],
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
      providesTags: (result, error, { commentId }) =>
        result ? [{ id: commentId, type: 'Answer' }] : [],
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
      providesTags: (result, error, { postId }) =>
        result ? [{ id: postId, type: 'Comments' }] : [{ id: 'LIST', type: 'Comments' }],
      query: ({ postId, ...args }) => ({
        method: 'GET',
        params: args,
        url: `/v1/posts/${postId}/comments`,
      }),
    }),

    updateAnswerLikeStatus: builder.mutation<void, UpdateAnswerLikeStatusRequest>({
      invalidatesTags: (result, error, { commentId }) => [{ id: commentId, type: 'Answer' }],
      query: ({ answerId, commentId, postId, ...body }) => ({
        body,
        method: 'PUT',
        url: `/v1/posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
      }),
    }),

    updateCommentLikeStatus: builder.mutation<void, UpdateLikeStatusRequest>({
      invalidatesTags: (result, error, { postId }) => [{ id: postId, type: 'Comments' }],
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

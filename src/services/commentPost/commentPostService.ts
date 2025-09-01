import { baseApi } from '@/services/baseApi'
import { LikeStatus, PostItemResponse } from '@/services/posts'

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
      query: ({ commentId, postId, ...body }) => {
        return {
          body,
          method: 'POST',
          url: `/v1/posts/${postId}/comments/${commentId}/answers`,
        }
      },
    }),
    createNewComment: builder.mutation<CommentsViewModel, CreateCommentRequest>({
      invalidatesTags: ['Comments'],
      query: ({ postId, ...body }) => {
        return {
          body,
          method: 'POST',
          url: `/v1/posts/${postId}/comments`,
        }
      },
    }),
    getAnswerCommentLikes: builder.query<GetCommentLikesResponse, GetAnswerCommentLikesRequest>({
      query: ({ answerId, commentId, postId, ...args }) => {
        return {
          method: 'GET',
          params: args,
          url: `/v1/posts/${postId}/comments/${commentId}/answers/${answerId}/likes`,
        }
      },
    }),
    getAnswersToPostComment: builder.query<
      GetAnswersToPostCommentsResponse,
      GetAnswersToPostCommentRequest
    >({
      providesTags: ['Answer'],
      query: ({ commentId, postId, ...args }) => {
        return {
          method: 'GET',
          params: args,
          url: `/v1/posts/${postId}/comments/${commentId}/answers`,
        }
      },
    }),
    getCommentLikes: builder.query<GetCommentLikesResponse, GetCommentLikesRequest>({
      query: ({ commentId, postId, ...args }) => {
        return {
          method: 'GET',
          params: args,
          url: `/v1/posts/${postId}/comments/${commentId}/likes`,
        }
      },
    }),
    getPostComments: builder.query<GetPostCommentsResponse, GetPostCommentsRequest>({
      providesTags: ['Comments'],
      query: ({ postId, ...args }) => {
        return {
          method: 'GET',
          params: args,
          url: `/v1/posts/${postId}/comments`,
        }
      },
    }),
    updateAnswerLikeStatus: builder.mutation<void, UpdateAnswerLikeStatusRequest>({
      invalidatesTags: ['Answer'],
      async onQueryStarted(
        { answerId, commentId, likeStatus, postId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          commentsApi.util.updateQueryData(
            'getAnswersToPostComment',
            { commentId, postId },
            draft => {
              const answer = draft.items.find(a => a.id === answerId)

              if (answer) {
                answer.isLiked = likeStatus === LikeStatus.LIKE
                answer.likeCount += likeStatus === LikeStatus.LIKE ? 1 : -1
              }
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      query: ({ answerId, commentId, likeStatus, postId }) => {
        return {
          body: { likeStatus },
          method: 'PUT',
          url: `/v1/posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
        }
      },
    }),
    updateCommentLikeStatus: builder.mutation<void, UpdateLikeStatusRequest>({
      async onQueryStarted({ commentId, likeStatus, postId }, { dispatch, queryFulfilled }) {
        const patchComments = dispatch(
          commentsApi.util.updateQueryData('getPostComments', { postId }, draft => {
            const comment = draft.items.find(c => c.id === commentId)

            if (comment) {
              comment.isLiked = likeStatus === LikeStatus.LIKE
              comment.likeCount += likeStatus === LikeStatus.LIKE ? 1 : -1
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchComments.undo()
        }
      },
      query: ({ commentId, likeStatus, postId }) => {
        return {
          body: { likeStatus },
          method: 'PUT',
          url: `/v1/posts/${postId}/comments/${commentId}/like-status`,
        }
      },
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
  useLazyGetPostCommentsQuery,
  useUpdateAnswerLikeStatusMutation,
  useUpdateCommentLikeStatusMutation,
} = commentsApi

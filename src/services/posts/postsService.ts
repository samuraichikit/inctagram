import { CommentsResponse } from '@/services/publicPosts'

import { baseApi } from '../baseApi'
import {
  GetUserPostsArgs,
  LikeStatus,
  PostItemResponse,
  PostUpdate,
  PostsByUserNameResponse,
} from './postsService.types'
import { pageHomeService } from '@/services/pageHomeService'
import { MeResponse } from '@/services/auth'
import { GetPublicProfileResponse } from '@/services/profile'

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
      async onQueryStarted({ likeStatus, postId }, { dispatch, getState, queryFulfilled }) {
        const state = getState()

        const currentUserId = (
          state.baseApi.queries['me(undefined)']?.data as MeResponse
        )?.userId.toString()
        const avatars = (
          state.baseApi.queries[`getPublicProfile({"profileId":"2798"})`]
            ?.data as GetPublicProfileResponse
        )?.avatars[1]

        const patchResult = dispatch(
          pageHomeService.util.updateQueryData(
            'getFollowersPublications',
            { endCursorPostId: 0 },
            draft => {
              const post = draft.items.find(p => p.id === postId)

              if (post) {
                post.isLiked = likeStatus === LikeStatus.LIKE
                post.likesCount += likeStatus === LikeStatus.LIKE ? 1 : -1

                if (likeStatus === LikeStatus.LIKE) {
                  if (!post.avatarWhoLikes.includes(avatars.url)) {
                    post.avatarWhoLikes.unshift(avatars.url)
                  }
                } else {
                  post.avatarWhoLikes = post.avatarWhoLikes.filter(src => src !== avatars.url)
                }
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

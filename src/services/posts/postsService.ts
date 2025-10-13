import { pageHomeService } from '@/services/pageHomeService'
import { GetFollowersPublications } from '@/services/pageHomeService/pageHomeService.types'
import { CommentsResponse } from '@/services/publicPosts'

import { baseApi } from '../baseApi'
import {
  GetUserPostsArgs,
  LikeStatus,
  PostItemResponse,
  PostLikesResponse,
  PostUpdate,
  PostsByUserNameResponse,
} from './postsService.types'

function applyLikeUpdate(draft: PostItemResponse, likeStatus: LikeStatus, likedAvatarUser: string) {
  draft.isLiked = likeStatus === LikeStatus.LIKE
  draft.likesCount += likeStatus === LikeStatus.LIKE ? 1 : -1

  if (likeStatus === LikeStatus.LIKE) {
    if (!draft.avatarWhoLikes.includes(likedAvatarUser)) {
      draft.avatarWhoLikes.push(likedAvatarUser)
    }
  } else {
    draft.avatarWhoLikes = draft.avatarWhoLikes.filter(url => url !== likedAvatarUser)
  }
}

function applyLikeUpdateToList(
  draft: GetFollowersPublications,
  postId: number,
  likeStatus: LikeStatus,
  likedAvatarUser: string
) {
  const post = draft.items.find(p => p.id === postId)

  if (!post) {
    return
  }
  applyLikeUpdate(post, likeStatus, likedAvatarUser)
}

export const postsService = baseApi.injectEndpoints({
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
    getPostLikes: builder.query<PostLikesResponse, { postId: number }>({
      providesTags: (result, error, { postId }) => [{ id: postId, type: 'Likes' }],
      query: ({ postId }) => ({
        url: `/v1/posts/${postId}/likes`,
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
    updateLikeStatus: builder.mutation<
      void,
      { endCursorPostId: number; likeStatus: LikeStatus; likedAvatarUser: string; postId: number }
    >({
      invalidatesTags: (result, error, { postId }) => [
        { id: postId, type: 'Likes' },
        { id: postId, type: 'Posts' },
        { id: postId, type: 'FollowersPublications' },
      ],
      async onQueryStarted(
        { endCursorPostId, likeStatus, likedAvatarUser, postId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          pageHomeService.util.updateQueryData(
            'getFollowersPublications',
            { endCursorPostId },
            draft => applyLikeUpdateToList(draft, postId, likeStatus, likedAvatarUser)
          )
        )

        const patchPost = dispatch(
          postsService.util.updateQueryData('getPostById', postId.toString(), draft =>
            applyLikeUpdate(draft, likeStatus, likedAvatarUser)
          )
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
          patchPost.undo()
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
  useGetPostLikesQuery,
  useGetPostMessageByIdQuery,
  useGetUserPostsQuery,
  useLazyGetUserPostsQuery,
  useUpdateLikeStatusMutation,
  useUpdatePostMutation,
} = postsService

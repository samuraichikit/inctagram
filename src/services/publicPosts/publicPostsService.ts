import { baseApi } from '../baseApi'
import {
  CommentsResponse,
  GetCommentsArgs,
  GetPublicPostArgs,
  GetPublicPostsArgs,
  GetPublicPostsByUserIdArgs,
  GetPublicPostsResponse,
  PublicPostResponse,
} from './publicPosts.types'

export const publicPostsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getComments: builder.query<CommentsResponse, GetCommentsArgs>({
      query: ({ postId, ...params }) => ({ params, url: `v1/public-posts/${postId}/comments` }),
    }),
    getPublicPost: builder.query<PublicPostResponse, GetPublicPostArgs>({
      query: ({ postId }) => ({ url: `v1/public-posts/${postId}` }),
    }),
    getPublicPosts: builder.query<GetPublicPostsResponse, GetPublicPostsArgs>({
      query: ({ endCursorPostId, ...params }) => ({
        params,
        url: `v1/public-posts/all/${endCursorPostId}`,
      }),
    }),
    getPublicPostsByUserId: builder.query<GetPublicPostsResponse, GetPublicPostsByUserIdArgs>({
      query: ({ userId, ...params }) => ({ params, url: `v1/public-posts/user/${userId}` }),
    }),
  }),
})

export const {
  useGetCommentsQuery,
  useGetPublicPostQuery,
  useGetPublicPostsByUserIdQuery,
  useGetPublicPostsQuery,
  useLazyGetPublicPostsByUserIdQuery,
} = publicPostsService

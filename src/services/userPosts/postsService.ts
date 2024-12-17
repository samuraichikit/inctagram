import { baseApi } from '@/services/baseApi'
import { GetpostByIdResponse, PostUpdate } from '@/services/userPosts/post.types'

const postsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPostById: builder.query<GetpostByIdResponse, string>({
      query: postId => ({
        url: `/v1/posts/id/${postId}`,
      }),
    }),
    updatePost: builder.mutation<void, PostUpdate>({
      query: ({ description, postId }) => ({
        description,
        method: 'POST',
        url: `/v1/posts/${postId}`,
      }),
    }),
  }),
})

export const { useGetPostByIdQuery, useUpdatePostMutation } = postsService

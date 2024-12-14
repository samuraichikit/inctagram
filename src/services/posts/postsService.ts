import { baseApi } from '@/services/baseApi'
import { PostUpdate } from '@/services/posts/post.types'

const postsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    updatePost: builder.mutation<void, PostUpdate>({
      query: ({ description, postId }) => ({
        description,
        method: 'POST',
        url: `/api/v1/posts/${postId}`,
      }),
    }),
  }),
})

import { baseApi } from '@/services/baseApi'
import {
  CreatePostData,
  FileUploadResponse,
  GetPostResponse,
} from '@/services/publicPosts/post.types'

const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<GetPostResponse, CreatePostData>({
      invalidatesTags: ['Posts'],
      query: body => {
        return {
          body,
          method: 'POST',
          url: `v1/posts`,
        }
      },
    }),
    uploadPostPhoto: builder.mutation<FileUploadResponse, FormData>({
      query: file => {
        return {
          body: file,
          method: 'POST',
          url: `v1/posts/image`,
        }
      },
    }),
  }),
})

export const { useCreatePostMutation, useUploadPostPhotoMutation } = postApi

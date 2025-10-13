import { toast } from 'react-toastify'

import { baseApi } from '@/services/baseApi'
import {
  CreatePostData,
  FileUploadResponse,
  GetPostResponse,
} from '@/services/publicPosts/post.types'

import { PostsByUserNameResponse, postsService } from '../posts'

const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<GetPostResponse, CreatePostData>({
      invalidatesTags: ['Posts', 'Profile'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: newPost } = await queryFulfilled

          dispatch(
            postsService.util.updateQueryData(
              'getUserPosts',
              { pageNumber: 1, pageSize: 8, userName: newPost.userName },
              (draft: PostsByUserNameResponse) => {
                draft.items.unshift(newPost)
                draft.totalCount = (draft.totalCount ?? 0) + 1
              }
            )
          )
        } catch (err) {
          toast.error('Ошибка добавления поста')
        }
      },
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

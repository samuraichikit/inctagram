import { baseApi } from '../baseApi'
import { AddCommentArgs, CommentData } from './commentsAnswers.types'

const usersService = baseApi.injectEndpoints({
  endpoints: builder => ({
    addComment: builder.mutation<CommentData, AddCommentArgs>({
      invalidatesTags: ['Comments'],
      query: ({ content, postId }) => ({
        body: { content },
        method: 'POST',
        url: `v1/posts/${postId}/comments`,
      }),
    }),
  }),
})

export const { useAddCommentMutation } = usersService

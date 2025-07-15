import { baseApi } from '../baseApi'
import { AddCommentArgs, CommentData } from './commentsAnswers.types'

const usersService = baseApi.injectEndpoints({
  endpoints: builder => ({
    addComment: builder.mutation<CommentData, AddCommentArgs>({
      invalidatesTags: ['Profile'],
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/users/following',
      }),
    }),
  }),
})

export const { useAddCommentMutation } = usersService

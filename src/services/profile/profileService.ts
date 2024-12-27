import { baseApi } from '../baseApi'
import {
  GetProfileResponse,
  GetProfileWithPostsResponse,
  UpdateProfile,
} from './profileService.types'

const profileService = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteAvatar: builder.mutation<void, void>({
      invalidatesTags: ['Me', 'Profile'],
      query: () => ({
        method: 'DELETE',
        url: 'v1/users/profile/avatar',
      }),
    }),
    getProfile: builder.query<GetProfileResponse, void>({
      providesTags: ['Me'],
      query: () => ({ url: 'v1/users/profile' }),
    }),

    getProfileWithPosts: builder.query<GetProfileWithPostsResponse, string>({
      providesTags: ['Me'],
      query: userId => ({ url: `v1/users/${userId}` }),
    }),
    updateProfile: builder.mutation<void, UpdateProfile>({
      invalidatesTags: ['Me'],
      query: body => ({ body, method: 'PUT', url: 'v1/users/profile' }),
    }),
    uploadAvatar: builder.mutation<void, AvatarFile>({
      invalidatesTags: ['Me'],
      query: ({ file }) => {
        const formData = new FormData()

        formData.append('file', file)

        return {
          body: formData,
          method: 'POST',
          url: 'v1/users/profile/avatar',
        }
      },
    }),
  }),
})

export const {
  useDeleteAvatarMutation,
  useGetProfileQuery,
  useGetProfileWithPostsQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} = profileService

type AvatarFile = {
  file: File
}

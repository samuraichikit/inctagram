import { baseApi } from '../baseApi'
import {
  GetProfileResponse,
  GetProfileWithPostsResponse,
  UpdateProfile,
} from './profileService.types'

const profileService = baseApi.injectEndpoints({
  endpoints: builder => ({
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
  }),
})

export const { useGetProfileQuery, useGetProfileWithPostsQuery, useUpdateProfileMutation } =
  profileService

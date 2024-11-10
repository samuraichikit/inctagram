import { baseApi } from '../baseApi'
import { GetProfileResponse, GetProfileWithPostsResponse } from './profileService.types'

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
  }),
})

export const { useGetProfileQuery, useGetProfileWithPostsQuery } = profileService

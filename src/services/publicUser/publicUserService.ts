import { baseApi } from '../baseApi'
import { GetPublicProfileResponse } from '../profile'
import { GetPublicProfileArgs, PublicUserResponse } from './publicUser.types'

export const publicUserService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPublicProfile: builder.query<GetPublicProfileResponse, GetPublicProfileArgs>({
      query: ({ profileId }) => ({ url: `v1/public-user/profile/${profileId}` }),
    }),
    getTotalUsers: builder.query<PublicUserResponse, void>({
      query: () => ({ url: `v1/public-user` }),
    }),
  }),
})

export const { useGetPublicProfileQuery, useGetTotalUsersQuery } = publicUserService

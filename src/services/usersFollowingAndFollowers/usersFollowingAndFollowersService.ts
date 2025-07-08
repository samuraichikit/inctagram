import { baseApi } from '../baseApi'
import {
  FollowingArgs,
  GetUsersProfilesArgs,
  UsersProfiles,
} from './usersFollowingAndFollowers.types'

const usersService = baseApi.injectEndpoints({
  endpoints: builder => ({
    following: builder.mutation<void, FollowingArgs>({
      invalidatesTags: ['Profile'],
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/users/following',
      }),
    }),
    getUsersProfiles: builder.query<UsersProfiles, GetUsersProfilesArgs>({
      query: params => ({
        params,
        url: 'v1/users',
      }),
    }),
  }),
})

export const { useFollowingMutation, useGetUsersProfilesQuery } = usersService

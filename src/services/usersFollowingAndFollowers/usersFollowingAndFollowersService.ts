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
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.search !== previousArg?.search || currentArg?.cursor !== previousArg?.cursor
        )
      },
      merge: (currentCache, newPage) => {
        currentCache.items.push(...newPage.items)
        currentCache.nextCursor = newPage.nextCursor
      },
      query: params => ({
        params,
        url: 'v1/users',
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => ({
        endpointName,
        search: queryArgs.search,
      }),
    }),
  }),
})

export const { useFollowingMutation, useGetUsersProfilesQuery } = usersService

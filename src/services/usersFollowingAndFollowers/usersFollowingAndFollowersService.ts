import { baseApi } from '../baseApi'
import {
  FollowArgs,
  GetUserFollowArgs,
  GetUsersProfilesArgs,
  UnfollowArgs,
  UsersProfiles,
} from './usersFollowingAndFollowers.types'

const usersService = baseApi.injectEndpoints({
  endpoints: builder => ({
    follow: builder.mutation<void, FollowArgs>({
      invalidatesTags: ['Profile'],
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/users/following',
      }),
    }),
    getUserFollowers: builder.query<UsersProfiles, GetUserFollowArgs>({
      query: ({ userName, ...args }) => {
        return {
          method: 'GET',
          params: args,
          url: `v1/users/${userName}/following`,
        }
      },
    }),
    getUserFollowing: builder.query<UsersProfiles, GetUserFollowArgs>({
      query: ({ userName, ...args }) => {
        return {
          method: 'GET',
          params: args,
          url: `v1/users/${userName}/followers`,
        }
      },
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
    unfollow: builder.mutation<void, UnfollowArgs>({
      invalidatesTags: ['Profile'],
      query: ({ userId }) => ({
        method: 'DELETE',
        url: `v1/users/follower/${userId}`,
      }),
    }),
  }),
})

export const {
  useFollowMutation,
  useGetUserFollowersQuery,
  useGetUserFollowingQuery,
  useGetUsersProfilesQuery,
  useUnfollowMutation,
} = usersService

import { baseApi } from '../baseApi'
import {
  FollowingArgs,
  GetUsersProfilesArgs,
  UsersProfiles,
} from './usersFollowingAndFollowersService.types'

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
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.cursor !== previousArg?.cursor || currentArg?.search !== previousArg?.search,
      merge: (currentCache, newData, { arg }) => {
        if (!arg.cursor) {
          return newData
        }
        const currentCashItems = currentCache?.items ?? []
        const newDataItems = newData?.items ?? []
        const existingIds = new Set(currentCashItems.map(item => item.id))
        const filteredItems = newDataItems.filter(item => !existingIds.has(item.id))

        return {
          ...currentCache,
          items: [...currentCashItems, ...filteredItems],
          nextCursor: newData.nextCursor,
        }
      },

      query: params => ({
        params,
        url: 'v1/users',
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs?.search}`
      },
    }),
  }),
})

export const { useFollowingMutation, useGetUsersProfilesQuery } = usersService

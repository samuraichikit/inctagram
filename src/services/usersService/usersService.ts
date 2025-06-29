import { baseApi } from '../baseApi'
import { GetUsersProfilesArgs, UsersProfiles } from './usersService.types'

const usersService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUsersProfiles: builder.query<UsersProfiles, GetUsersProfilesArgs>({
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.cursor !== previousArg?.cursor || currentArg?.search !== previousArg?.search,
      merge: (currentCache, newData, { arg }) => {
        if (!arg.cursor) {
          return newData
        }
        const existingIds = new Set(currentCache.items.map(item => item.id))
        const filteredItems = newData.items.filter(item => !existingIds.has(item.id))

        currentCache.items.push(...filteredItems)
        currentCache.nextCursor = newData.nextCursor
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

export const { useGetUsersProfilesQuery } = usersService

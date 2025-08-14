import { baseApi } from '../baseApi'
import { GetFollowersPublications, GetFollowersPublicationsArgs } from './pageHomeService.types'

export const pageHomeService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getFollowersPublications: builder.query<GetFollowersPublications, GetFollowersPublicationsArgs>(
      {
        forceRefetch({ currentArg, previousArg }) {
          return currentArg?.endCursorPostId !== previousArg?.endCursorPostId
        },
        merge: (currentCache, newPage) => {
          const existingIds = new Set(currentCache.items.map(p => p.id))
          const newItems = newPage.items.filter(p => !existingIds.has(p.id))

          currentCache.items.push(...newItems)
          currentCache.nextCursor = newPage.nextCursor
        },
        providesTags: result =>
          result
            ? [
                { id: 'LIST', type: 'FollowersPublications' },
                ...result.items.map(pub => ({
                  id: pub.id,
                  type: 'FollowersPublications' as const,
                })),
              ]
            : [{ id: 'LIST', type: 'FollowersPublications' }],
        query: params => ({
          params,
          url: `v1/home/publications-followers`,
        }),
        serializeQueryArgs: ({ endpointName }) => endpointName,
      }
    ),
  }),
})

export const { useGetFollowersPublicationsQuery } = pageHomeService

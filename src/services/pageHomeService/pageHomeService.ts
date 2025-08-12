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
          currentCache.items.push(...newPage.items)
          currentCache.nextCursor = newPage.nextCursor
        },
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

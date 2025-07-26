import { baseApi } from '../baseApi'
import { GetFollowersPublications, GetFollowersPublicationsArgs } from './pageHomeService.types'

const pageHomeService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getFollowersPublications: builder.query<GetFollowersPublications, GetFollowersPublicationsArgs>(
      {
        query: params => ({
          params,
          url: `v1/home/publications-followers`,
        }),
      }
    ),
  }),
})

export const { useGetFollowersPublicationsQuery } = pageHomeService

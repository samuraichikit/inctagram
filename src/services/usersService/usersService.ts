import { baseApi } from '../baseApi'
import { GetUsersProfilesArgs, UsersProfiles } from './usersService.types'

const usersService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUsersProfiles: builder.query<UsersProfiles, GetUsersProfilesArgs>({
      query: params => ({
        params,
        url: 'v1/users',
      }),
    }),
  }),
})

export const { useGetUsersProfilesQuery } = usersService

import { baseApi } from '../baseApi'
import { GetProfileResponse } from './profileService.types'

const profileService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query<GetProfileResponse, void>({
      query: () => ({ url: 'v1/users/profile' }),
    }),
  }),
})

export const { useGetProfileQuery } = profileService

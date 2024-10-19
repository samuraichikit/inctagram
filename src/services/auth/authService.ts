import { baseApi } from '../baseApi'
import { MeResponse } from './authService.types'

const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<MeResponse, void>({
        query: () => ({
          url: 'v1/auth/me',
        }),
      }),
    }
  },
})

export const { useMeQuery } = authService

import { baseApi } from '../baseApi'
import { ErrorResponse, SignUpArgs } from './authService.types'

const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      signUp: builder.mutation<ErrorResponse | void, SignUpArgs>({
        query: args => {
          return { body: args, method: 'POST', url: 'v1/auth/registration' }
        },
      }),
    }
  },
})

export const { useSignUpMutation } = authService

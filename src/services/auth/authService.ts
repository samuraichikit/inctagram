import { baseApi } from '../baseApi'
import { ErrorResponse, RegistrationConfirmationArgs, SignUpArgs } from './authService.types'

const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      confirmEmail: builder.mutation<ErrorResponse | void, RegistrationConfirmationArgs>({
        query: body => ({ body, method: 'POST', url: 'v1/auth/registration-confirmation' }),
      }),
      signUp: builder.mutation<ErrorResponse | void, SignUpArgs>({
        query: body => ({ body, method: 'POST', url: 'v1/auth/registration' }),
      }),
    }
  },
})

export const { useConfirmEmailMutation, useSignUpMutation } = authService

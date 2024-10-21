import { baseApi } from '../baseApi'
import {
  ErrorResponse,
  MeResponse,
  RegistrationConfirmationArgs,
  RegistrationEmailResendingArgs,
  SignInArgs,
  SignInResponseArgs,
  SignUpArgs,
} from './authService.types'

const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      confirmEmail: builder.mutation<ErrorResponse | void, RegistrationConfirmationArgs>({
        query: body => ({ body, method: 'POST', url: 'v1/auth/registration-confirmation' }),
      }),
      logout: builder.mutation<void, void>({
        query: () => ({ method: 'POST', url: 'v1/auth/logout' }),
      }),
      me: builder.query<MeResponse, void>({
        query: () => ({
          url: 'v1/auth/me',
        }),
      }),
      resendVerificationLink: builder.mutation<
        ErrorResponse | void,
        RegistrationEmailResendingArgs
      >({
        query: body => ({
          body,
          method: 'POST',
          url: 'v1/auth/registration-email-resending',
        }),
      }),
      signIn: builder.mutation<SignInResponseArgs, SignInArgs>({
        query: body => ({ body, method: 'POST', url: 'v1/auth/login' }),
      }),
      signUp: builder.mutation<ErrorResponse | void, SignUpArgs>({
        query: body => ({ body, method: 'POST', url: 'v1/auth/registration' }),
      }),
    }
  },
})

export const {
  useConfirmEmailMutation,
  useLogoutMutation,
  useMeQuery,
  useResendVerificationLinkMutation,
  useSignInMutation,
  useSignUpMutation,
} = authService

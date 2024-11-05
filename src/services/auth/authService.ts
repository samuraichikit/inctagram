import { baseApi } from '../baseApi'
import {
  ErrorResponse,
  GoogleAuthArgs,
  GoogleAuthResponse,
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
      googleAuth: builder.mutation<GoogleAuthResponse, GoogleAuthArgs>({
        query: body => ({
          body,
          method: 'POST',
          url: 'v1/auth/google/login',
        }),
      }),
      logout: builder.mutation<void, void>({
        invalidatesTags: ['Me'],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          await queryFulfilled
          dispatch(authService.util.invalidateTags(['Me']))
        },
        query: () => ({ method: 'POST', url: 'v1/auth/logout' }),
      }),
      me: builder.query<MeResponse, void>({
        providesTags: ['Me'],
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
        invalidatesTags: ['Me'],
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
  useGoogleAuthMutation,
  useLogoutMutation,
  useMeQuery,
  useResendVerificationLinkMutation,
  useSignInMutation,
  useSignUpMutation,
} = authService

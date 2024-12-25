import { baseApi } from '../baseApi'
import {
  CheckRecoveryCodeArgs,
  CreateNewPasswordArgs,
  ErrorResponse,
  GoogleAuthArgs,
  GoogleAuthResponse,
  MeResponse,
  PasswordRecoveryArgs,
  RegistrationConfirmationArgs,
  RegistrationEmailResendingArgs,
  SignInArgs,
  SignInResponseArgs,
  SignUpArgs,
} from './authService.types'

const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      checkRecoveryCode: builder.mutation<void, CheckRecoveryCodeArgs>({
        query: body => ({
          body,
          method: 'POST',
          url: 'v1/auth/check-recovery-code',
        }),
      }),
      confirmEmail: builder.mutation<ErrorResponse | void, RegistrationConfirmationArgs>({
        query: body => ({ body, method: 'POST', url: 'v1/auth/registration-confirmation' }),
      }),
      createNewPassword: builder.mutation<void, CreateNewPasswordArgs>({
        query: body => ({
          body,
          method: 'POST',
          url: 'v1/auth/new-password',
        }),
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
      passwordRecovery: builder.mutation<void, PasswordRecoveryArgs>({
        query: body => ({
          body,
          method: 'POST',
          url: 'v1/auth/password-recovery',
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
  useCheckRecoveryCodeMutation,
  useConfirmEmailMutation,
  useCreateNewPasswordMutation,
  useGoogleAuthMutation,
  useLogoutMutation,
  useMeQuery,
  usePasswordRecoveryMutation,
  useResendVerificationLinkMutation,
  useSignInMutation,
  useSignUpMutation,
} = authService

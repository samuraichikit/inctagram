import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://inctagram.work/api/',
    credentials: 'include',
    prepareHeaders: headers => {
      const accessToken = localStorage.getItem('accessToken')

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`)
      }

      return headers
    },
  }),
  endpoints: builder => ({
    login: builder.mutation({
      query: args => ({ body: args, method: 'POST', url: 'v1/auth/login' }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ method: 'POST', url: 'v1/auth/logout' }),
    }),
    registrationConfirmation: builder.mutation({
      query: () => ({ method: 'POST', url: 'v1/auth/registration-confirmation' }),
    }),
    signUp: builder.mutation({
      query: args => ({ body: args, method: 'POST', url: 'v1/auth/registration' }),
    }),
  }),
  reducerPath: 'baseApi',
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegistrationConfirmationMutation,
  useSignUpMutation,
} = baseApi

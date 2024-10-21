import { GoogleAuthArgs, GoogleAuthResponse, ResponseGithubAuth } from '@/services/types'
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
    githubAuth: builder.query<ResponseGithubAuth, void>({
      query: () => {
        return { url: 'v1/auth/github/login' }
      },
    }),
    googleAuth: builder.mutation<GoogleAuthResponse, GoogleAuthArgs>({
      query: args => {
        return { body: args, method: 'POST', url: 'v1/auth/google/login' }
      },
    }),
  }),
  reducerPath: 'baseApi',
})

export const { useGithubAuthQuery, useGoogleAuthMutation } = baseApi

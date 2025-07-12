import { AppState } from '@/app/store'
import { Action, PayloadAction } from '@reduxjs/toolkit'
import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { baseQueryWithReauth } from './baseQueryWithReauth'

function isHydrateAction(action: Action): action is PayloadAction<AppState> {
  return action.type === HYDRATE
}

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      const payloadForSlice = action.payload?.[reducerPath]

      console.log(`[HYDRATE] payload for ${reducerPath}:`, payloadForSlice)

      if (payloadForSlice == null || typeof payloadForSlice !== 'object') {
        return undefined
      }

      return payloadForSlice
    }
  },
  reducerPath: 'baseApi',
  tagTypes: ['Me', 'Profile', 'Posts', 'Payment', 'Notifications', 'Comments'],
})

import { baseApi } from '@/services/baseApi'
import {
  getNotificationsParams,
  getNotificationsType,
} from '@/services/notifications/notificationsService.types'

export const notificationsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<getNotificationsType, getNotificationsParams>({
      providesTags: ['Notifications'],
      query: params => ({ params: params, url: `/v1/notifications/` }),
    }),
  }),
})
export const { useGetNotificationsQuery } = notificationsService

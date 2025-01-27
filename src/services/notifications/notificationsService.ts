import { baseApi } from '@/services/baseApi'
import {
  getNotificationsParams,
  getNotificationsType,
  setNotificationReadBody,
} from '@/services/notifications/notificationsService.types'

export const notificationsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<getNotificationsType, getNotificationsParams>({
      providesTags: ['Notifications'],
      query: params => ({ params: params, url: `/v1/notifications/` }),
    }),
    markAsRead: builder.mutation<void, setNotificationReadBody>({
      invalidatesTags: ['Notifications'],
      query: body => ({ body, method: 'PUT', url: `/v1/notifications/mark-as-read` }),
    }),
  }),
})
export const { useGetNotificationsQuery, useMarkAsReadMutation } = notificationsService

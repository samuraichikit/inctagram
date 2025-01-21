import { baseApi } from '@/services/baseApi'
import { getNotificationsType } from '@/services/notifications/notificationsService.types'

export const notificationsService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<getNotificationsType, void>({
      providesTags: ['Notifications'],
      query: () => ({ url: `/v1/notifications/` }),
    }),
  }),
})
export const { useGetNotificationsQuery } = notificationsService

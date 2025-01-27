import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { useGetNotificationsQuery } from '@/services/notifications/notificationsService'
import { NotificationType } from '@/services/notifications/notificationsService.types'
import { useSocket } from '@/services/websockets/socket'
import { getCookie } from 'cookies-next/client'

export const useNotifications = () => {
  const { data: serverNotifications } = useGetNotificationsQuery({
    pageSize: 100,
    sortDirection: 'desc',
  })
  const lastMonthNotifications: NotificationType[] | undefined = useMemo(() => {
    const oneMonthAgo = new Date()

    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

    return serverNotifications?.items.filter(notification => {
      const notificationDate = new Date(notification.createdAt)

      return notificationDate >= oneMonthAgo
    })
  }, [serverNotifications?.items])
  const [notifications, setNotifications] = useState<NotificationType[]>(
    lastMonthNotifications ?? []
  )

  const handleNewNotification = useCallback(
    (notification: NotificationType) => {
      setNotifications(prev => [notification, ...prev])
      toast.info(notification.message)
    },
    [setNotifications]
  )
  const accessToken = getCookie('accessToken') as string
  const socket = useSocket(accessToken)

  useEffect(() => {
    socket?.on('notification', handleNewNotification)
    if (serverNotifications?.items) {
      setNotifications(serverNotifications?.items)
    }
  }, [serverNotifications?.items, socket, handleNewNotification])

  return { notifications }
}

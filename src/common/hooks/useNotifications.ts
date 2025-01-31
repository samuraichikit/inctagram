import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { WS_EVENT_PATH } from '@/common/constants/websocketConstants'
import { useSocket } from '@/common/hooks/useSocket'
import { getLastMonthNotifications } from '@/common/utils/getLastMonthNotifications'
import { useGetNotificationsQuery } from '@/services/notifications/notificationsService'
import { NotificationType } from '@/services/notifications/notificationsService.types'
import { getCookie } from 'cookies-next/client'

export const useNotifications = () => {
  const [pageSize, setPageSize] = useState(10)
  const { data: initialData } = useGetNotificationsQuery({ pageSize: 1 })
  const { data: serverNotifications } = useGetNotificationsQuery({
    pageSize,
  })

  const accessToken = getCookie('accessToken') as string
  const { socket } = useSocket(accessToken)

  useEffect(() => {
    if (initialData?.totalCount) {
      setPageSize(initialData.totalCount)
    }
  }, [initialData?.totalCount])

  const lastMonthNotifications = useMemo(
    () => getLastMonthNotifications(serverNotifications?.items),
    [serverNotifications?.items]
  )
  const [notifications, setNotifications] = useState<NotificationType[]>(
    lastMonthNotifications ?? []
  )

  useEffect(() => {
    const handleNewNotification = (notification: NotificationType) => {
      toast.info(notification.message)
    }

    socket?.on(WS_EVENT_PATH.NOTIFICATION, handleNewNotification)
  }, [socket])
  useEffect(() => {
    if (serverNotifications?.items) {
      setNotifications(serverNotifications?.items)
    }
  }, [serverNotifications?.items])

  return { notifications }
}

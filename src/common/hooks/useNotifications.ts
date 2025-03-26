import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { WS_EVENT_PATH } from '@/common/constants/websocketConstants'
import { getLastMonthNotifications } from '@/common/utils/getLastMonthNotifications'
import { useGetNotificationsQuery } from '@/services/notifications/notificationsService'
import { NotificationType } from '@/services/notifications/notificationsService.types'
import { socketApi } from '@/services/socket/socketApi'

export const useNotifications = () => {
  const [pageSize, setPageSize] = useState(10)
  const { data: initialData } = useGetNotificationsQuery({ pageSize: 1 })
  const { data: serverNotifications } = useGetNotificationsQuery({
    pageSize,
  })

  const lastMonthNotifications = useMemo(
    () => getLastMonthNotifications(serverNotifications?.items),
    [serverNotifications?.items]
  )
  const [notifications, setNotifications] = useState<NotificationType[]>(
    lastMonthNotifications ?? []
  )

  useEffect(() => {
    if (initialData?.totalCount) {
      setPageSize(initialData.totalCount)
    }
    const handleNewNotification = (notification: NotificationType) => {
      toast.info(notification.message)
    }

    socketApi?.on(WS_EVENT_PATH.NOTIFICATIONS, handleNewNotification)

    if (serverNotifications?.items) {
      setNotifications(serverNotifications?.items)
    }

    return () => {
      socketApi?.off(WS_EVENT_PATH.NOTIFICATIONS, handleNewNotification)
    }
  }, [socketApi, serverNotifications, initialData])

  return { notifications }
}

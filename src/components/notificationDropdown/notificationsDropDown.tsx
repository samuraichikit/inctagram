import { useCallback, useEffect, useState } from 'react'

import { BellTrigger } from '@/components/notificationDropdown/bellTrigger/bellTrigger'
import { NotificationItem } from '@/components/notificationDropdown/notificationItems/notificationItem'
import { Dropdown } from '@/components/ui/dropdown'
import { Typography } from '@/components/ui/typography'
import { useGetNotificationsQuery } from '@/services/notifications/notificationsService'
import { NotificationType } from '@/services/notifications/notificationsService.types'
import { connectWebsockets } from '@/services/websockets/connectWebsockets'

type Props = {}
export const NotificationsDropDown = ({}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: serverNotifications } = useGetNotificationsQuery({})
  const [notifications, setNotifications] = useState<NotificationType[]>([])

  const handleNewNotification = useCallback(
    (newNotification: NotificationType) => {
      setNotifications(prev => [newNotification, ...prev])
    },
    [setNotifications]
  )

  useEffect(() => {
    const ws = connectWebsockets()

    ws.on('notification', handleNewNotification)
    if (serverNotifications) {
      setNotifications(serverNotifications.items)
    }

    return () => {
      ws.off('notification', handleNewNotification)
      ws.close()
    }
  }, [serverNotifications, handleNewNotification])

  return (
    <Dropdown
      align={'end'}
      onOpenChange={setIsOpen}
      open={isOpen}
      title={<Typography variant={'bold_text_14'}>Уведомления</Typography>}
      trigger={<BellTrigger isOpen={isOpen} notificationsCount={notifications?.length} />}
    >
      {notifications?.map(notification => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </Dropdown>
  )
}

import { useState } from 'react'

import { BellTrigger } from '@/components/notificationDropdown/bellTrigger/bellTrigger'
import { NotificationItem } from '@/components/notificationDropdown/notificationItems/notificationItem'
import { Dropdown } from '@/components/ui/dropdown'
import { Typography } from '@/components/ui/typography'
import { useMarkAsReadMutation } from '@/services/notifications/notificationsService'
import { NotificationType } from '@/services/notifications/notificationsService.types'

type Props = {
  notifications: NotificationType[]
}
export const NotificationsDropDown = ({ notifications }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [markAsRead] = useMarkAsReadMutation()
  const handleDropdownClose = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      const unreadIds = notifications.filter(n => !n.isRead).map(n => n.id)

      if (unreadIds.length) {
        markAsRead({ ids: unreadIds })
      }
    }
  }

  return (
    <Dropdown
      align={'end'}
      onOpenChange={handleDropdownClose}
      open={isOpen}
      title={<Typography variant={'bold_text_14'}>Уведомления</Typography>}
      trigger={<BellTrigger isOpen={isOpen} notifications={notifications} />}
    >
      {notifications?.map(notification => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </Dropdown>
  )
}

import { useState } from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { BellTrigger } from '@/components/notificationDropdown/bellTrigger/bellTrigger'
import { NotificationItem } from '@/components/notificationDropdown/notificationItems/notificationItem'
import { Dropdown } from '@/components/ui/dropdown'
import { useMarkAsReadMutation } from '@/services/notifications/notificationsService'
import { NotificationType } from '@/services/notifications/notificationsService.types'
import { Typography } from '@samuraichikit/inc-ui-kit'

type Props = {
  notifications: NotificationType[]
}
export const NotificationsDropDown = ({ notifications }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [markAsRead] = useMarkAsReadMutation()
  const { t } = useTranslation()
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
      title={<Typography variant={'bold_text_14'}>{t.notifications.notificationsTitle}</Typography>}
      trigger={<BellTrigger isOpen={isOpen} notifications={notifications} />}
    >
      {notifications?.map(notification => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </Dropdown>
  )
}

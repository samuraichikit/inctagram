import { useState } from 'react'

import { BellTrigger } from '@/components/notificationDropdown/bellTrigger/bellTrigger'
import { NotificationItem } from '@/components/notificationDropdown/notificationItems/notificationItem'
import { Dropdown } from '@/components/ui/dropdown'
import { Typography } from '@/components/ui/typography'
import { NotificationType } from '@/services/notifications/notificationsService.types'

type Props = {
  notifications: NotificationType[]
}
export const NotificationsDropDown = ({ notifications }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

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

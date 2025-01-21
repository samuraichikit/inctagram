import { useState } from 'react'

import { BellTrigger } from '@/components/notificationDropdown/bellTrigger/bellTrigger'
import { NotificationItem } from '@/components/notificationDropdown/notificationItems/notificationItem'
import { Dropdown } from '@/components/ui/dropdown'
import { Typography } from '@/components/ui/typography'
import { useGetNotificationsQuery } from '@/services/notifications/notificationsService'

type Props = {}
export const NotificationsDropDown = ({}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { data } = useGetNotificationsQuery()
  const notifications = data?.items

  return (
    <Dropdown
      align={'end'}
      onOpenChange={setIsOpen}
      open={isOpen}
      title={<Typography variant={'bold_text_14'}>Уведомления</Typography>}
      trigger={<BellTrigger isOpen={isOpen} notificationsCount={data?.notReadCount} />}
    >
      {notifications?.map(notification => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </Dropdown>
  )
}

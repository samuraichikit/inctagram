import { DropdownItem } from '@/components/ui/dropdown/DropdownItems'
import { Typography } from '@/components/ui/typography'
import { Notification } from '@/services/notifications/notificationsService.types'
import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'

import s from './notificationItem.module.scss'
type Props = {
  notification: Notification
}
export const NotificationItem = ({ notification }: Props) => {
  function formatRelativeTime(isoDate: string) {
    return formatDistanceToNow(new Date(isoDate), { addSuffix: true, locale: ru })
  }

  return (
    <DropdownItem>
      <div className={s.itemContainer}>
        <div className={s.labelContainer}>
          <Typography variant={'bold_text_14'}>Новое уведомление!</Typography>
          {!notification.isRead && (
            <Typography className={s.newMessage} variant={'small_text'}>
              Новое
            </Typography>
          )}
        </div>

        <div>{notification.message}</div>
        <div>{formatRelativeTime(notification.createdAt)}</div>
      </div>
    </DropdownItem>
  )
}

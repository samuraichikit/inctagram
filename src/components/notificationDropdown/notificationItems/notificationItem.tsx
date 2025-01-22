import { DropdownItem } from '@/components/ui/dropdown/DropdownItems'
import { TimeAgoDisplay } from '@/components/ui/timeAgoDisplay'
import { Typography } from '@/components/ui/typography'
import { NotificationType } from '@/services/notifications/notificationsService.types'

import s from './notificationItem.module.scss'

type Props = {
  notification: NotificationType
}
export const NotificationItem = ({ notification }: Props) => {
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
        <div>
          <TimeAgoDisplay date={notification.createdAt} />
        </div>
      </div>
    </DropdownItem>
  )
}

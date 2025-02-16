import { useTranslation } from '@/common/hooks/useTranslation'
import { NotificationMessage } from '@/components/notificationDropdown/notificationItems/notificationMessage/NotificationMessage'
import { DropdownItem } from '@/components/ui/dropdown/DropdownItems'
import { TimeAgoDisplay } from '@/components/ui/timeAgoDisplay'
import { Typography } from '@/components/ui/typography'
import { NotificationType } from '@/services/notifications/notificationsService.types'

import s from './notificationItem.module.scss'

type Props = {
  notification: NotificationType
}
export const NotificationItem = ({ notification }: Props) => {
  const { t } = useTranslation()

  return (
    <DropdownItem>
      <div className={s.itemContainer}>
        <div className={s.labelContainer}>
          <Typography variant={'bold_text_14'}>{t.notifications.newNotification}</Typography>
          {!notification.isRead && (
            <Typography className={s.newMessage} variant={'small_text'}>
              {t.notifications.new}
            </Typography>
          )}
        </div>
        <NotificationMessage message={notification.message} />
        <div>
          <div id={'google_translate_element'}></div>
          <TimeAgoDisplay date={notification.createdAt} />
        </div>
      </div>
    </DropdownItem>
  )
}

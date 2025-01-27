import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { BellChecked } from '@/assets/icons/BellChecked'
import { BellOutline } from '@/assets/icons/BellOutline'
import { NotificationType } from '@/services/notifications/notificationsService.types'

import s from '@/components/notificationDropdown/bellTrigger/bellTrigger.module.scss'

type Props = {
  isOpen: boolean
  notifications?: NotificationType[]
} & ComponentPropsWithoutRef<'div'>
export const BellTrigger = forwardRef<HTMLDivElement, Props>(
  ({ isOpen, notifications, ...rest }: Props, ref) => {
    const unreadNotificationsCount = notifications?.filter(notification => {
      return !notification.isRead
    }).length

    return (
      <div className={s.triggerButton} ref={ref} {...rest}>
        {unreadNotificationsCount !== 0 && (
          <div className={s.messagesCount}>
            <div>{unreadNotificationsCount}</div>
          </div>
        )}
        {isOpen ? <BellChecked /> : <BellOutline />}
      </div>
    )
  }
)

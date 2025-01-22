import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { BellChecked } from '@/assets/icons/BellChecked'
import { BellOutline } from '@/assets/icons/BellOutline'

import s from '@/components/notificationDropdown/bellTrigger/bellTrigger.module.scss'
type Props = {
  isOpen: boolean
  notificationsCount?: number
} & ComponentPropsWithoutRef<'div'>
export const BellTrigger = forwardRef<HTMLDivElement, Props>(
  ({ isOpen, notificationsCount, ...rest }: Props, ref) => {
    return (
      <div className={s.triggerButton} ref={ref} {...rest}>
        {notificationsCount && (
          <div className={s.messagesCount}>
            <div>{notificationsCount}</div>
          </div>
        )}
        {isOpen ? <BellChecked /> : <BellOutline />}
      </div>
    )
  }
)

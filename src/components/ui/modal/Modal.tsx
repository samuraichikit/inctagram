import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'

import s from './modal.module.scss'

type Props = {
  children?: ReactNode
  className?: string
  title: string
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof Dialog.Root>

export const Modal = ({ children, className, title, trigger, ...props }: Props) => {
  return (
    <Dialog.Root {...props}>
      {trigger && <Dialog.Trigger>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className={s.DialogOverlay} />
        <Dialog.Content className={clsx(s.DialogContent, className ?? '')}>
          <div className={s.header}>
            <Dialog.Title className={s.DialogTitle}>{title}</Dialog.Title>
            <Dialog.Close aria-label={'Close'}>
              <Cross2Icon className={s.IconButton} />
            </Dialog.Close>
          </div>
          <div className={s.contentContainer}>
            <div className={s.content}>{children}</div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

import {FC, ReactNode} from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import {Cross2Icon} from '@radix-ui/react-icons'
import {clsx} from 'clsx'

import s from './modal.module.scss'

type Props = {
    children?: ReactNode
    className?: string
    onClose?: () => void
    open?: boolean
    title: string
}

export const Modal: FC<Props> = ({children, className, onClose, open, title}) => {
    return (
        <Dialog.Root open={open}>
            <Dialog.Portal>
                <Dialog.Overlay className={s.DialogOverlay}/>
                <Dialog.Content className={clsx(s.DialogContent, className ?? '')}>
                    <div className={s.header}>
                        <Dialog.Title className={s.DialogTitle}>{title}</Dialog.Title>
                        <Dialog.Close aria-label={'Close'} onClick={onClose}>
                            <Cross2Icon className={s.IconButton}/>
                        </Dialog.Close>
                    </div>
                    <div className={s.content}>{children}</div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

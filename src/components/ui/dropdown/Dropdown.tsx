import {
  CSSProperties,
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
  forwardRef,
  useState,
} from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropdown.module.scss'

export type DropdownProps = {
  align?: 'center' | 'end' | 'start'
  children?: ReactNode
  className?: string
  style?: CSSProperties
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenu.Root>
export const Dropdown = forwardRef<ElementRef<typeof DropdownMenu.Trigger>, DropdownProps>(
  ({ align = 'start', children, className, defaultOpen, style, trigger, ...rest }, ref) => {
    const [open, setOpen] = useState(false)
    const classNames = {
      arrow: clsx(s.Arrow),
      content: clsx(s.Content, className),
      trigger: clsx(s.Trigger),
    }

    return (
      <DropdownMenu.Root defaultOpen={defaultOpen} onOpenChange={setOpen} open={open} {...rest}>
        <DropdownMenu.Trigger asChild className={classNames.trigger} ref={ref}>
          {trigger}
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align={align}
            className={classNames.content}
            sideOffset={5}
            style={style}
          >
            <DropdownMenu.Arrow className={classNames.arrow} />
            {children}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  }
)

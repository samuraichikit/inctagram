import { CSSProperties, ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { ScrollArea } from '@samuraichikit/inc-ui-kit'
import clsx from 'clsx'

import s from './dropdown.module.scss'

export type DropdownProps = {
  align?: 'center' | 'end' | 'start'
  children?: ReactNode
  className?: string
  open?: boolean
  style?: CSSProperties
  title?: ReactNode
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenu.Root>
export const Dropdown = forwardRef<ElementRef<typeof DropdownMenu.Trigger>, DropdownProps>(
  (
    {
      align = 'start',
      children,
      className,
      defaultOpen,
      onOpenChange,
      open,
      style,
      title,
      trigger,
      ...rest
    },
    ref
  ) => {
    const classNames = {
      arrow: clsx(s.Arrow),
      content: clsx(s.Content, className),
      scrollArea: clsx(s.ScrollArea),
      trigger: clsx(s.Trigger),
    }

    return (
      <DropdownMenu.Root
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        open={open}
        {...rest}
      >
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
            {title && <DropdownMenuLabel className={s.Label}>{title}</DropdownMenuLabel>}
            <div className={s.ScrollArea}>
              <ScrollArea className={clsx(s.ScrollArea)} orientation={'vertical'}>
                {children}
              </ScrollArea>
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  }
)

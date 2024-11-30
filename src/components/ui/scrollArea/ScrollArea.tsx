import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import clsx from 'clsx'

import s from './scrollArea.module.scss'

import { ScrollBar } from './scrollBar'

const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ children, className, ...rest }, ref) => {
  const classNames = {
    root: clsx(s.root, className),
    viewport: s.viewport,
  }

  return (
    <ScrollAreaPrimitive.Root ref={ref} {...rest} className={classNames.root}>
      <ScrollAreaPrimitive.Viewport className={classNames.viewport}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
})

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

export { ScrollArea }

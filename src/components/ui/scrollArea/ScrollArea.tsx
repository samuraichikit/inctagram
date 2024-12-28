import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import clsx from 'clsx'

import s from './scrollArea.module.scss'

import { ScrollBar } from './scrollBar'

type ScrollAreaProps = {
  orientation?: 'horizontal' | 'vertical'
} & ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>

const ScrollArea = forwardRef<ElementRef<typeof ScrollAreaPrimitive.Root>, ScrollAreaProps>(
  ({ children, className, orientation = 'vertical', ...rest }, ref) => {
    const classNames = {
      root: clsx(s.root, className),
      viewport: s.viewport,
    }

    return (
      <ScrollAreaPrimitive.Root ref={ref} {...rest} className={classNames.root}>
        <ScrollAreaPrimitive.Viewport className={classNames.viewport}>
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar orientation={orientation} />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    )
  }
)

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

export { ScrollArea }

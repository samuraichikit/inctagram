import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import clsx from 'clsx'

import s from './scrollBar.module.scss'

type ScrollBarProps = {
  orientation?: 'horizontal' | 'vertical'
} & ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>

const ScrollBar = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ className, orientation = 'vertical', ...rest }, ref) => {
  const classNames = {
    scrollbar: clsx(s.scrollBar, className),
    thumb: s.thumb,
  }

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      orientation={orientation}
      ref={ref}
      {...rest}
      className={classNames.scrollbar}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className={classNames.thumb} />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
})

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollBar }

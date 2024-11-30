import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

import { ScrollBar } from './scrollBar'

const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ children, className, ...rest }, ref) => (
  <ScrollAreaPrimitive.Root ref={ref} {...rest}>
    <ScrollAreaPrimitive.Viewport>{children}</ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

export { ScrollArea }

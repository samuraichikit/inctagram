'use client'
import React from 'react'

import * as PopoverPrimitive from '@radix-ui/react-popover'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ align = 'center', className, sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      className={className}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </PopoverPrimitive.Portal>
))

PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverContent, PopoverTrigger }

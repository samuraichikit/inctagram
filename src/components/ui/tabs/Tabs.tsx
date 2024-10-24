import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import clsx from 'clsx'

import s from './tabs.module.scss'

export const Tabs = forwardRef<
  ElementRef<typeof TabsPrimitive.Root>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...rest }, ref) => {
  const classNames = {
    tabs: clsx(s.tabs, className),
  }

  return <TabsPrimitive.Root className={classNames.tabs} ref={ref} {...rest} />
})

export const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ ...rest }, ref) => {
  return <TabsPrimitive.List ref={ref} {...rest} />
})

export const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...rest }, ref) => {
  const classNames = {
    trigger: clsx(s.trigger, className),
  }

  return <TabsPrimitive.Trigger className={classNames.trigger} ref={ref} {...rest} />
})

export const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ ...rest }, ref) => {
  return <TabsPrimitive.Content ref={ref} {...rest} />
})

import { ComponentProps } from 'react'

import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'

import s from './typography.module.scss'

type Props = {
  asChild?: boolean
  className?: string
  variant?:
    | 'bold_text_14'
    | 'bold_text_16'
    | 'error'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'large'
    | 'medium_text_14'
    | 'regular_link'
    | 'regular_text_14'
    | 'regular_text_16'
    | 'semi-bold_small_text'
    | 'small_link'
    | 'small_text'
} & ComponentProps<'p'>
export const Typography = ({
  asChild = false,
  className,
  variant = 'regular_text_14',
  ...props
}: Props) => {
  const classNames = clsx(s[variant], className)
  const Comp = asChild ? Slot : 'p'

  return <Comp {...props} className={classNames} />
}

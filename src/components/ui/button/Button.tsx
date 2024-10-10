import { ComponentProps } from 'react'

import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'

import s from './button.module.scss'

type Props = {
  asChild?: boolean
  fullwidth?: boolean
  variant?: 'outlined' | 'primary' | 'secondary' | 'text'
} & ComponentProps<'button'>

export const Button = ({ asChild, className, fullwidth, variant = 'primary', ...props }: Props) => {
  const classNames = {
    root: clsx(s.button, s[variant], fullwidth && s.fullwidth, className),
  }
  const Component = asChild ? Slot : 'button'

  return <Component className={classNames.root} {...props} />
}

import { ComponentProps } from 'react'

import clsx from 'clsx'

import s from './button.module.scss'

type Props = {
  variant?: 'outlined' | 'primary' | 'secondary' | 'text'
} & ComponentProps<'button'>

export const Button = ({ className, variant = 'primary', ...props }: Props) => {
  // eslint-disable-next-line react/button-has-type
  return <button className={clsx(s.button, s[variant], className)} {...props} />
}

import { ComponentProps } from 'react'
import s from './button.module.scss'
import clsx from 'clsx'

type Props = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text'
}

export const Button = ({ className, variant = 'primary', ...props }: Props) => {
  return <button className={clsx(s.button, s[variant], className)} {...props} />
}

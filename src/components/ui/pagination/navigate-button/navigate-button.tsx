import { ComponentProps } from 'react'

import { clsx } from 'clsx'

import s from './navigate-button.module.scss'

type Props = {
  active: boolean
} & ComponentProps<'button'>

export const NavigateButton = ({ active, className, ...rest }: Props) => {
  const classes = clsx(s.button, active && s.active, className)

  return <button type={'button'} {...rest} className={classes} />
}

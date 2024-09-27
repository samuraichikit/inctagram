import { ComponentProps } from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

type Props = ComponentProps<'div'>

export const Card = ({ className, ...props }: Props) => {
  return <div className={clsx(s.root, className)} {...props}></div>
}

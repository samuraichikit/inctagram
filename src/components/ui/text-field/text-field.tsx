import { ComponentProps } from 'react'

import clsx from 'clsx'

import s from './text-field.module.scss'

type Props = ComponentProps<'input'>

export const TextField = ({ className, ...props }: Props) => {
  return (
    <>
      <input className={clsx(s.root, className)} {...props} />
    </>
  )
}

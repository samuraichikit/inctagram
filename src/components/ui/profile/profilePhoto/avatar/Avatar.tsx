import { clsx } from 'clsx'
import Image from 'next/image'

import s from './Avatar.module.scss'

type Props = {
  className?: string
  size: number
  src?: null | string
}
export const Avatar = ({ className, size, src }: Props) => {
  const classNames = {
    image: s.image,
    root: clsx(s.root, className),
    userName: s.userName,
  }

  return (
    <div className={classNames.root} style={{ height: `${size}px`, width: `${size}px` }}>
      {src && (
        <Image alt={'Avatar'} className={classNames.image} height={size} src={src} width={size} />
      )}
    </div>
  )
}

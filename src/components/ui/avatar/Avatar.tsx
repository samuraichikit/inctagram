import clsx from 'clsx'
import Image from 'next/image'

import s from './avatar.module.scss'

import defaultAvatar from './../../../../public/defaultAvatar.png'

type Props = {
  className?: string
  height: number
  src: string
  width: number
}

export const Avatar = ({ className, height, src, width }: Props) => {
  const classNames = {
    avatar: clsx(s.avatar, className),
  }

  return (
    <Image
      alt={'user avatar'}
      className={classNames.avatar}
      height={height}
      src={src ?? defaultAvatar}
      width={width}
    />
  )
}

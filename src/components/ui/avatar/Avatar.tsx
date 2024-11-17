import Image from 'next/image'

import s from './avatar.module.scss'

import defaultAvatar from './../../../../public/defaultAvatar.png'

type Props = {
  height: number
  src: string
  width: number
}

export const Avatar = ({ height, src, width }: Props) => {
  const classNames = {
    avatar: s.avatar,
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

import Image from 'next/image'

import s from './avatar.module.scss'

import defaultAvatar from './../../../../public/defaultAvatar.png'

type Props = {
  src: string
}

export const Avatar = ({ src }: Props) => {
  const classNames = {
    avatar: s.avatar,
  }

  return (
    <Image
      alt={'user avatar'}
      className={classNames.avatar}
      height={36}
      src={src ?? defaultAvatar}
      width={36}
    />
  )
}

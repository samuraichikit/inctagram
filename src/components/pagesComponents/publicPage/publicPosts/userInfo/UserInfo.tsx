import { Typography } from '@/components/ui/typography'
import Image from 'next/image'

import s from './userInfo.module.scss'

type Props = {
  src: string
  userName: string
}

export const UserInfo = ({ src, userName }: Props) => {
  const classNames = {
    avatar: s.avatar,
    container: s.container,
  }

  return (
    <div className={classNames.container}>
      <Image alt={'user avatar'} className={classNames.avatar} height={36} src={src} width={36} />
      <Typography variant={'h3'}>{userName}</Typography>
    </div>
  )
}

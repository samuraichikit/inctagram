import { Avatar } from '@/components/ui/avatar'
import { Typography } from '@/components/ui/typography'

import s from './userInfo.module.scss'

type Props = {
  src: string
  userName: string
}

export const UserInfo = ({ src, userName }: Props) => {
  const classNames = {
    container: s.container,
  }

  return (
    <div className={classNames.container}>
      <Avatar height={36} src={src} width={36} />
      <Typography variant={'h3'}>{userName}</Typography>
    </div>
  )
}

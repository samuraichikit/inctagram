import { ROUTES } from '@/common/constants'
import { Avatar } from '@/components/ui/avatar'
import { DefaultAvatar, Typography } from '@samuraichikit/inc-ui-kit'
import Link from 'next/link'

import s from './userSearchItem.module.scss'

type Props = {
  firsName: string
  id: number
  lastName: string
  src?: string
  userName: string
}

export const UserSearchItem = ({ firsName, id, lastName, src, userName }: Props) => {
  const classNames = {
    container: s.container,
    defaultAvatar: s.defaultAvatar,
    userFullname: s.userFullname,
    userName: s.userName,
  }

  return (
    <Link className={classNames.container} href={ROUTES.PROFILE.USER_PROFILE(id)}>
      {src ? (
        <Avatar height={48} src={src} width={48} />
      ) : (
        <DefaultAvatar className={classNames.defaultAvatar} />
      )}
      <div>
        <Typography className={classNames.userName} variant={'bold_text_14'}>
          {userName}
        </Typography>
        <Typography className={classNames.userFullname}>
          {firsName} {lastName}
        </Typography>
      </div>
    </Link>
  )
}

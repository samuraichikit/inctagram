import { Avatar } from '@/components/ui/avatar'
import { DefaultAvatar, Typography } from '@samuraichikit/inc-ui-kit'

import s from './postDescription.module.scss'

type Props = {
  avatarSrc: string
  description: string
  userName: string
}

export const PostDescription = ({ avatarSrc, description, userName }: Props) => {
  const classNames = {
    container: s.container,
    defaultAvatar: s.defaultAvatar,
    userName: s.userName,
  }

  return (
    <div className={classNames.container}>
      {avatarSrc ? (
        <Avatar height={36} src={avatarSrc} width={36} />
      ) : (
        <DefaultAvatar className={classNames.defaultAvatar} />
      )}
      <div>
        <Typography asChild className={classNames.userName} variant={'bold_text_14'}>
          <span>{userName}</span>
        </Typography>
        <Typography asChild>
          <span>{description}</span>
        </Typography>
      </div>
    </div>
  )
}

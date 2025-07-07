import { Avatar } from '@/components/ui/avatar'
import { DefaultAvatar } from '@samuraichikit/inc-ui-kit'

import s from './profileAvatar.module.scss'

type Props = {
  avatarSrc?: string
}

export const ProfileAvatar = ({ avatarSrc }: Props) => {
  const classNames = {
    defaultAvatar: s.defaultAvatar,
  }

  return (
    <>
      {avatarSrc ? (
        <Avatar height={192} src={avatarSrc} width={192} />
      ) : (
        <DefaultAvatar className={classNames.defaultAvatar} size={36} />
      )}
    </>
  )
}

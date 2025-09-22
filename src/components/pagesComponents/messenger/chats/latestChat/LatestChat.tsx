import React from 'react'

import { ROUTES } from '@/common/constants'
import { formatTime } from '@/common/utils'
import { Avatar } from '@/components/ui/avatar'
import Link from 'next/link'

import s from './LatestChat.module.scss'

type Props = {
  createdAt: string
  id: number
  messageText: string
  src: string
  userName: string
}

export const LatestChat = ({ createdAt, id, messageText, src, userName }: Props) => {
  return (
    <Link className={s.latestChatWrapper} href={`${ROUTES.MESSENGER}/${id}`}>
      <Avatar height={48} src={src} width={48} />
      <div className={s.latestChatInfo}>
        <div className={s.latestChatData}>
          <div>{userName}</div>
          <div className={s.latestChatTime}>{formatTime(createdAt)}</div>
        </div>
        <div className={s.latestChatText}>{messageText}</div>
      </div>
    </Link>
  )
}

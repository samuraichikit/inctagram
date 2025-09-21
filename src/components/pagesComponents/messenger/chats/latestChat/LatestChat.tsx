import React from 'react'

import { formatTime } from '@/common/utils'
import { Avatar } from '@/components/ui/avatar'

import s from './LatestChat.module.scss'

type Props = {
  createdAt: string
  messageText: string
  src: string
  userName: string
}

const LatestChat = ({ createdAt, messageText, src, userName }: Props) => {
  return (
    <div className={s.latestChatWrapper}>
      <Avatar height={48} src={src} width={48} />
      <div className={s.latestChatInfo}>
        <div className={s.latestChatData}>
          <div>{userName}</div>
          <div className={s.latestChatTime}>{formatTime(createdAt)}</div>
        </div>
        <div className={s.latestChatText}>{messageText}</div>
      </div>
    </div>
  )
}

export default LatestChat

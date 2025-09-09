import React from 'react'

import { Avatar } from '@/components/ui/avatar'

import s from './LatestChat.module.scss'

const LatestChat = () => {
  return (
    <div className={s.latestChatWrapper}>
      <Avatar height={48} width={48} />
      <div className={s.latestChatInfo}>
        <div className={s.latestChatData}>
          <div>UserName</div>
          <div className={s.latestChatTime}>17:33</div>
        </div>
        <div className={s.latestChatText}>Hello World!</div>
      </div>
    </div>
  )
}

export default LatestChat

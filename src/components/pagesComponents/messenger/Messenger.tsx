import React from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import OpenChat from '@/components/pagesComponents/messenger/chat/OpenChat'
import Chats from '@/components/pagesComponents/messenger/chats/Chats'
import { Avatar } from '@/components/ui/avatar'
import { Typography } from '@samuraichikit/inc-ui-kit'

import s from './Messenger.module.scss'

const Messenger = () => {
  const { t } = useTranslation()

  return (
    <div className={s.messengerWrapper}>
      <Typography className={s.messengerTitle} variant={'h1'}>
        {t.messenger.title}
      </Typography>
      <div className={s.messenger}>
        <Chats />
        <div className={s.messengerContent}>
          <div className={s.headerWrapper}>
            <div className={s.userInfo}>
              <Avatar height={48} width={48} />
              <Typography>userName</Typography>
            </div>
          </div>
          <OpenChat />
        </div>
      </div>
    </div>
  )
}

export default Messenger

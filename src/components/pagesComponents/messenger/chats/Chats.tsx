import React from 'react'

import { useTranslation } from '@/common/hooks/useTranslation'
import { useGetMessagesQuery } from '@/services/messenger'
import { TextField } from '@samuraichikit/inc-ui-kit'

import s from './Chats.module.scss'

import { LatestChat } from './latestChat'

export const Chats = () => {
  const { t } = useTranslation()
  const { data: latestMessagesData } = useGetMessagesQuery({})

  return (
    <div className={s.latestChatsWrapper}>
      <div className={s.searchInput}>
        <TextField placeholder={t.messenger.inputSearch} />
      </div>
      <div className={s.latestChats}>
        {latestMessagesData?.items.map(latestMessageData => {
          return (
            <LatestChat
              createdAt={latestMessageData.createdAt}
              key={latestMessageData.id}
              messageText={latestMessageData.messageText}
              src={latestMessageData.avatars[0]?.url}
              userName={latestMessageData.userName}
            />
          )
        })}
      </div>
    </div>
  )
}

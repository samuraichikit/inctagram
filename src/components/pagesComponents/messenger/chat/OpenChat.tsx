import React from 'react'

import { MicrophoneIcon } from '@/assets/icons/MicrophoneIcon'
import { PictureIcon } from '@/assets/icons/PictureIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { formatTime } from '@/common/utils'
import { useGetMessagesByIdQuery } from '@/services/messenger'
import { TextField } from '@samuraichikit/inc-ui-kit'
import { useRouter } from 'next/router'

import s from './OpenChat.module.scss'

export const OpenChat = () => {
  const { t } = useTranslation()
  const { query } = useRouter()
  const { id } = query
  const dialoguePartnerId = Number(id) ?? ''

  const { data } = useGetMessagesByIdQuery({ dialoguePartnerId })

  return (
    <div className={s.chatWrapper}>
      {id ? (
        <>
          {data?.items.map(messageData => {
            return (
              <div key={messageData.id}>
                <div>{messageData.messageText}</div>
                <span>{formatTime(messageData.createdAt)}</span>
              </div>
            )
          })}
        </>
      ) : (
        <div className={s.chat}>
          <div className={s.emptyChat}>{t.messenger.openChat}</div>
        </div>
      )}
      <div className={s.inputWrapper}>
        <TextField placeholder={t.messenger.placeholder} />
        <div className={s.inputActions}>
          <div className={s.inputIcons}>
            <MicrophoneIcon />
            <PictureIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

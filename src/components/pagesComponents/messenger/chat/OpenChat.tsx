import React, { ChangeEvent, useState } from 'react'

import { MicrophoneIcon } from '@/assets/icons/MicrophoneIcon'
import { PictureIcon } from '@/assets/icons/PictureIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { formatTime } from '@/common/utils'
import { useGetMessagesByIdQuery, useSendMessageMutation } from '@/services/messenger'
import { Button, TextField } from '@samuraichikit/inc-ui-kit'
import { useRouter } from 'next/router'

import s from './OpenChat.module.scss'

export const OpenChat = () => {
  const [message, setMessage] = useState('')
  const { t } = useTranslation()
  const { query } = useRouter()
  const { id } = query
  const dialoguePartnerId = Number(id) ?? ''
  const isTextMessage = message.trim().length > 0
  const isSkip = !dialoguePartnerId

  const { data } = useGetMessagesByIdQuery({ dialoguePartnerId }, { skip: isSkip })
  const [sendMessage] = useSendMessageMutation()

  const changeMessageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const messageText = e.currentTarget.value

    setMessage(messageText)
  }
  const sendMessageHandler = () => {
    if (!message.trim()) {
      return
    }

    sendMessage({ message, receiverId: dialoguePartnerId })
    setMessage('')
  }

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
        <TextField
          onChange={changeMessageHandler}
          placeholder={t.messenger.placeholder}
          value={message}
        />
        <div className={s.inputActions}>
          {isTextMessage ? (
            <Button onClick={sendMessageHandler} variant={'outlined'}>
              Send message
            </Button>
          ) : (
            <div className={s.inputIcons}>
              <MicrophoneIcon />
              <PictureIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

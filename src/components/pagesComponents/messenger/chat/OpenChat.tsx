import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import { MicrophoneIcon } from '@/assets/icons/MicrophoneIcon'
import { PictureIcon } from '@/assets/icons/PictureIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { formatTime } from '@/common/utils'
import { Avatar } from '@/components/ui/avatar'
import { useGetMessagesByIdQuery, useSendMessageMutation } from '@/services/messenger'
import { Button, TextField, Typography } from '@samuraichikit/inc-ui-kit'

import s from './OpenChat.module.scss'

type Props = {
  dialoguePartnerId: number
  partnerAvatar?: string
}

export const OpenChat = ({ dialoguePartnerId, partnerAvatar }: Props) => {
  const [message, setMessage] = useState('')
  const { t } = useTranslation()

  const isTextMessage = message.trim().length > 0
  const isSkip = !dialoguePartnerId

  const { data } = useGetMessagesByIdQuery({ dialoguePartnerId }, { skip: isSkip })

  const [sendMessage] = useSendMessageMutation()
  const chatRef = useRef<HTMLDivElement | null>(null)
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

  useEffect(() => {
    if (chatRef.current && data?.items?.length) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [data?.items])

  return (
    <div className={s.chatWrapper}>
      {dialoguePartnerId ? (
        <ul className={s.messagesWrapper}>
          {data?.items.map(messageData => {
            const isMe = messageData.ownerId !== dialoguePartnerId

            return (
              <li
                className={`${s.message} ${isMe ? s.myMessage : s.theirMessage}`}
                key={messageData.id}
              >
                {!isMe && <Avatar height={32} src={partnerAvatar} width={32} />}
                <div className={s.bubble}>
                  <Typography variant={'regular_text_14'}>{messageData.messageText}</Typography>
                  <Typography className={s.time} variant={'small_text'}>
                    {formatTime(messageData.createdAt)}
                  </Typography>
                </div>
              </li>
            )
          })}
        </ul>
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
            <Button onClick={sendMessageHandler} variant={'text'}>
              {t.messenger.sendMessage}
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

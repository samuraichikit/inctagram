import React, { ChangeEvent, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { MicrophoneIcon } from '@/assets/icons/MicrophoneIcon'
import { PictureIcon } from '@/assets/icons/PictureIcon'
import { useTranslation } from '@/common/hooks/useTranslation'
import { formatTime } from '@/common/utils'
import { Avatar } from '@/components/ui/avatar'
import { useGetMessagesByIdQuery, useSendMessageMutation } from '@/services/messenger'
import { Message } from '@/services/messenger/messengerService.types'
import { Button, TextField, Typography } from '@samuraichikit/inc-ui-kit'

import s from './OpenChat.module.scss'

type Props = {
  dialoguePartnerId: number
  partnerAvatar?: string
}

export const OpenChat = ({ dialoguePartnerId, partnerAvatar }: Props) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [cursor, setCursor] = useState<number | undefined>()

  const { t } = useTranslation()
  const isTextMessage = message.trim().length > 0
  const isSkip = !dialoguePartnerId

  const { data, isFetching } = useGetMessagesByIdQuery(
    { cursor, dialoguePartnerId },
    { skip: isSkip }
  )
  const [sendMessage] = useSendMessageMutation()

  useEffect(() => {
    setCursor(undefined)
    setMessages([])
  }, [dialoguePartnerId])

  useEffect(() => {
    if (data?.items?.length) {
      setMessages(prev => [...prev, ...data.items])
    }
  }, [data?.items])

  const changeMessageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value)
  }

  const sendMessageHandler = () => {
    if (!message.trim()) {
      return
    }

    sendMessage({ message, receiverId: dialoguePartnerId })
    setMessage('')
  }

  const loadMoreMessages = () => {
    if (!isFetching && messages.length) {
      const lastMessage = messages[messages.length - 1]

      setCursor(lastMessage?.id)
    }
  }

  return (
    <div className={s.chatWrapper}>
      {dialoguePartnerId ? (
        <div className={s.messagesWrapper} id={'scrollableDiv'}>
          <InfiniteScroll
            className={s.scroll}
            dataLength={messages.length}
            hasMore={data ? data.items.length < data.totalCount : false}
            inverse
            loader={<p>Загрузка...</p>}
            next={loadMoreMessages}
            scrollableTarget={'scrollableDiv'}
          >
            {messages.map(messageData => {
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
          </InfiniteScroll>
        </div>
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

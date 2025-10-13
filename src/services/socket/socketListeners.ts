import { AppDispatch } from '@/app/store'
import { WS_EVENT_PATH } from '@/common/constants/wsEventPath'
import { Message, MessageStatus } from '@/services/messenger/messengerService.types'
import { socketApi } from '@/services/socket/socketApi'

import { messengerService } from '../messenger'

type Data = {
  message: Message
  receiverId: number
}

export const registerSocketListeners = (dispatch: AppDispatch) => {
  const cleanup = () => {
    socketApi.off(WS_EVENT_PATH.MESSAGE_SEND)
    socketApi.off(WS_EVENT_PATH.RECEIVE_MESSAGE)
    socketApi.off(WS_EVENT_PATH.MESSAGE_READ)
  }

  cleanup()

  socketApi.on(WS_EVENT_PATH.MESSAGE_SEND, (message: Message, callback: (data: Data) => void) => {
    dispatch(
      messengerService.util.updateQueryData(
        'getMessagesById',
        { dialoguePartnerId: message.ownerId },
        draft => {
          const index = draft.items.findIndex(m => m.id === message.id)

          if (index === -1) {
            draft.items.unshift({ ...message, status: MessageStatus.SENT })
          } else {
            draft.items[index] = message
          }
        }
      )
    )
    callback({ message, receiverId: message.receiverId })
  })

  socketApi.on(WS_EVENT_PATH.RECEIVE_MESSAGE, (message: Message) => {
    dispatch(
      messengerService.util.updateQueryData(
        'getMessagesById',
        {
          dialoguePartnerId:
            message.ownerId === message.receiverId ? message.ownerId : message.receiverId,
        },
        draft => {
          const exists = draft.items.some(m => m.id === message.id)

          if (!exists) {
            draft.items.unshift(message)
          }
        }
      )
    )
  })

  socketApi.on(WS_EVENT_PATH.MESSAGE_READ, ({ messageIds, readerId }) => {
    dispatch(
      messengerService.util.updateQueryData(
        'getMessagesById',
        { dialoguePartnerId: readerId },
        draft => {
          draft.items.forEach(msg => {
            if (messageIds.includes(msg.id)) {
              msg.status = MessageStatus.READ
            }
          })
        }
      )
    )
  })

  return cleanup
}

import { WS_EVENT_PATH } from '@/common/constants/wsEventPath'
import { Message } from '@/services/messenger/messengerService.types'
import { socketApi } from '@/services/socket/socketApi'

type Data = {
  message: Message
  receiverId: number
}

export const registerSocketListeners = () => {
  const cleanup = () => {
    socketApi.off(WS_EVENT_PATH.MESSAGE_SEND)
    socketApi.off(WS_EVENT_PATH.RECEIVE_MESSAGE)
    socketApi.off(WS_EVENT_PATH.NOTIFICATIONS)
  }

  cleanup()

  socketApi.on(WS_EVENT_PATH.MESSAGE_SEND, (message: Message, callback: (data: Data) => void) => {
    callback({ message, receiverId: message.receiverId })
  })

  socketApi.on(WS_EVENT_PATH.RECEIVE_MESSAGE, (updatedMessage: Message) => {
    console.log('RECEIVE_MESSAGE:', updatedMessage)
  })

  return cleanup
}

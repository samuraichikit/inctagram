import { WEBSOCKET_URL } from '@/common/constants'
import { Notification } from '@/services/notifications/notificationsService.types'
import { Socket, io } from 'socket.io-client'

export const websocketsService = (accessToken: string) => {
  const queryParams = {
    query: {
      accessToken: accessToken,
    },
  }

  const socket: Socket = io(WEBSOCKET_URL, queryParams)

  socket.on('connect', () => {
    console.log('Подключено к WebSocket с новым токеном')
  })
  socket.on('notifications', (notification: Notification) => {
    console.log('Новое уведомление: ', notification)
  })
}

import { WEBSOCKET_URL } from '@/common/constants'
import { getCookie } from 'cookies-next/client'
import { Socket, io } from 'socket.io-client'

export const connectWebsockets = () => {
  const queryParams = {
    query: {
      accessToken: getCookie('accessToken'),
    },
  }

  const socket: Socket = io(WEBSOCKET_URL, queryParams)

  return socket
}

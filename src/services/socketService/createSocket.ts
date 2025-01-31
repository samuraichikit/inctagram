import { WEBSOCKET_URL } from '@/common/constants'
import { io } from 'socket.io-client'

export const createSocket = (accessToken: string) => {
  const queryParams = {
    query: {
      accessToken: accessToken,
    },
  }

  return io(WEBSOCKET_URL, queryParams)
}

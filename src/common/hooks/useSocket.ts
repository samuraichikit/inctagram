import { useEffect, useState } from 'react'

import { WEBSOCKET_URL } from '@/common/constants'
import { Socket, io } from 'socket.io-client'

export const useSocket = (accessToken: string) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const queryParams = {
      query: {
        accessToken: accessToken,
      },
    }

    const newSocket = io(WEBSOCKET_URL, queryParams)

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [accessToken])

  return { socket }
}

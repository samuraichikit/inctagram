import { useCallback, useEffect, useRef, useState } from 'react'

import { WS_EVENT_PATH } from '@/common/constants/websocketConstants'
import { createSocket } from '@/services/socketService/createSocket'
import { Socket } from 'socket.io-client'

export const useSocket = (accessToken: string) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const socketRef = useRef<Socket | null>(null)
  const [connected, setConnected] = useState(false)
  const connectSocket = useCallback(() => {
    if (accessToken && !socketRef.current) {
      const newSocket = createSocket(accessToken)

      newSocket.on(WS_EVENT_PATH.CONNECT, () => setConnected(true))
      newSocket.on(WS_EVENT_PATH.DISCONNECT, () => setConnected(false))

      socketRef.current = newSocket
      setSocket(newSocket)
    }
  }, [accessToken])

  useEffect(() => {
    if (accessToken) {
      connectSocket()
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [accessToken, connectSocket])

  const reconnectSocket = useCallback(() => {
    if (!connected && accessToken) {
      socketRef.current?.connect()
    }
  }, [connected, accessToken])

  useEffect(() => {
    if (!connected && accessToken) {
      reconnectSocket()
    }
  }, [connected, accessToken, reconnectSocket])

  return { socket }
}

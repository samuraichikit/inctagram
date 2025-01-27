import { useCallback, useEffect, useRef, useState } from 'react'

import { WEBSOCKET_URL } from '@/common/constants'
import { Socket, io } from 'socket.io-client'

export const useSocket = (accessToken: string) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const socketRef = useRef<Socket | null>(null)
  const [connected, setConnected] = useState(false)
  const queryParams = {
    query: {
      accessToken: accessToken,
    },
  }
  const connectSocket = useCallback(() => {
    if (accessToken && !socketRef.current) {
      const newSocket = io(WEBSOCKET_URL, queryParams)

      newSocket.on('connect', () => {
        console.log('Socket connected:', newSocket.id)
        setConnected(true)
      })

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected')
        setConnected(false)
      })

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
        console.log('Socket disconnected on component unmount')
      }
    }
  }, [accessToken, connectSocket])

  const reconnectSocket = useCallback(() => {
    if (!connected && accessToken) {
      console.log('Attempting to reconnect socket...')
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

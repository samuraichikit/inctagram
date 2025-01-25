import { useCallback, useEffect, useRef, useState } from 'react'

import { WEBSOCKET_URL } from '@/common/constants'
import { NotificationType } from '@/services/notifications/notificationsService.types'
import { Socket, io } from 'socket.io-client'

export const useSocket = (
  accessToken: string,
  onNewNotification: (notification: NotificationType) => void
) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const socketRef = useRef<Socket | null>(null) // Реф для отслеживания сокета
  const [connected, setConnected] = useState(false) // Состояние для отслеживания соединения
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

      // Обработка входящих уведомлений
      newSocket.on('NOTIFICATION', (notification: NotificationType) => {
        console.log('New notification received:', notification)
        onNewNotification(notification) // Обновляем состояние в родительском компоненте
      })

      // Устанавливаем сокет в ref и state
      socketRef.current = newSocket
      setSocket(newSocket)
    }
  }, [accessToken, onNewNotification])

  // Подключаем сокет, если токен изменился или был получен
  useEffect(() => {
    if (accessToken) {
      connectSocket()
    }

    // Очистка сокета при размонтировании компонента
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
        console.log('Socket disconnected on component unmount')
      }
    }
  }, [accessToken, connectSocket])

  // Функция для переподключения сокета
  const reconnectSocket = useCallback(() => {
    if (!connected && accessToken) {
      console.log('Attempting to reconnect socket...')
      socketRef.current?.connect() // Попытка переподключиться
    }
  }, [connected, accessToken])

  useEffect(() => {
    if (!connected && accessToken) {
      // Пробуем переподключить сокет, если он не подключен
      reconnectSocket()
    }
  }, [connected, accessToken, reconnectSocket])

  return socket
}

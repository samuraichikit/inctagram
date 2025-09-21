import { useEffect } from 'react'

import { socketApi } from '@/services/socket/socketApi'
import { registerSocketListeners } from '@/services/socket/socketListeners'
import { getCookie } from 'cookies-next/client'

export const useConnectSocket = () => {
  useEffect(() => {
    const accessToken = getCookie('accessToken') as string

    if (!accessToken) {
      return
    }

    socketApi.connect(accessToken)

    socketApi.on('connect', () => {
      registerSocketListeners()
    })

    return () => {
      socketApi.disconnect()
    }
  }, [])
}

import { useEffect } from 'react'

import { useAppDispatch } from '@/app/store'
import { socketApi } from '@/services/socket/socketApi'
import { registerSocketListeners } from '@/services/socket/socketListeners'
import { getCookie } from 'cookies-next/client'

export const useConnectSocket = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const accessToken = getCookie('accessToken') as string

    if (!accessToken) {
      return
    }

    socketApi.connect(accessToken)

    socketApi.on('connect', () => {
      registerSocketListeners(dispatch)
    })

    return () => {
      socketApi.disconnect()
    }
  }, [])
}

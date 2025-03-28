import { useEffect } from 'react'

import { socketApi } from '@/services/socket/socketApi'
import { getCookie } from 'cookies-next/client'

export const useConnectSocket = () => {
  useEffect(() => {
    const accessToken = getCookie('accessToken') as string

    if (accessToken) {
      socketApi.connect(accessToken)
    }

    return () => {
      socketApi.disconnect()
    }
  }, [])
}

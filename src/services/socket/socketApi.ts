import { WEBSOCKET_URL } from '@/common/constants'
import io, { Socket } from 'socket.io-client'

class SocketApi {
  private static instance: SocketApi
  private socket: Socket | null = null

  private constructor() {}

  static getInstance() {
    if (!SocketApi.instance) {
      SocketApi.instance = new SocketApi()
    }

    return SocketApi.instance
  }

  connect(accessToken: string) {
    if (this.socket) {
      return
    }
    this.socket = io(WEBSOCKET_URL, { query: { accessToken } })
    this.socket.on('connect', () => console.log('Websocket connected'))
    this.socket.on('disconnect', () => console.log('Websocket disconnected'))
  }

  disconnect() {
    this.socket?.disconnect()
    this.socket = null
  }

  emit(event: string, data?: any) {
    this.socket?.emit(event, data)
  }

  off(event: string, callback: (...args: any[]) => void) {
    this.socket?.off(event, callback)
  }

  on(event: string, callback: (...args: any[]) => void) {
    this.socket?.on(event, callback)
  }
}

export const socketApi = SocketApi.getInstance()

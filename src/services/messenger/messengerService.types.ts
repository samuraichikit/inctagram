export type SendMessageArgs = {
  message: string
  receiverId: number
}

export type Message = {
  createdAt: string
  id: number
  messageText: string
  messageType: string
  ownerId: number
  receiverId: number
  status: string
  updatedAt: string
}

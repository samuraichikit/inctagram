export enum MessageType {
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
  VOICE = 'VOICE',
}

export enum MessageStatus {
  READ = 'READ',
  RECEIVED = 'RECEIVED',
  SENT = 'SENT',
}

export type Avatar = {
  createdAt?: string
  fileSize: number
  height?: number
  url: string
  width?: number
}

export type LastMessage = {
  avatars: Avatar[]
  createdAt: string
  id: number
  messageText: string
  messageType: MessageType
  ownerId: number
  receiverId: number
  status: MessageStatus
  updatedAt: string
  userName: string
}

export type GetMessagesResponse = {
  items: LastMessage[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type GetMessagesRequest = {
  cursor: string
  pageSize: number
  searchName: string
}

export type UpdateMessagesStatusResponse = {
  ids: number[]
}

export type Message = {
  createdAt: string
  id: number
  messageText: string
  messageType: MessageType
  ownerId: number

  receiverId: number
  status: MessageStatus
  updatedAt: string
}

export type GetMessagesByIdResponse = {
  items: Message[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type GetMessagesByIdRequest = {
  dialoguePartnerId: number
} & GetMessagesRequest

export type DeleteMessageByIdRequest = {
  id: number
}

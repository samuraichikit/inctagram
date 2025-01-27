export type getNotificationsType = {
  items: NotificationType[]
  notReadCount: number
  pageSize: number
  totalCount: number
}
export type NotificationType = {
  createdAt: string
  id: number
  isRead: boolean
  message: string
}
export type getNotificationsParams = {
  cursor?: number
  isRead?: boolean
  pageSize?: number
  sortBy?: string
  sortDirection?: string
}
export type setNotificationReadBody = {
  ids: Number[]
}

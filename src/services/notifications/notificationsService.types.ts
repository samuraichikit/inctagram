export type getNotificationsType = {
  items: NotificationType[]
  notReadCount: number
  pageSize: number
  totalCount: number
}
export type NotificationType = {
  createdAt: string
  id: number
  isRead: true
  message: string
}
export type getNotificationsParams = {
  cursor?: number
  isRead?: boolean
  pageSize?: number
  sortBy?: string
  sortDirection?: string
}

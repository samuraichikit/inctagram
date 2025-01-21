export type getNotificationsType = {
  items: Notification[]
  notReadCount: number
  pageSize: number
  totalCount: number
}
export type Notification = {
  createdAt: string
  id: number
  isRead: true
  message: string
}

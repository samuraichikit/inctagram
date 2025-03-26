export const getLastMonthNotifications = <T extends { createdAt: string }>(
  notifications?: T[]
): T[] => {
  if (!notifications) {
    return []
  }

  const oneMonthAgo = new Date()

  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

  return notifications.filter(notification => {
    const notificationDate = new Date(notification.createdAt)

    return notificationDate >= oneMonthAgo
  })
}
